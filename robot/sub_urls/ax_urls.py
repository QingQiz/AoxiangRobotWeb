#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django.urls import path
from robot.views.Aoxiang import login, grade, class_table
from robot.apis.Aoxiang import check, get


urlpatterns = [
    path('action/login', login.login, name='Login'),
    path('action/grade', grade.get_grade, name='Grade'),
    path('action/ct', class_table.class_table, name='CT'),

    path('api/check', check.check, name='Check'),
    path('api/check_cookies', check.check_cookies, name="CCookies"),
    path('api/grade', get.get_grade, name="GradeApi"),
    path('api/getId', get.get_id, name="GET_ID"),
    path('api/ct', get.get_ct, name="GCT"),
    path('api/exp_ct.ics', get.export_ct, name="ECT"),
]
