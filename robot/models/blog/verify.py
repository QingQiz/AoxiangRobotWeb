#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django.db import models
from .user import User
import random
import string
import base64


def get_verify_key():
    text = ''.join(random.choices(string.printable, k=128))
    return str(base64.b64encode(text.encode('utf8')), 'utf8')


class Verify(models.Model):
    user_id = models.ForeignKey(to=User, on_delete=models.CASCADE)
    verify_text = models.CharField(max_length=256, default=get_verify_key)

