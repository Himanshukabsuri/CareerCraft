from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Student
#registerserializers
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["username","email","password"]
        extra_kwargs = {'password': {'write_only': True}}
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value
    def create(self, validated_data):
        user=User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
           
        
        return user
#Roadmap_Genretor_form

class Roadmap_Generetor_formSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"
        read_only_fields = ["user"]

   
