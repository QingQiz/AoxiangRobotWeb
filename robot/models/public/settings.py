#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django.db import models

class Settings(models.Model):
    name = models.CharField(max_length=64, unique=True, null=False)
    value = models.CharField(max_length=256)
    creation_time = models.DateTimeField(auto_now_add=True)
    last_modify_time = models.DateTimeField(auto_now=True)
