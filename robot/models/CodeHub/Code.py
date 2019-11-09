#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django.db import models


class Code(models.Model):
    LANGUAGE = (
        ('plaintext', 'plaintext'),
        ('Apache', 'Apache'),
        ('Bash', 'Bash'),
        ('C#', 'C#'),
        ('C++', 'C++'),
        ('CSS', 'CSS'),
        ('CoffeeScript', 'CoffeeScript'),
        ('Diff', 'Diff'),
        ('HTML', 'HTML'),
        ('XML', 'XML'),
        ('HTTP', 'HTTP'),
        ('Ini', 'Ini'),
        ('TOML', 'TOML'),
        ('JSON', 'JSON'),
        ('Java', 'Java'),
        ('JavaScript', 'JavaScript'),
        ('Makefile', 'Makefile'),
        ('Markdown', 'Markdown'),
        ('Nginx', 'Nginx'),
        ('Objective-C', 'Objective-C'),
        ('PHP', 'PHP'),
        ('Perl', 'Perl'),
        ('Properties', 'Properties'),
        ('Python', 'Python'),
        ('Ruby', 'Ruby'),
        ('SQL', 'SQL'),
        ('Shell', 'Shell'),
        ('Session', 'Session'),
    )

    author = models.CharField(max_length=30)
    language = models.CharField(default=1, max_length=10, choices=LANGUAGE)
    code = models.TextField(default='')
    paste_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{} {} ({})'.format(self.id, self.author, self.language)

