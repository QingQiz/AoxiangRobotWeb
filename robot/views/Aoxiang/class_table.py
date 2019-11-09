import json
from django.shortcuts import render

from robot.apis.Aoxiang import check
from robot.views.Aoxiang import login


def class_table(request):
    valid = bool(json.loads(check.check_cookies(request).content)['success'])
    if valid:
        return render(request, 'Aoxiang/class_table.html')
    else:
        return login.login(request)
