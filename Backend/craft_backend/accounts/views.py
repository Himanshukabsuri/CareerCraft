# from django.shortcuts import render
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework import status
# from rest_framework.decorators import api_view
# from rest_framework.permissions import IsAuthenticated
# from django.contrib.auth.models import User

# # Import serializers and models
# from .serializers import RegisterSerializer, Roadmap_Generetor_formSerializer
# from .models import Student

# # Import services
# from .service import generate_ai_roadmap, generate_ai_resume


# # Register View
# class Register_view(APIView):
#     def post(self, request):
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UserName_View(APIView):
#     def get(self,request):
#         user = request.user
#         return Response({"username":user.username}, status=status.HTTP_200_OK)

# # Roadmap form view (save student form data)
# class RoadmapView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         serializer = Roadmap_Generetor_formSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(user=request.user)  # link student form with logged-in user
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def get(self, request):
#         student_form = Student.objects.filter(user=request.user)  # only current user
#         serializer = Roadmap_Generetor_formSerializer(student_form, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)


# # Generate roadmap only

# import json

# @api_view(['POST'])
# def generate_roadmap_view(request):
#     student_id = request.data.get("student_id")
#     try:
#         student = Student.objects.get(id=student_id, user=request.user)
#         user_data = {
#             "name": student.name,
#             "email": student.email,
#             "phone": student.phone,
#             "address": student.address,
#             "qualification": student.qualification,
#             "college": student.college,
#             "course": student.course,
#             "branch": student.branch,
#             "interest": student.interest,
#             "skill": student.skill,
#         }
#         roadmap_text = generate_ai_roadmap(user_data)

#         # 🛠️ Clean AI response (remove ```json ... ``` wrappers)
#         cleaned = roadmap_text.strip().strip("`")
#         if cleaned.startswith("json"):
#             cleaned = cleaned[4:].strip()

#         # Try to parse JSON safely
#         try:
#             roadmap_data = json.loads(cleaned)
#         except Exception:
#             roadmap_data = {"raw_text": roadmap_text}  # fallback

#         return Response({
#             "user_data": user_data,
#             "roadmap": roadmap_data
#         }, status=status.HTTP_200_OK)
#     except Student.DoesNotExist:
#         return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# # Generate roadmap + resume + PDF
# @api_view(['POST'])
# def generate_ai_package(request):
#     student_id = request.data.get("student_id")
#     try:
#         student = Student.objects.get(id=student_id, user=request.user)
#         user_data = {
#             "name": student.name,
#             "dob": str(student.dob),
#             "email": student.email,
#             "phone": student.phone,
#             "address": student.address,
#             "qualification": student.qualification,
#             "college": student.college,
#             "course": student.course,
#             "branch": student.branch,
#             "interest": student.interest,
#             "skill": student.skill,
#         }
#         # First generate roadmap
#         roadmap = generate_ai_roadmap(user_data)
#         # Then generate resume and PDF
#         resume_data = generate_ai_resume(user_data, roadmap)
#         return Response({
#             "roadmap": roadmap,
#             "resume": resume_data["resume"],
#             "pdf_path": resume_data["pdf_path"]
#         }, status=status.HTTP_200_OK)
#     except Student.DoesNotExist:
#         return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

# Import serializers and models
from .serializers import (
    RegisterSerializer, 
    Roadmap_Generetor_formSerializer,
    ResumeSerializer
)
from .models import Student, Education, Project, Language

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
        """Save Student + Education + Projects + Languages"""
        serializer = ResumeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)   # ✅ auto-link logged-in user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        """Fetch all resumes of logged-in user"""
        students = Student.objects.filter(user=request.user)
        serializer = ResumeSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def generate_resume_view(request):
    """Generate AI-powered resume + PDF"""
    student_id = request.data.get("student_id")
    try:
        student = Student.objects.get(id=student_id, user=request.user)
        user_data = {
            "personal": {
                "name": student.name,
                "dob": str(student.dob) if student.dob else "",
                "email": student.email,
                "phone": student.phone,
                "address": student.address,
                "linkedin": "",  # extend later
                "github": "",
                "portfolio": "",
                "interested_field": student.interest
            },
            "education": list(student.education.values()),
            "skills": student.skill.split(",") if student.skill else [],
            "projects": list(student.projects.values()),
            "languages": list(student.languages.values_list("name", flat=True))
        }

        resume_data = generate_resume(user_data)

        return Response({
            "resume": resume_data["resume"],
            "pdf_path": resume_data["pdf_path"]
        }, status=status.HTTP_200_OK)

    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ------------------------------
# Combined Package (Roadmap + Resume)
# ------------------------------
@api_view(['POST'])
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
