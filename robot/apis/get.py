import json
import datetime
from . import check
from django.http import HttpResponse
from robot.lib.AoxiangRobot.functions import Grade, Exam
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def get_grade(request, year=datetime.datetime.now().year%100-1):
    up = request.COOKIES.get('up')
    if up is None:
        return HttpResponse(json.dumps({'error': 1}), content_type='application/json')
    res = check.username_password(up)
    if request.GET.get('year') is not None:
        year = int(request.GET.get('year')) % 100
    res = Grade.get(year, username=res[0], password=res[1])[0]

    return HttpResponse(json.dumps(res), content_type='application/json')


@csrf_exempt
def get_exam(request, year=datetime.datetime.now().year%100-1):
    up = request.COOKIES.get('up')
    if up is None:
        return HttpResponse(json.dumps({'error': 1}), content_type='application/json')
    res = check.username_password(up)
    if request.GET.get('year') is not None:
        year = int(request.GET.get('year')) % 100
    res = Exam.get(*Exam.ID[int(year)], username=res[0], password=res[1])[0]
    return HttpResponse(json.dumps(res), content_type='application/json')
