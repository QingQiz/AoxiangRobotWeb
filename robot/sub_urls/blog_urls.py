#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django.urls import path
from robot.views.blog.blog import *
import robot.apis.blog.blog as api

urlpatterns = [
    path('', index, name='blog_index'),
    path('login', login, name='blog_login'),
    # path('register', register, name='blog_register'),

    path('active', api.verify, name='blog_api_verify'),
    path('api/login', api.login, name='blog_api_login'),
    path('api/register', api.register, name='blog_api_register'),
    path('api/logout', api.logout, name='blog_api_logout')
]
