# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-04-23 01:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('recipes', '0006_auto_20180422_1756'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='recipe_type',
            field=models.CharField(
                choices=[('10', 'Unknown'), ('30', 'Entree'), ('40', 'Soup'), ('50', 'Salad'), ('60', 'Drink'),
                         ('70', 'Dessert'), ('80', 'Side Dish'), ('90', 'Sauce/Dressing'), ('100', 'Seasoning')],
                default='Unknown', max_length=20),
        ),
    ]
