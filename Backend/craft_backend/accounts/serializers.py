from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Student, Education, Project, Language, Internship,ContactUs, ATSHistory


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

class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = "__all__"
        read_only_fields = ["student"]  # ✅ but student FK is missing in model!


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
    internships = InternshipSerializer(many=True, required=False)  # 👈 Added

    class Meta:
        model = Student
        fields = [
            "id", "name", "dob", "email", "phone", "address",
            "linkedin", "github", "portfolio",
            "qualification", "college", "course", "branch",
            "interested_field", "interest", "skill",
            "education", "projects", "languages", "internships"
        ]
        read_only_fields = ["user"]

    def create(self, validated_data):
        education_data = validated_data.pop("education", [])
        project_data = validated_data.pop("projects", [])
        language_data = validated_data.pop("languages", [])
        internship_data = validated_data.pop("internships", [])  # 👈 Added

        student = Student.objects.create(**validated_data)

        for edu in education_data:
            Education.objects.create(student=student, **edu)
        for proj in project_data:
            Project.objects.create(student=student, **proj)
        for lang in language_data:
            Language.objects.create(student=student, **lang)
        for intern in internship_data:
            Internship.objects.create(student=student, **intern)  # 👈 Added

        return student


class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = "__all__"
        read_only_fields = ["created_at"]

class ATSAnalyzeSerializer(serializers.Serializer):
    job_role = serializers.ChoiceField(choices=[("ml_engineer", "ML Engineer"), ("frontend", "Frontend"), ("backend", "Backend")])
    file = serializers.FileField()

class ATSHistorySerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = ATSHistory
        fields = ["id", "job_role", "ats_score", "matched_keywords", "missing_keywords", "issues", "ai_feedback", "file_url", "created_at"]

    def get_file_url(self, obj):
        request = self.context.get("request")
        if not request:
            return obj.file.url if hasattr(obj.file, "url") else ""
        return request.build_absolute_uri(obj.file.url)