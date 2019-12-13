#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
from robot.models.blog.user import User
from robot.models.blog.verify import Verify
from robot.models.blog.article import Article
from robot.apis.public import email as mail
from robot.apis.public import password as pwd
from robot.apis.public import response as resp
from django.shortcuts import HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist


def register(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    rpassword = request.POST.get('rpassword')
    email = request.POST.get('email')
    desc = request.POST.get("description")

    if password != rpassword:
        return resp.ret_json(success=0)

    user = User()
    user.name = username
    user.email = email
    user.password = pwd.password_hash(password)
    user.description = desc
    user.save()

    ver = Verify()
    ver.user_id = user
    ver.save()

    mail.send_active_email(to=email, uid=user.id, vid=ver.id)

    return resp.ret_json(success=1)


def login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')

    if email is None or password is None:
        return resp.ret_json(success=0, reason='wrong')

    try:
        user = User.objects.get(email=email)
    except ObjectDoesNotExist:
        return resp.ret_json(success=0, reason='wrong')

    if pwd.password_hash(password) == user.password:
        if not user.is_active:
            return resp.ret_json(success=0, reason='active')

        request.session['uid'] = user.id
        request.session['username'] = user.name
        request.session['email'] = user.email
        return resp.ret_json(success=1)
    else:
        del request.session['uid']
        return resp.ret_json(success=0, reason='wrong')


def verify(request):
    key = request.GET.get('key')
    key = pwd.b64d(key)
    key = json.loads(key)
    uid = key.get('uid')
    key = key.get('key')

    try:
        ver = Verify.objects.get(user_id_id=uid)
    except ObjectDoesNotExist:
        return resp.ret_json(success=0)

    if key != ver.verify_text:
        return resp.ret_json(success=0)

    try:
        user = User.objects.get(id=uid)
    except ObjectDoesNotExist:
        return resp.ret_json(success=0)

    user.is_active = True
    user.save()

    return HttpResponseRedirect('/blog')


def logout(request):
    del request.session['uid']
    return HttpResponseRedirect('/blog')