from django.db import models
import random
import base64
import string


def get_verify_key():
    text = ''.join(random.choices(string.printable, k=128))
    return str(base64.b64encode(text.encode('utf8')), 'utf8')


class User(models.Model):
    name = models.CharField(max_length=30)
    password = models.CharField(max_length=256)
    email = models.CharField(max_length=64, unique=True)
    description = models.CharField(max_length=1024, null=True)
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)


class Article(models.Model):
    title = models.CharField(max_length=256)
    text = models.TextField(default='')

    ref_article_id = models.IntegerField(null=True, default=None)
    creation_user_id = models.ForeignKey(to=User, on_delete=models.CASCADE)

    creation_time = models.DateTimeField(auto_now_add=True)
    last_modify_time = models.DateTimeField(auto_now=True)


class Verify(models.Model):
    user_id = models.ForeignKey(to=User, on_delete=models.CASCADE)
    verify_text = models.CharField(max_length=256, default=get_verify_key)

