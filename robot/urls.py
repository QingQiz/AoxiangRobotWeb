from django.urls import path
from robot.views import index, login, status
from robot.apis import check, get

urlpatterns = [
    path('', index.index, name='Home'),
    path('status/404', status.h404, name='404'),
    path('action/login', login.login, name='Login'),

    path('api/check', check.check, name='Check'),
    path('api/check_cookies', check.check_cookies, name="CCookies"),
    path('api/grade', get.get_grade, name="Grade"),
    path('api/exam', get.get_exam, name="Exam")
]