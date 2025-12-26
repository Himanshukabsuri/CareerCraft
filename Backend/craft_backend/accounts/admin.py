from django.contrib import admin

# Register your models here.
from .models import Student,ContactUs,ResumeHistory,RoadmapHistory
admin.site.register(RoadmapHistory)
admin.site.register(Student)
admin.site.register(ContactUs)
admin.site.register(ResumeHistory)