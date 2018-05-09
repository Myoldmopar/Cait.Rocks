# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-05-09 21:07
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0007_auto_20180509_1926'),
    ]

    operations = [
        migrations.AlterField(
            model_name='direction',
            name='recipe',
            field=models.ForeignKey(help_text='A pointer to an existing recipe to link them together', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='direction', to='recipes.Recipe'),
        ),
    ]
