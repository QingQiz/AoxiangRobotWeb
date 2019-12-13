#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django.db import models
from .user import User

class Article(models.Model):
    title = models.CharField(max_length=256)
    text = models.TextField(default='')

    ref_article_id = models.IntegerField(null=True, default=None)
    creation_user_id = models.ForeignKey(to=User, on_delete=models.CASCADE)

    creation_time = models.DateTimeField(auto_now_add=True)
    last_modify_time = models.DateTimeField(auto_now=True)

