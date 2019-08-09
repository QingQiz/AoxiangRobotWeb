from django.shortcuts import render


def h404(request):
    return render(request, 'error404.html')