from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Student, Education, Project, Language

# ------------------------------
# Register Serializer
# ------------------------------
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {'password': {'write_only': True}}
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user

# ------------------------------
# Roadmap Serializer (Student model)
# ------------------------------
class Roadmap_Generetor_formSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"
        read_only_fields = ["user"]

# ------------------------------
# Resume Serializers
# ------------------------------

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = "__all__"
        read_only_fields = ["student"]  # we’ll assign student automatically

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ["student"]

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = "__all__"
        read_only_fields = ["student"]

# Nested Resume Serializer
class ResumeSerializer(serializers.ModelSerializer):
    education = EducationSerializer(many=True, required=False)
    projects = ProjectSerializer(many=True, required=False)
    languages = LanguageSerializer(many=True, required=False)

    class Meta:
        model = Student
        fields = [
            "id", "name", "email", "phone", "address", 
            "qualification", "college", "course", "branch", 
            "interest", "skill",
            "education", "projects", "languages"
        ]
        read_only_fields = ["user"]

    def create(self, validated_data):
        education_data = validated_data.pop("education", [])
        project_data = validated_data.pop("projects", [])
        language_data = validated_data.pop("languages", [])

        student = Student.objects.create(**validated_data)

        for edu in education_data:
            Education.objects.create(student=student, **edu)
        for proj in project_data:
            Project.objects.create(student=student, **proj)
        for lang in language_data:
            Language.objects.create(student=student, **lang)

        return student
