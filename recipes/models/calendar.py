# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from recipes.models.recipe import Recipe


class CalendarDay(models.Model):
    nickname = models.CharField(max_length=100,
                                help_text="A brief nickname for this month, usually auto-generated as YY-MMM-DD")
    recipe01 = models.OneToOneField(Recipe, related_name="recipe01", null=True, blank=True)
    recipe02 = models.OneToOneField(Recipe, related_name="recipe02", null=True, blank=True)
    recipe03 = models.OneToOneField(Recipe, related_name="recipe03", null=True, blank=True)
    recipe04 = models.OneToOneField(Recipe, related_name="recipe04", null=True, blank=True)

    def __str__(self):
        return "A single calendar day instance, containing up to 4 recipes"


class Calendar(models.Model):
    year = models.IntegerField(help_text="The year of this calendar month")
    month = models.IntegerField(help_text="The month index (1-12) of this calendar month")
    nickname = models.CharField(max_length=100,
                                help_text="A brief nickname for this month, usually auto-generated as YY-MMM")
    day01 = models.OneToOneField(CalendarDay, help_text="A pointer to day #01 of this month", related_name="day01", null=True, blank=True)
    day02 = models.OneToOneField(CalendarDay, help_text="A pointer to day #02 of this month", related_name="day02", null=True, blank=True)
    day03 = models.OneToOneField(CalendarDay, help_text="A pointer to day #03 of this month", related_name="day03", null=True, blank=True)
    day04 = models.OneToOneField(CalendarDay, help_text="A pointer to day #04 of this month", related_name="day04", null=True, blank=True)
    day05 = models.OneToOneField(CalendarDay, help_text="A pointer to day #05 of this month", related_name="day05", null=True, blank=True)
    day06 = models.OneToOneField(CalendarDay, help_text="A pointer to day #06 of this month", related_name="day06", null=True, blank=True)
    day07 = models.OneToOneField(CalendarDay, help_text="A pointer to day #07 of this month", related_name="day07", null=True, blank=True)
    day08 = models.OneToOneField(CalendarDay, help_text="A pointer to day #08 of this month", related_name="day08", null=True, blank=True)
    day09 = models.OneToOneField(CalendarDay, help_text="A pointer to day #09 of this month", related_name="day09", null=True, blank=True)
    day10 = models.OneToOneField(CalendarDay, help_text="A pointer to day #10 of this month", related_name="day10", null=True, blank=True)
    day11 = models.OneToOneField(CalendarDay, help_text="A pointer to day #11 of this month", related_name="day11", null=True, blank=True)
    day12 = models.OneToOneField(CalendarDay, help_text="A pointer to day #12 of this month", related_name="day12", null=True, blank=True)
    day13 = models.OneToOneField(CalendarDay, help_text="A pointer to day #13 of this month", related_name="day13", null=True, blank=True)
    day14 = models.OneToOneField(CalendarDay, help_text="A pointer to day #14 of this month", related_name="day14", null=True, blank=True)
    day15 = models.OneToOneField(CalendarDay, help_text="A pointer to day #15 of this month", related_name="day15", null=True, blank=True)
    day16 = models.OneToOneField(CalendarDay, help_text="A pointer to day #16 of this month", related_name="day16", null=True, blank=True)
    day17 = models.OneToOneField(CalendarDay, help_text="A pointer to day #17 of this month", related_name="day17", null=True, blank=True)
    day18 = models.OneToOneField(CalendarDay, help_text="A pointer to day #18 of this month", related_name="day18", null=True, blank=True)
    day19 = models.OneToOneField(CalendarDay, help_text="A pointer to day #19 of this month", related_name="day19", null=True, blank=True)
    day20 = models.OneToOneField(CalendarDay, help_text="A pointer to day #20 of this month", related_name="day20", null=True, blank=True)
    day21 = models.OneToOneField(CalendarDay, help_text="A pointer to day #21 of this month", related_name="day21", null=True, blank=True)
    day22 = models.OneToOneField(CalendarDay, help_text="A pointer to day #22 of this month", related_name="day22", null=True, blank=True)
    day23 = models.OneToOneField(CalendarDay, help_text="A pointer to day #23 of this month", related_name="day23", null=True, blank=True)
    day24 = models.OneToOneField(CalendarDay, help_text="A pointer to day #24 of this month", related_name="day24", null=True, blank=True)
    day25 = models.OneToOneField(CalendarDay, help_text="A pointer to day #25 of this month", related_name="day25", null=True, blank=True)
    day26 = models.OneToOneField(CalendarDay, help_text="A pointer to day #26 of this month", related_name="day26", null=True, blank=True)
    day27 = models.OneToOneField(CalendarDay, help_text="A pointer to day #27 of this month", related_name="day27", null=True, blank=True)
    day28 = models.OneToOneField(CalendarDay, help_text="A pointer to day #28 of this month", related_name="day28", null=True, blank=True)
    day29 = models.OneToOneField(CalendarDay, help_text="A pointer to day #29 of this month", related_name="day29", null=True, blank=True)
    day30 = models.OneToOneField(CalendarDay, help_text="A pointer to day #30 of this month", related_name="day30", null=True, blank=True)
    day31 = models.OneToOneField(CalendarDay, help_text="A pointer to day #31 of this month", related_name="day31", null=True, blank=True)

    def __str__(self):
        if self.nickname:
            if len(self.nickname) < 40:
                return self.nickname
            return self.nickname[:40]
        else:
            return "Unnamed calendar"
