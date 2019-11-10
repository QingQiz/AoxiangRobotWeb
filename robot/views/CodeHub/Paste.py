#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from django.shortcuts import get_object_or_404, render, redirect
from robot.models.CodeHub.Code import Code
from django.http import HttpResponse
from django.conf import settings
from robot.lib.AES_CBC import AESCipher as AES
import binascii
import hashlib


def list_all(request):
    codes = Code.objects.order_by('-paste_time')
    return render(request, 'CodeHub/list.html', {'codes': codes})


def paste(request):
    author = request.POST.get('author')
    language = request.POST.get('language')
    code_text = request.POST.get('code')
    print(author, language, code_text)
    if language is None or language.lower() not in Code.LANGUAGE:
        return render(request, 'CodeHub/paste.html')

    if code_text is None or code_text.strip('\n') == '':
        return render(request, 'CodeHub/paste.html', {
            'err_code': 'Your code can not be empty!',
        })
    code = Code()
    code.author = 'anonymous' if author is None or author == '' else author
    code.language = language.lower()
    code.language = '' if code.language == 'auto' else code.language
    code.code = code_text.strip('\n') + '\n'
    code.save()
    return redirect(codeview, codeid=code.id)


def coderaw(request, codeid):
    code = get_object_or_404(Code, id=codeid)
    return render(request, 'CodeHub/RawView.html', {'code': code})


def codeview(request, codeid):
    code = get_object_or_404(Code, id=codeid)
    return render(request, 'CodeHub/CodeView.html', {'code': code})


def delete(request, codeid):
    hash_res = settings.CODEHUB_ADMIN
    auth = request.COOKIES.get('admin_auth')
    try:
        auth = AES(settings.SECRET_KEY).decrypt(auth)
    except (binascii.Error, ValueError, TypeError):
        auth = None
        pass
    if auth == hash_res:
        code = get_object_or_404(Code, id=codeid)
        code.delete()
        return render(request, 'CodeHub/list.html')
    else:
        return render(request, 'CodeHub/auth.html')


def authorization(request):
    password = request.POST.get('password')
    if password is not None:
        salt = settings.CODEHUB_HASH_SALT
        res = settings.CODEHUB_ADMIN
        hash_res = hashlib.sha1((password + salt).encode()).hexdigest()
        if hash_res == res:
            response = HttpResponse()
            response.set_cookie(AES(settings.SECRET_KEY).encrypt(res))
            return render(response, 'CodeHub/list.html')
        else:
            password = None
    if password is None:
        return render(request, 'CodeHub/auth.html')







