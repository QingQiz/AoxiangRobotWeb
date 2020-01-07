#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from .models import *
from dashboard.apis import *
from django.shortcuts import HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist


def register(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    rpassword = request.POST.get('rpassword')
    email = request.POST.get('email')
    desc = request.POST.get("description")

    if password != rpassword:
        return ret_json(success=0)

    user = User()
    user.name = username
    user.email = email
    user.password = password_hash(password)
    user.description = desc
    user.save()

    ver = Verify()
    ver.user_id = user
    ver.save()

    host = f'http{"s" if request.is_secure() else ""}://{request.get_host()}'
    send_active_email(domain=host, to=email, uid=user.id, vid=ver.id)

    return ret_json(success=1)


def login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')

    if email is None or password is None:
        return ret_json(success=0, reason='wrong')

    try:
        user = User.objects.get(email=email)
    except ObjectDoesNotExist:
        return ret_json(success=0, reason='wrong')

    if password_hash(password) == user.password:
        if not user.is_active:
            return ret_json(success=0, reason='active')

        request.session['uid'] = user.id
        request.session['username'] = user.name
        request.session['email'] = user.email
        return ret_json(success=1)
    else:
        del request.session['uid']
        return ret_json(success=0, reason='wrong')


def verify(request):
    key = request.GET.get('key')
    key = b64d(key)
    key = json.loads(key)
    uid = key.get('uid')
    key = key.get('key')

    try:
        ver = Verify.objects.get(user_id_id=uid)
    except ObjectDoesNotExist:
        return ret_json(success=0)

    if key != ver.verify_text:
        return ret_json(success=0)

    try:
        user = User.objects.get(id=uid)
    except ObjectDoesNotExist:
        return ret_json(success=0)

    user.is_active = True
    user.save()

    return HttpResponseRedirect('/blog')


def logout(request):
    del request.session['uid']
    return HttpResponseRedirect('/blog')


def send_active_email(domain, to, uid, vid):
    ver = Verify.objects.get(id=vid)
    ver_key = f'{{"uid":{uid},"key":"{ver.verify_text}"}}'
    ver_key = b64e(ver_key)

    mes = build_email(subject='Please Active You Account',
                      msg=f'{domain}/blog/active?key={ver_key}')
    send_mail(to=to, mes=mes)
