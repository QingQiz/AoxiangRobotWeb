from django.shortcuts import render


def index(request):
    return render(request, 'dashboard/index.html')


def e400(request, exception=None):
    return render(request, 'dashboard/error.html', {'error_code': 400})


def e404(request, exception=None):
    return render(request, 'dashboard/error.html', {'error_code': 404})


def e403(request, exception=None):
    return render(request, 'dashboard/error.html', {'error_code': 403})


def e500(request):
    return render(request, 'dashboard/error.html', {'error_code': 500})


def error(request, msg='OOPS! Something went wrong here'):
    return render(request, 'dashboard/error.html', {'error_code': 'Error', 'error_msg': msg})


