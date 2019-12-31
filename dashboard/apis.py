#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import smtplib
import hashlib
import binascii
import base64

from email.mime.text import MIMEText
from email.header import Header

from dashboard.models import Settings
from dashboard.lib.AES_CBC import AESCipher as Aes

from django.conf import settings
from django.http import HttpResponse


def ret_json(obj=None, **kwargs):
    return HttpResponse(json.dumps(kwargs if obj is None else obj), content_type='application/json')


def build_email(subject, msg):
    mes = MIMEText(msg, 'plain', 'utf-8')
    mes['Subject'] = Header(subject, 'utf-8')
    return mes


def send_mail(to, mes):
    m_host = Settings.objects.get(name='smtp.host').value
    m_user = Settings.objects.get(name='smtp.username').value
    m_pass = Settings.objects.get(name='smtp.password').value

    mes['To'] = Header(to, 'utf-8')
    mes['From'] = Header(m_user, 'utf-8')

    ser = smtplib.SMTP()
    ser.connect(m_host)
    ser.login(m_user, m_pass)
    ser.sendmail(from_addr=m_user, to_addrs=[to], msg=mes.as_string())


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
