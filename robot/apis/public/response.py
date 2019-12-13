#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django.http import HttpResponse
import json

def ret_json(**kwargs):
    return HttpResponse(json.dumps(kwargs), content_type='application/json')
