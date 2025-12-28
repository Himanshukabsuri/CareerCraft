from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
from django.conf import settings

from .models import Student
from .resume_generator import generate_resume
from .models import Student, Education, Project, Language,ResumeHistory,RoadmapHistory,ContactUs


import os, time, traceback
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from .ats_analyzer import analyze_resume_ats
from .models import ATSHistory
from .serializers import ATSAnalyzeSerializer, ATSHistorySerializer

# Import serializers and models
from .serializers import (
    RegisterSerializer, 
    Roadmap_Generetor_formSerializer,
    ResumeSerializer,
    ContactUsSerializer
)


# Import services
from .service import generate_ai_roadmap
from .resume_generator import generate_resume   # ✅ use resume generator

import json

# ------------------------------
# User Registration
# ------------------------------
class Register_view(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserName_View(APIView):
    def get(self, request):
        user = request.user
        return Response({"username": user.username}, status=status.HTTP_200_OK)


# ------------------------------
# Roadmap Views
# ------------------------------
class RoadmapView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = Roadmap_Generetor_formSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # link student form with logged-in user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        student_form = Student.objects.filter(user=request.user)  # only current user
        serializer = Roadmap_Generetor_formSerializer(student_form, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_roadmap_view(request):
    student_id = request.data.get("student_id")
    try:
        student = Student.objects.get(id=student_id, user=request.user)
        user_data = {
            "name": student.name,
            "email": student.email,
            "phone": student.phone,
            "address": student.address,
            "qualification": student.qualification,
            "college": student.college,
            "course": student.course,
            "branch": student.branch,
            "interest": student.interest,
            "skill": student.skill,
        }
        roadmap_text = generate_ai_roadmap(user_data)

        # Clean AI response
        cleaned = roadmap_text.strip().strip("`")
        if cleaned.startswith("json"):
            cleaned = cleaned[4:].strip()

        try:
            roadmap_data = json.loads(cleaned)
        except Exception:
            roadmap_data = {"raw_text": roadmap_text}  # fallback
        roadmap_history = RoadmapHistory.objects.create(
            user=request.user,
            student=student,
            roadmap_json=roadmap_data
        )
        return Response({
            "user_data": user_data,
            "roadmap": roadmap_data
        }, status=status.HTTP_200_OK)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ------------------------------
# Resume Views
# ------------------------------
class ResumeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ResumeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)  # Log errors to Django console
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        """Fetch all resumes of logged-in user"""
        students = Student.objects.filter(user=request.user)
        serializer = ResumeSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
import traceback

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_resume_view(request):
    try:
        print("REQUEST DATA:", request.data)
        print("REQUEST USER:", request.user)

        student_id = request.data.get("student_id")
        if not student_id:
            return Response(
                {"error": "student_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        student = Student.objects.get(id=student_id, user=request.user)

        user_data = {
            "personal": {
                "name": student.name,
                "dob": str(student.dob) if student.dob else "",
                "email": student.email,
                "phone": student.phone,
                "address": student.address,
                "interested_field": student.interest,
            },
            "education": list(student.education.values()),
            "skills": student.skill.split(",") if student.skill else [],
            "projects": list(student.projects.values()),
            "languages": list(student.languages.values_list("name", flat=True)),
            "internships": list(student.internships.values()) if hasattr(student, "internships") else [],
        }

        print("USER DATA READY")

        resume_data = generate_resume(user_data)
        resume_history = ResumeHistory.objects.create(
                user=request.user,
                student=student,
                resume_text=resume_data["resume"],
                pdf_file=resume_data["pdf_path"]
            )

        print("RESUME GENERATED")

        return Response(
        {
            "resume_text": resume_data["resume"],
            "pdf_path": resume_data["pdf_path"],   
            "pdf_url": request.build_absolute_uri(
                settings.MEDIA_URL + resume_data["pdf_path"]
            )
        },
        status=status.HTTP_200_OK
    )

    except Exception as e:
        print("🔥 RESUME GENERATION ERROR 🔥")
        traceback.print_exc()   # 👈 THIS IS THE KEY LINE

        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# ------------------------------
# Combined Package (Roadmap + Resume)
# ------------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_ai_package(request):
    student_id = request.data.get("student_id")
    try:
        student = Student.objects.get(id=student_id, user=request.user)

        # Prepare user_data for both generators
        user_data = {
            "personal": {
                "name": student.name,
                "dob": str(student.dob) if student.dob else "",
                "email": student.email,
                "phone": student.phone,
                "address": student.address,
                "linkedin": "",
                "github": "",
                "portfolio": "",
                "interested_field": student.interest
            },
            "education": list(student.education.values()),
            "skills": student.skill.split(",") if student.skill else [],
            "projects": list(student.projects.values()),
            "languages": list(student.languages.values_list("name", flat=True))
        }

        # Generate roadmap
        roadmap = generate_ai_roadmap(user_data["personal"])

        # Generate resume
        resume_data = generate_resume(user_data)

        return Response({
            "roadmap": roadmap,
            "resume": resume_data["resume"],
            "pdf_path": resume_data["pdf_path"]
        }, status=status.HTTP_200_OK)

    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ResumeHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        resumes = ResumeHistory.objects.filter(
            user=request.user
        ).select_related("student").order_by("-created_at")

        data = []

        for resume in resumes:
            data.append({
                "id": resume.id,
                "student_name": resume.student.name,
                "created_at": resume.created_at,
                "pdf_url": request.build_absolute_uri(
                    settings.MEDIA_URL + resume.pdf_file.name
                ),
                "resume_preview": resume.resume_text[:300] + "..."
            })
            # print(data)

        return Response({
            "count": len(data),
            "resumes": data
        })
from .models import RoadmapHistory


class RoadmapHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        roadmaps = RoadmapHistory.objects.filter(
            user=request.user
        ).select_related("student").order_by("-created_at")

        data = []

        for roadmap in roadmaps:
            data.append({
                "id": roadmap.id,
                "student_name": roadmap.student.name,
                "created_at": roadmap.created_at,
                "roadmap": roadmap.roadmap_json
            })
        # print(data)
        return Response({
            "count": len(data),
            "roadmaps": data
        })
    
class ContactUsView(APIView):
    def post(self, request):
        serializer = ContactUsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Your query has been submitted successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AboutUsView(APIView):
    def get(self, request):
        about_info = {
            "app_name": "CareerCraft",
            "version": "1.0.0",
            "description": "CareerCraft is an AI-powered platform designed to help students and professionals craft personalized career roadmaps and resumes. Our mission is to empower individuals to achieve their career goals through innovative technology and user-centric design.",
            "features": [
                "AI-Generated Career Roadmaps",
                "Custom Resume Builder",
                "User-Friendly Interface",
                "Secure User Authentication",
                "Comprehensive History Tracking"
            ],
            "contact_email": "CareerCraft@gmail.com",
            "website": "https://www.careercraft.com",
            "social_media": {
                "linkedin": "https://www.linkedin.com/company/careercraft",
                "twitter": "https://twitter.com/careercraft",
                "facebook": "https://www.facebook.com/careercraft"
            },
            "team": [
                {"name": "Priyanshu Kothari", "role": "Founder & CEO"},
                {"name": "Sagar Thapliyal", "role": "Chief Technology Officer"},
                {"name": "Manish Ghildiyal", "role": "Head of Product"},
                {"name": "Himanshu Kabsuri", "role": "Lead Developer"}
            ],
        }
        return Response(about_info, status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def analyze_ats_view(request):
    serializer = ATSAnalyzeSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    job_role = serializer.validated_data["job_role"]
    file_obj = serializer.validated_data["file"]
    try:
        safe_name = f"{request.user.id}_{int(time.time())}_{file_obj.name}".replace(" ", "_")
        rel_path = f"ats/resumes/{safe_name}"
        saved_path = default_storage.save(rel_path, ContentFile(file_obj.read()))
        abs_path = os.path.join(settings.MEDIA_ROOT, saved_path)

        results = analyze_resume_ats(abs_path, job_role)

        record = ATSHistory.objects.create(
            user=request.user,
            job_role=job_role,
            file=saved_path,
            ats_score=results.get("ats_score", 0),
            matched_keywords=results.get("matched_keywords", []),
            missing_keywords=results.get("missing_keywords", []),
            issues=results.get("issues", []),
            ai_feedback=results.get("ai_feedback", ""),
        )

        return Response(
            {
                "id": record.id,
                **results,
                "file_url": request.build_absolute_uri(settings.MEDIA_URL + saved_path),
                "created_at": record.created_at,
            },
            status=status.HTTP_200_OK,
        )
    except Exception as e:
        traceback.print_exc()
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ATSHistoryView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        qs = ATSHistory.objects.filter(user=request.user).order_by("-created_at")
        data = ATSHistorySerializer(qs, many=True, context={"request": request}).data
        return Response({"count": len(data), "items": data}, status=status.HTTP_200_OK)