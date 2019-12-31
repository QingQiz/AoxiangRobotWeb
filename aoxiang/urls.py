#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from django.urls import path
from aoxiang.views import *
import aoxiang.apis as api


urlpatterns = [
    path('action/login', login, name='ax_Login'),
    path('action/grade', get_grade, name='ax_Grade'),
    path('action/ct', class_table, name='ax_CT'),

    path('api/check', api.check, name='ax_Check'),
    path('api/check_cookies', api.check_cookies, name="ax_CCookies"),
    path('api/grade', api.get_grade, name="ax_GradeApi"),
    path('api/getId', api.get_id, name="ax_GET_ID"),
    path('api/ct', api.get_ct, name="ax_GCT"),
    path('api/exp_ct.ics', api.export_ct, name="ax_ECT"),
]

