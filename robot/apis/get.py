import json
from . import check
from django.http import HttpResponse
from robot.lib.AoxiangRobot.functions import Grade
from robot.lib.AoxiangRobot.functions.ClassTable import ClassTable, GetClass
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
def get_id(request):
    # check cookie
    up = request.COOKIES.get('up')
    res = check.username_password(up)
    if res is None:
        return HttpResponse(json.dumps({'error': 1}), content_type='application/json')

    return HttpResponse(json.dumps({'id': res[0]}), content_type='application/json')


@csrf_exempt
def get_ct(request):
    # check cookie
    up = request.COOKIES.get('up')
    res = check.username_password(up)
    if res is None:
        return HttpResponse(json.dumps({'error': 1}), content_type='application/json')

    try:
        method = int(request.GET.get('cp'))

        class_info = GetClass.get(method, username=res[0], password=res[1])
        info = ClassTable.get_json(class_info, '20190826', method)

        for i in info:
            i['className'] = 'm-fc-event--accent'
        return HttpResponse(json.dumps(info), content_type='application/json')
    except ValueError:
        return HttpResponse(json.dumps({'error': 1}), content_type='application/json')


@csrf_exempt
def export_ct(request):
    # check cookie
    up = request.COOKIES.get('up')
    res = check.username_password(up)
    if res is None:
        return HttpResponse(json.dumps({'error': 1}), content_type='application/json')

    try:
        method = int(request.GET.get('cp'))

        class_info = GetClass.get(method, username=res[0], password=res[1])
        info = ClassTable.get_calendar(class_info, '20190826', method=method)

        return HttpResponse(info, content_type='application/octet-stream')
    except ValueError:
        return HttpResponse(json.dumps({'error': 1}), content_type='application/json')


