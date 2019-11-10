#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django.urls import path
from robot.views.Aoxiang import login, grade, class_table
from robot.apis.Aoxiang import check, get


urlpatterns = [
    path('action/login', login.login, name='ax_Login'),
    path('action/grade', grade.get_grade, name='ax_Grade'),
    path('action/ct', class_table.class_table, name='ax_CT'),

    path('api/check', check.check, name='ax_Check'),
    path('api/check_cookies', check.check_cookies, name="ax_CCookies"),
    path('api/grade', get.get_grade, name="ax_GradeApi"),
    path('api/getId', get.get_id, name="ax_GET_ID"),
    path('api/ct', get.get_ct, name="ax_GCT"),
    path('api/exp_ct.ics', get.export_ct, name="ax_ECT"),
]
