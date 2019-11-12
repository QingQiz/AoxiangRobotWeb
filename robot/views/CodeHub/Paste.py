#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from django.shortcuts import get_object_or_404, render, redirect
from robot.models.CodeHub.Code import Code
from django.conf import settings
import hashlib


def list_all(request):
    page = request.GET.get('p')
    author = request.GET.get('a')
    if page == '' or page is None:
        page = 0
    if author is None:
        author = ''
    try:
        page = int(page)
    except ValueError:
        page = 0

    codes = Code.objects.filter(author__icontains=author).order_by('-paste_time')[page * 100:(page + 1) * 100]

    return render(request, 'CodeHub/list.html', {
        'codes': codes
    })


def paste(request):
    author = request.POST.get('author')
    language = request.POST.get('language')
    code_text = request.POST.get('code')
    password = request.POST.get('password')
    password = '' if password is None else password

    if language is None or language.lower() not in Code.LANGUAGE:
        return render(request, 'CodeHub/paste.html')

    if code_text is None or code_text.strip('\n') == '':
        return render(request, 'CodeHub/paste.html', {
            'err_code': 'Your code can not be empty!',
        })
    # save info
    code = Code()
    code.author = 'anonymous' if author is None or author == '' else author
    code.language = language.lower()
    code.language = '' if code.language == 'auto' else code.language
    code.code = code_text.strip('\n') + '\n'
    if password == '':
        code.password = ''
    else:
        code.password = hashlib.sha1((password + settings.CODEHUB_HASH_SALT).encode()).hexdigest()
    code.save()

    response = redirect(codeview, codeid=code.id)
    if password != '':
        response.set_cookie(key=code.id, value=code.password)
    return response


def coderaw(request, codeid):
    password = request.COOKIES.get(codeid)
    password = '' if password is None else password

    code = get_object_or_404(Code, id=codeid)

    if code.password == password:
        return render(request, 'CodeHub/RawView.html', {'code': code})
    else:
        return authorization(request, codeid)


def codeview(request, codeid):
    password = request.COOKIES.get(codeid)
    password = '' if password is None else password

    code = get_object_or_404(Code, id=codeid)

    if code.password == password:
        return render(request, 'CodeHub/CodeView.html', {'code': code})
    else:
        return authorization(request, codeid)


def delete(request, codeid):
    password = request.COOKIES.get(codeid)
    password = '' if password is None else password

    code = get_object_or_404(Code, id=codeid)

    if code.password == password:
        code.delete()
        return list_all(request)
    else:
        return authorization(request, codeid)


def authorization(request, codeid):
    return list_all(request)
