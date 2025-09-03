from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', views.Register_view.as_view(), name="register"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('form/',views.RoadmapView.as_view(),name="form"),
    path('user/',views.UserName_View.as_view(), name="username")
]
