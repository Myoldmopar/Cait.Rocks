# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-05-03 05:39
from __future__ import unicode_literals

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('recipes', '0015_auto_20180503_0538'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calendar',
            name='day01',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #01 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day01',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day02',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #02 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day02',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day03',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #03 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day03',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day04',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #04 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day04',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day05',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #05 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day05',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day06',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #06 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day06',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day07',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #07 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day07',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day08',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #08 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day08',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day09',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #09 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day09',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day10',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #10 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day10',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day11',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #11 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day11',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day12',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #12 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day12',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day13',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #13 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day13',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day14',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #14 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day14',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day15',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #15 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day15',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day16',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #16 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day16',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day17',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #17 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day17',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day18',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #18 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day18',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day19',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #19 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day19',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day20',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #20 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day20',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day21',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #21 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day21',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day22',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #22 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day22',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day23',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #23 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day23',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day24',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #24 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day24',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day25',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #25 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day25',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day26',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #26 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day26',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day27',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #27 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day27',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day28',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #28 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day28',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day29',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #29 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day29',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day30',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #30 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day30',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='day31',
            field=models.OneToOneField(blank=True, help_text='A pointer to day #31 of this month', null=True,
                                       on_delete=django.db.models.deletion.CASCADE, related_name='day31',
                                       to='recipes.CalendarDay'),
        ),
        migrations.AlterField(
            model_name='calendarday',
            name='recipe01',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE,
                                       related_name='recipe01', to='recipes.Recipe'),
        ),
        migrations.AlterField(
            model_name='calendarday',
            name='recipe02',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE,
                                       related_name='recipe02', to='recipes.Recipe'),
        ),
        migrations.AlterField(
            model_name='calendarday',
            name='recipe03',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE,
                                       related_name='recipe03', to='recipes.Recipe'),
        ),
        migrations.AlterField(
            model_name='calendarday',
            name='recipe04',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE,
                                       related_name='recipe04', to='recipes.Recipe'),
        ),
    ]
