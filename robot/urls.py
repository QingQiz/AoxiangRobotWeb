from django.urls import path
from robot.views.Aoxiang import login, grade, class_table
from robot.views.Public import index, error
from robot.apis.Aoxiang import check, get

urlpatterns = [
    path('', index.index, name='Index'),
    path('error', error.error, name="Error"),
    path('error/404', error.e404, name="404"),
    path('error/403', error.e403, name="403"),
    path('error/400', error.e400, name="400"),
    path('error/500', error.e500, name="500"),

    path('ax/action/login', login.login, name='Login'),
    path('ax/action/grade', grade.get_grade, name='Grade'),
    path('ax/action/ct', class_table.class_table, name='CT'),

    path('ax/api/check', check.check, name='Check'),
    path('ax/api/check_cookies', check.check_cookies, name="CCookies"),
    path('ax/api/grade', get.get_grade, name="GradeApi"),
    path('ax/api/getId', get.get_id, name="GET_ID"),
    path('ax/api/ct', get.get_ct, name="GCT"),
    path('ax/api/exp_ct.ics', get.export_ct, name="ECT"),
]
