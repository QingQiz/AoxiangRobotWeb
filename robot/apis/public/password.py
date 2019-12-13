#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import hashlib
import binascii
import base64
from django.conf import settings
from robot.models.public.settings import Settings
from robot.lib.AES_CBC import AESCipher as Aes

def password_hash(password):
    hash_salt = Settings.objects.get(name='server.hash_salt').value
    return hashlib.sha256((password + hash_salt).encode()).hexdigest()


def encrypt(info):
    try:
        return Aes(settings.SECRET_KEY).encrypt(info)
    except ValueError:
        return -1


def decrypt(info):
    try:
        return Aes(settings.SECRET_KEY).decrypt(info)
    except (binascii.Error, ValueError, TypeError):
        return None


def b64e(info):
    return str(base64.b64encode(info.encode('utf8')), 'utf8')


def b64d(info):
    return str(base64.b64decode(info), 'utf8')
