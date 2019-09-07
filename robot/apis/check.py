import json
import binascii
from django.http import HttpResponse
from django.conf import settings
from robot.lib.AoxiangRobot.functions import AoxiangInfo
from robot.lib.AES_CBC import AESCipher as AES


def check(request):
    username = request.POST['username']
    password = request.POST['password']
    try:
        AoxiangInfo.check(username, password)
        res = AES(settings.SECRET_KEY).encrypt(username + password)
    except ValueError:
        res = -1
    return HttpResponse(json.dumps({'info': res}), content_type='application/json')


def username_password(up):
    try:
        res = AES(settings.SECRET_KEY).decrypt(up)
        return res[0:10], res[10:]
    except (binascii.Error, ValueError, TypeError):
        return None


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


