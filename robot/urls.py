from django.urls import path
from robot.views import index, login, status
from robot.apis import check

urlpatterns = [
    path('', index.index, name='Home'),
    path('status/404', status.h404, name='404'),
    path('action/login', login.login, name='Login'),
    path('api/check', check.check, name='Check')
]