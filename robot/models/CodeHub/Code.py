#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django.db import models


class Code(models.Model):
    LANGUAGE = [
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

    def __str__(self):
        return '{} {} ({})'.format(self.id, self.author, self.language)
