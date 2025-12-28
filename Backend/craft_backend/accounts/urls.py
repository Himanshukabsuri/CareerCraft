from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import ResumeHistoryView, RoadmapHistoryView,generate_ai_package,ContactUsView, analyze_ats_view, ATSHistoryView

urlpatterns = [
    path('register/', views.Register_view.as_view(), name="register"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('form/', views.RoadmapView.as_view(), name="form"),
    path('user/',views.UserName_View.as_view(), name="username"),
    path('generate_roadmap/', views.generate_roadmap_view, name='generate_roadmap'),
    path('generate_package/', views.generate_ai_package, name='generate_ai_package'),
    path('resume/', views.ResumeView.as_view(), name="resume_form"), 
    path('generate_resume/', views.generate_resume_view, name="generate_resume"),
    path("resume/history/", ResumeHistoryView.as_view(), name="resume-history"),
    path("roadmap/history/", RoadmapHistoryView.as_view(), name="roadmap-history"),
    path('contactus/',ContactUsView.as_view(),name="contact-us"),
    path('aboutus/',views.AboutUsView.as_view(),name="about-us"),
    path("ats/analyze/", analyze_ats_view, name="ats-analyze"),
    path("ats/history/", ATSHistoryView.as_view(), name="ats-history"),
]

