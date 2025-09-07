from django.db import models
from django.contrib.auth.models import User
# Create your models here.



class Student(models.Model):
    name = models.CharField(max_length=100)
    
    email = models.EmailField(unique=False,blank=True,null=True)
    phone = models.CharField(max_length=15,blank=True,null=True)
    address = models.TextField(blank=True,null=True)
    qualification = models.CharField(max_length=100)
    college = models.CharField(max_length=200,blank=True,null=True)
    course = models.CharField(max_length=100)
    branch = models.CharField(max_length=100, blank=True, null=True)
    interest = models.TextField()
    skill = models.TextField()
    user = models.ForeignKey(User,on_delete=models.CASCADE)

   

    def __str__(self):
        return self.name

    