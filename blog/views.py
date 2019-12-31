from django.shortcuts import render


def login(request):
    return render(request, 'blog/login.html')


def index(request):
    print(request.session.get('uid'))
    return render(request, 'blog/index.html', {
        'login': '1' if request.session.get('uid') is not None else '0',
        'username': request.session.get('username'),
        'email': request.session.get('email')
    })
