# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-05-07 19:32
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0018_auto_20180507_1928'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='calendar',
            name='day00recipe0',
        ),
        migrations.RemoveField(
            model_name='calendar',
            name='day00recipe1',
        ),
    ]
