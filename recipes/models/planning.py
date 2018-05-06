# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import calendar

from django.db import models

from recipes.models.recipe import Recipe


class CalendarDay(models.Model):
    nickname = models.CharField(max_length=100,
                                help_text="A brief nickname for this month, usually auto-generated as YY-MMM-DD")
    recipe01 = models.ForeignKey(Recipe, related_name="recipe01", null=True, blank=True)
    recipe02 = models.ForeignKey(Recipe, related_name="recipe02", null=True, blank=True)
    recipe03 = models.ForeignKey(Recipe, related_name="recipe03", null=True, blank=True)
    recipe04 = models.ForeignKey(Recipe, related_name="recipe04", null=True, blank=True)

    def __str__(self):
        return "A single calendar day instance, containing up to 4 recipes"


class Calendar(models.Model):
    year = models.IntegerField(help_text="The year of this calendar month")
    month = models.IntegerField(help_text="The month index (1-12) of this calendar month")
    nickname = models.CharField(max_length=100,
                                help_text="A brief nickname for this month, usually auto-generated as YY-MMM")
    day01 = models.ForeignKey(CalendarDay, help_text="A pointer to day #01 of this month", related_name="day01",
                              null=True, blank=True)
    day02 = models.ForeignKey(CalendarDay, help_text="A pointer to day #02 of this month", related_name="day02",
                              null=True, blank=True)
    day03 = models.ForeignKey(CalendarDay, help_text="A pointer to day #03 of this month", related_name="day03",
                              null=True, blank=True)
    day04 = models.ForeignKey(CalendarDay, help_text="A pointer to day #04 of this month", related_name="day04",
                              null=True, blank=True)
    day05 = models.ForeignKey(CalendarDay, help_text="A pointer to day #05 of this month", related_name="day05",
                              null=True, blank=True)
    day06 = models.ForeignKey(CalendarDay, help_text="A pointer to day #06 of this month", related_name="day06",
                              null=True, blank=True)
    day07 = models.ForeignKey(CalendarDay, help_text="A pointer to day #07 of this month", related_name="day07",
                              null=True, blank=True)
    day08 = models.ForeignKey(CalendarDay, help_text="A pointer to day #08 of this month", related_name="day08",
                              null=True, blank=True)
    day09 = models.ForeignKey(CalendarDay, help_text="A pointer to day #09 of this month", related_name="day09",
                              null=True, blank=True)
    day10 = models.ForeignKey(CalendarDay, help_text="A pointer to day #10 of this month", related_name="day10",
                              null=True, blank=True)
    day11 = models.ForeignKey(CalendarDay, help_text="A pointer to day #11 of this month", related_name="day11",
                              null=True, blank=True)
    day12 = models.ForeignKey(CalendarDay, help_text="A pointer to day #12 of this month", related_name="day12",
                              null=True, blank=True)
    day13 = models.ForeignKey(CalendarDay, help_text="A pointer to day #13 of this month", related_name="day13",
                              null=True, blank=True)
    day14 = models.ForeignKey(CalendarDay, help_text="A pointer to day #14 of this month", related_name="day14",
                              null=True, blank=True)
    day15 = models.ForeignKey(CalendarDay, help_text="A pointer to day #15 of this month", related_name="day15",
                              null=True, blank=True)
    day16 = models.ForeignKey(CalendarDay, help_text="A pointer to day #16 of this month", related_name="day16",
                              null=True, blank=True)
    day17 = models.ForeignKey(CalendarDay, help_text="A pointer to day #17 of this month", related_name="day17",
                              null=True, blank=True)
    day18 = models.ForeignKey(CalendarDay, help_text="A pointer to day #18 of this month", related_name="day18",
                              null=True, blank=True)
    day19 = models.ForeignKey(CalendarDay, help_text="A pointer to day #19 of this month", related_name="day19",
                              null=True, blank=True)
    day20 = models.ForeignKey(CalendarDay, help_text="A pointer to day #20 of this month", related_name="day20",
                              null=True, blank=True)
    day21 = models.ForeignKey(CalendarDay, help_text="A pointer to day #21 of this month", related_name="day21",
                              null=True, blank=True)
    day22 = models.ForeignKey(CalendarDay, help_text="A pointer to day #22 of this month", related_name="day22",
                              null=True, blank=True)
    day23 = models.ForeignKey(CalendarDay, help_text="A pointer to day #23 of this month", related_name="day23",
                              null=True, blank=True)
    day24 = models.ForeignKey(CalendarDay, help_text="A pointer to day #24 of this month", related_name="day24",
                              null=True, blank=True)
    day25 = models.ForeignKey(CalendarDay, help_text="A pointer to day #25 of this month", related_name="day25",
                              null=True, blank=True)
    day26 = models.ForeignKey(CalendarDay, help_text="A pointer to day #26 of this month", related_name="day26",
                              null=True, blank=True)
    day27 = models.ForeignKey(CalendarDay, help_text="A pointer to day #27 of this month", related_name="day27",
                              null=True, blank=True)
    day28 = models.ForeignKey(CalendarDay, help_text="A pointer to day #28 of this month", related_name="day28",
                              null=True, blank=True)
    day29 = models.ForeignKey(CalendarDay, help_text="A pointer to day #29 of this month", related_name="day29",
                              null=True, blank=True)
    day30 = models.ForeignKey(CalendarDay, help_text="A pointer to day #30 of this month", related_name="day30",
                              null=True, blank=True)
    day31 = models.ForeignKey(CalendarDay, help_text="A pointer to day #31 of this month", related_name="day31",
                              null=True, blank=True)

    def __str__(self):
        if self.nickname:
            if len(self.nickname) < 40:
                return self.nickname
            return self.nickname[:40]
        else:
            return "Unnamed calendar"

    @staticmethod
    def instantiate_recipes(calendar_day_instance):
        if not calendar_day_instance.recipe01:
            r = Recipe()
            r.save()
            calendar_day_instance.recipe01 = r
        if not calendar_day_instance.recipe02:
            r = Recipe()
            r.save()
            calendar_day_instance.recipe02 = r
        if not calendar_day_instance.recipe03:
            r = Recipe()
            r.save()
            calendar_day_instance.recipe03 = r
        if not calendar_day_instance.recipe04:
            r = Recipe()
            r.save()
            calendar_day_instance.recipe04 = r
        calendar_day_instance.save()

    def get_monthly_dates(self):
        """
        Returns monthly data, including date numbers and calendar-day ids for each day, if applicable
        :return: An array of 4 or 5 weeks, each week is an array of 7 days, each day has a date_number key that will be
        0 or the actual date and a day_key key that will be 0 if no calendar-day is specified or the id
        of the calendar-day object if it is
        """

        # There are a lot of bandaids in here for handling blank calendar days, and blank recipes for each day
        # This should all be tightened up during calendar creation so we can feel better about removing these here
        # need to validate year/month
        c = calendar.Calendar()
        c.setfirstweekday(6)
        date_numbers = c.monthdayscalendar(self.year, self.month)
        full_date_data = []
        for week in date_numbers:
            this_week = []
            for date in week:
                this_date = dict()
                this_date['date_number'] = date
                day_object = self.get_day_for_date(date)
                if day_object:
                    this_date['day_key'] = day_object.id
                    try:
                        c = CalendarDay.objects.get(pk=day_object.id)
                        self.instantiate_recipes(c)
                        this_date['calendar_day'] = c
                    except CalendarDay.DoesNotExist:
                        c = CalendarDay()
                        self.instantiate_recipes(c)
                        this_date['calendar_day'] = c
                        this_date['day_key'] = c.id
                else:
                    c = CalendarDay()
                    self.instantiate_recipes(c)
                    this_date['calendar_day'] = c
                    this_date['day_key'] = c.id
                this_week.append(this_date)
            full_date_data.append(this_week)
        return full_date_data

    def get_day_for_date(self, date_num):
        """
        Returns the foreign key id for the given date num on this calendar instance, if applicable
        :param date_num: The date of the month, 1-31
        :return: The id of the calendar-day foreignkey if available, or None if there isn't a calendar-day
        or if date_num is out of range
        """
        if date_num == 1:
            return self.day01
        elif date_num == 2:
            return self.day02
        elif date_num == 3:
            return self.day03
        elif date_num == 4:
            return self.day04
        elif date_num == 5:
            return self.day05
        elif date_num == 6:
            return self.day06
        elif date_num == 7:
            return self.day07
        elif date_num == 8:
            return self.day08
        elif date_num == 9:
            return self.day09
        elif date_num == 10:
            return self.day10
        elif date_num == 11:
            return self.day11
        elif date_num == 12:
            return self.day12
        elif date_num == 13:
            return self.day13
        elif date_num == 14:
            return self.day14
        elif date_num == 15:
            return self.day15
        elif date_num == 16:
            return self.day16
        elif date_num == 17:
            return self.day17
        elif date_num == 18:
            return self.day18
        elif date_num == 19:
            return self.day19
        elif date_num == 20:
            return self.day20
        elif date_num == 21:
            return self.day21
        elif date_num == 22:
            return self.day22
        elif date_num == 23:
            return self.day23
        elif date_num == 24:
            return self.day24
        elif date_num == 25:
            return self.day25
        elif date_num == 26:
            return self.day26
        elif date_num == 27:
            return self.day27
        elif date_num == 28:
            return self.day28
        elif date_num == 29:
            return self.day29
        elif date_num == 30:
            return self.day30
        elif date_num == 31:
            return self.day31
        else:
            return None  # should consider what to return here
