from django.shortcuts import render
from aoxiang.apis import *


def class_table(request):
    valid = bool(json.loads(check_cookies(request).content)['success'])
    if valid:
        return render(request, 'aoxiang/class_table.html')
    else:
        return login(request)


def get_grade(request):
    valid = bool(json.loads(check_cookies(request).content)['success'])
    if valid:
        return render(request, 'aoxiang/grade.html')
    else:
        return login(request)


def login(request):
    return render(request, 'aoxiang/login.html')
