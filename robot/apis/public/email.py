#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from email.mime.text import MIMEText
from email.header import Header
from .password import b64e
import smtplib

from robot.models.public.settings import Settings
from robot.models.blog.verify import Verify

def send_active_email(to, uid, vid):
    domain = Settings.objects.get(name='server.domain').value
    ver = Verify.objects.get(id=vid)
    ver_key = f'{{"uid":{uid},"key":"{ver.verify_text}"}}'
    ver_key = b64e(ver_key)

    mes = build_email(subject='Please Active You Account',
                      msg=f'https://{domain}/blog/active?key={ver_key}')
    send_mail(to=to, mes=mes)


def build_email(subject, msg):
    mes = MIMEText(msg, 'plain', 'utf-8')
    mes['Subject'] = Header(subject, 'utf-8')
    return mes


def send_mail(to, mes):
    m_host = Settings.objects.get(name='smtp.host').value
    m_user = Settings.objects.get(name='smtp.username').value
    m_pass = Settings.objects.get(name='smtp.password').value

    mes['To'] = Header(to,'utf-8')
    mes['From'] = Header(m_user, 'utf-8')

    ser = smtplib.SMTP()
    ser.connect(m_host)
    ser.login(m_user, m_pass)
    ser.sendmail(from_addr=m_user, to_addrs=[to], msg=mes.as_string())
    # ser.sendmail(m_user, mes['TO'], mes.as_string())
