#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from aoxiang.lib.AoxiangRobot.functions import AoxiangInfo, Grade
from aoxiang.lib.AoxiangRobot.functions.ClassTable import ClassTable, GetClass
from dashboard.apis import *


def check(request):
    username = request.POST['username']
    password = request.POST['password']
    try:
        AoxiangInfo.check(username, password)
        res = encrypt(username+password)
    except ValueError:
        res = -1
    return HttpResponse(json.dumps({'info': res}), content_type='application/json')


def username_password(up):
    res = decrypt(up)
    if res is None:
        return None
    return res[0:10], res[10:]


def check_cookies(request):
    up = request.COOKIES.get('up')
    if up is None:
        return ret_json(success=0)
    res = username_password(up)
    if res is None:
        return ret_json(success=0)

    try:
        AoxiangInfo.check(*res)
        return ret_json(success=1)
    except ValueError:
        return ret_json(success=0)


def valid_data(tid, term):
    try:
        int(tid), int(term)
        return True
    except (ValueError, TypeError):
        return False


def get_grade(request):
    # check data
    year, term = request.GET.get('y'), request.GET.get('t')
    if not valid_data(year, term):
        return ret_json(error=1)
    else:
        year = int(year) % 100

    # check cookie
    up = request.COOKIES.get('up')
    res = username_password(up)
    if res is None:
        return ret_json(error=1)

    # request data
    try:
        res = Grade.get(year + int(term) * 18, username=res[0], password=res[1])[0]
    except ValueError:
        return ret_json(error=1)

    # return data
    return ret_json(obj=res)


def get_id(request):
    # check cookie
    up = request.COOKIES.get('up')
    res = username_password(up)
    if res is None:
        return ret_json(error=1)

    return ret_json(id=res[0])


def get_ct(request):
    # check cookie
    up = request.COOKIES.get('up')
    res = username_password(up)
    if res is None:
        return ret_json(error=1)

    try:
        method = int(request.GET.get('cp'))

        class_info = GetClass.get(method, username=res[0], password=res[1])
        info = ClassTable.get_json(class_info, '20190826', method)

        for i in info:
            i['className'] = 'm-fc-event--accent'
        return ret_json(info)
    except ValueError:
        return ret_json(error=1)


def export_ct(request):
    # check cookie
    up = request.COOKIES.get('up')
    res = username_password(up)
    if res is None:
        return ret_json(error=1)

    try:
        method = int(request.GET.get('cp'))

        class_info = GetClass.get(method, username=res[0], password=res[1])
        info = ClassTable.get_calendar(class_info, '20190826', method=method)

        return HttpResponse(info, content_type='application/octet-stream')
    except ValueError:
        return ret_json(error=1)


