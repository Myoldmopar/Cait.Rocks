# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-05-31 14:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0012_recipe_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='title',
            field=models.CharField(help_text='The descriptive title for this recipe', max_length=100, unique=True),
        ),
    ]