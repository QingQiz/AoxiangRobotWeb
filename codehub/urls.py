#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from django.urls import path
from codehub.views import *

urlpatterns = [
    path('', paste, name='ch_paste'),
    path('l', list_all, name='ch_list'),
    path('p/<str:codeid>', codeview, name='ch_cv'),
    path('p/<str:codeid>/raw', coderaw, name='ch_raw'),
    path('d/<str:codeid>', delete, name='ch_d'),
    path('auth', authorization, name='ch_auth')
]

