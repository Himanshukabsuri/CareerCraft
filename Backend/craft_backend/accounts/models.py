from django.db import models
from django.contrib.auth.models import User 
from django.conf import settings

class Student(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # Personal Info
    name = models.CharField(max_length=100)
    dob = models.DateField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    # Online Profiles
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    portfolio = models.URLField(blank=True, null=True)

    # Education (basic fields, can be expanded later)
    qualification = models.CharField(max_length=100, blank=True, null=True)
    college = models.CharField(max_length=200, blank=True, null=True)
    course = models.CharField(max_length=100, blank=True, null=True)
    branch = models.CharField(max_length=100, blank=True, null=True)

    # Resume Specific
    interested_field = models.CharField(
        max_length=150, 
        blank=True, 
        null=True,
        help_text="Field of interest (used for resume objective if no roadmap)"
    )
    interest = models.TextField(blank=True, null=True)  # broader interests
    skill = models.TextField(blank=True, null=True)  # can store comma-separated for now

    def __str__(self):
        return self.name

class Education(models.Model):
    student = models.ForeignKey(Student, related_name="education", on_delete=models.CASCADE)
    degree = models.CharField(max_length=100)
    institution = models.CharField(max_length=200)
    start_year = models.IntegerField(blank=True, null=True)
    end_year = models.IntegerField(blank=True, null=True)
    grade = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.degree} - {self.institution} ({self.student.name})"

class Internship(models.Model):
    student = models.ForeignKey(Student, related_name="internships", on_delete=models.CASCADE, null=True, blank=True)
    company = models.CharField(max_length=255)
    role = models.CharField(max_length=255, null=True, blank=True, default="Not specified")
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.title} at {self.company}"


    
class Project(models.Model):
    student = models.ForeignKey(Student, related_name="projects", on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    github = models.URLField(blank=True, null=True)
    live = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} ({self.student.name})"


class Language(models.Model):
    student = models.ForeignKey(Student, related_name="languages", on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} - {self.student.name}"


# models.py

class ResumeHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)

    resume_text = models.TextField()
    pdf_file = models.FileField(upload_to="resumes/")
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Resume - {self.student.name} ({self.created_at.date()})"
class RoadmapHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)

    roadmap_json = models.JSONField()
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Roadmap - {self.student.name} ({self.created_at.date()})"
    


class ContactUs(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True, null=True)
    
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"


class ATSHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    job_role = models.CharField(max_length=64)
    file = models.FileField(upload_to="ats/resumes/")
    ats_score = models.IntegerField()
    matched_keywords = models.JSONField(default=list)
    missing_keywords = models.JSONField(default=list)
    issues = models.JSONField(default=list)
    ai_feedback = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ATS {self.user} {self.job_role} {self.ats_score}"

