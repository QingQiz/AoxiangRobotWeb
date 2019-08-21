import json
import datetime
from . import check
from django.http import HttpResponse
from robot.lib.AoxiangRobot.functions import Grade, Exam
from django.views.decorators.csrf import csrf_exempt


def valid_data(tid, term):
    try:
        int(tid), int(term)
        return True
    except (ValueError, TypeError):
        return False


@csrf_exempt
def get_grade(request):
    # check data
    year, term = request.GET.get('y'), request.GET.get('t')
    if not valid_data(year, term):
        return HttpResponse(json.dumps({'error': 1}), content_type='application/json')
    else:
        year = int(year) % 100

    # check cookie
    up = request.COOKIES.get('up')
    res = check.username_password(up)
    if res is None:
        return HttpResponse(json.dumps({'error': 1}), content_type='application/json')

    # request data
    try:
        res = Grade.get(year + int(term) * 18, username=res[0], password=res[1])[0]
    except ValueError:
        return HttpResponse(json.dumps({'error': 1}), content_type='application/json')

    # return data
    return HttpResponse(json.dumps(res), content_type='application/json')


@csrf_exempt
def get_exam(request):
    # check data
    year, term = request.GET.get('y'), request.GET.get('t')
    if not valid_data(year, term):
        return HttpResponse(json.dumps({'error': 1}), content_type='application/json')
    else:
        year = int(year) % 100

    # check cookie
    up = request.COOKIES.get('up')
    res = check.username_password(up)
    if res is None:
        return HttpResponse(json.dumps({'error': 1}), content_type='application/json')

    # request data
    try:
        res = Exam.get(Exam.ID[year][int(term)], username=res[0], password=res[1])[0]
    except (ValueError, KeyError):
        return HttpResponse(json.dumps({'error': 1}), content_type='application/json')

    # return data
    return HttpResponse(json.dumps(res), content_type='application/json')

