import json
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


def check_cookies(request):
    pass
