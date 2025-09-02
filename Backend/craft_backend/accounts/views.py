from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from .serializers import RegisterSerializer,Roadmap_Generetor_formSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from .models import Student
# Create your views here.

#Register_view
class Register_view(APIView):
    def post(self,request):
        serializer=RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
#Roadmap_genrator_form_views

# views.py

class RoadmapView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = Roadmap_Generetor_formSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # pass user here
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            print(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        student_form = Student.objects.filter(user=request.user)  # only current user
        serializer = Roadmap_Generetor_formSerializer(student_form, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
