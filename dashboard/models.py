from django.db import models

# Create your models here.


class Settings(models.Model):
    name = models.CharField(max_length=64, unique=True, null=False)
    value = models.CharField(max_length=256)
    creation_time = models.DateTimeField(auto_now_add=True)
    last_modify_time = models.DateTimeField(auto_now=True)
