#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django.db import models

class User(models.Model):
    name = models.CharField(max_length=30)
    password = models.CharField(max_length=256)
    email = models.CharField(max_length=64, unique=True)
    description = models.CharField(max_length=1024, null=True)
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

