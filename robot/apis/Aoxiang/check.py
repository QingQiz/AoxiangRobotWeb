import json
from django.http import HttpResponse
from robot.lib.AoxiangRobot.functions import AoxiangInfo
from robot.apis.public import password as passwd


def check(request):
    username = request.POST['username']
    password = request.POST['password']
    try:
        AoxiangInfo.check(username, password)
        res = passwd.encrypt(username+password)
    except ValueError:
        res = -1
    return HttpResponse(json.dumps({'info': res}), content_type='application/json')


def username_password(up):
    res = passwd.decrypt(up)
    if res is None:
        return None
    return res[0:10], res[10:]


def check_cookies(request):
    up = request.COOKIES.get('up')
    if up is None:
        return HttpResponse(json.dumps({'success': 0}), content_type='application/json')
    res = username_password(up)
    if res is None:
        return HttpResponse(json.dumps({'success': 0}), content_type='application/json')

    try:
        AoxiangInfo.check(*res)
        return HttpResponse(json.dumps({'success': 1}), content_type='application/json')
    except ValueError:
        return HttpResponse(json.dumps({'success': 0}), content_type='application/json')


