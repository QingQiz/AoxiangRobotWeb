#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import random, string, os

with open('./sec_key', 'w') as f:
    f.write(''.join([random.choice(string.printable) for i in range(256)]))

os.system('./manage.py collectstatic')
