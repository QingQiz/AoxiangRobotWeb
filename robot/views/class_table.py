import json
from django.shortcuts import render

from robot.apis import check
from robot.views import login


def class_table(request):
    valid = bool(json.loads(check.check_cookies(request).content)['success'])
    if valid:
        return render(request, 'class_table.html')
    else:
        return login.login(request)
