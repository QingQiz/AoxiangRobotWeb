#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django.urls import path
import robot.views.CodeHub.Paste as codeHub


urlpatterns = [
    path('', codeHub.paste, name='ch_paste'),
    path('l', codeHub.list_all, name='ch_list'),
    path('p/<int:codeid>', codeHub.codeview, name='ch_cv'),
    path('p/<int:codeid>/raw', codeHub.coderaw, name='ch_raw'),
    path('d/<int:codeid>', codeHub.delete, name='ch_d'),
    path('auth', codeHub.authorization, name='ch_auth')
]
