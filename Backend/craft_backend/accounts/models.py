# from django.db import models
# from django.contrib.auth.models import User
# # Create your models here.



# class Student(models.Model):
#     name = models.CharField(max_length=100)
    
#     email = models.EmailField(unique=False,blank=True,null=True)
#     phone = models.CharField(max_length=15,blank=True,null=True)
#     address = models.TextField(blank=True,null=True)
#     qualification = models.CharField(max_length=100)
#     college = models.CharField(max_length=200,blank=True,null=True)
#     course = models.CharField(max_length=100)
#     branch = models.CharField(max_length=100, blank=True, null=True)
#     interest = models.TextField()
#     skill = models.TextField()
#     user = models.ForeignKey(User,on_delete=models.CASCADE)

   

#     def __str__(self):
#         return self.name

from django.db import models
from django.contrib.auth.models import User


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
