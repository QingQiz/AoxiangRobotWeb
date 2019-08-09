import json
import datetime
from . import check
from django.http import HttpResponse
from robot.lib.AoxiangRobot.functions import Grade, Exam


def get_grade(request):
    res = check.username_password(request.COOKIES.get('up'))
    if request.GET.get('year') is None:
        year = datetime.datetime.now().year
    else:
        year = request.GET.get('year')
    res = Grade.get(int(year), username=res[0], password=res[1])
    return HttpResponse(json.dumps(res), content_type='application/json')


def get_exam(request):
    res = check.username_password(request.COOKIES.get('up'))
    if request.GET.get('year') is None:
        year = datetime.datetime.now().year
    else:
        year = request.GET.get('year')
    res = Exam.get(*Exam.ID[int(year)], username=res[0], password=res[1])
    return HttpResponse(json.dumps(res), content_type='application/json')
