#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django.urls import path
from dashboard.views import *

urlpatterns = [
    path('', index, name='Index'),
    path('error', error, name="Error"),
    path('error/404', e404, name="404"),
    path('error/403', e403, name="403"),
    path('error/400', e400, name="400"),
    path('error/500', e500, name="500"),
]
