# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-05-16 01:53
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0009_auto_20180509_2319'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2018, 5, 16, 1, 53, 30, 605731), help_text='The creation date for this recipe object'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='recipe',
            name='modified_date',
            field=models.DateTimeField(auto_now=True, help_text='The last modified date for this recipe object'),
        ),
    ]
