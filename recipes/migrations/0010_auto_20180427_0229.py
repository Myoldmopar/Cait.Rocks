# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-04-27 02:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('recipes', '0009_auto_20180427_0215'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='measurement',
            field=models.CharField(
                choices=[('0', ''), ('5', 'Pinch'), ('10', 'tsp'), ('20', 'Tbsp'), ('30', 'c'), ('40', 'pint'),
                         ('50', 'qt'), ('60', 'liter'), ('70', 'gallon')], default='', max_length=25),
        ),
    ]
