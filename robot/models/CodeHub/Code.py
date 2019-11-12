#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import uuid
from django.db import models


def generate_uuid():
    return uuid.uuid4().hex


class Code(models.Model):
    id = models.CharField(primary_key=True, default=generate_uuid, editable=False, max_length=40)
    LANGUAGE = [
        'auto',
        'plaintext',
        'apache',
        'bash',
        'c#',
        'c++',
        'css',
        'coffeescript',
        'diff',
        'html',
        'xml',
        'http',
        'ini',
        'toml',
        'json',
        'java',
        'javascript',
        'makefile',
        'markdown',
        'nginx',
        'objective-c',
        'php',
        'perl',
        'properties',
        'python',
        'ruby',
        'sql',
        'shell',
        'session'
    ]

    author = models.CharField(max_length=30)
    language = models.CharField(max_length=10)
    code = models.TextField(default='')
    paste_time = models.DateTimeField(auto_now=True)

    password = models.TextField(null=True, default=None)

    def __str__(self):
        return '{} {} ({})'.format(self.id, self.author, self.language)
