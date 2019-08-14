import json
from django.shortcuts import render

from robot.apis import check
from robot.views import login


def get_grade(request):
    valid = bool(json.loads(check.check_cookies(request).content)['success'])
    if valid:
        return render(request, 'grade.html')
    else:
        return login.login(request)
