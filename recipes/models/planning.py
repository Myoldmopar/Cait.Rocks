# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import calendar

from django.core.urlresolvers import reverse
from django.db import models

from recipes.models.recipe import Recipe


class Calendar(models.Model):
    year = models.IntegerField(help_text="The year of this calendar month")
    month = models.IntegerField(help_text="The month index (1-12) of this calendar month")
    nickname = models.CharField(max_length=100,
                                help_text="A brief nickname for this month, usually auto-generated as YY-MMM")
    day01recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 01', related_name='day01recipe0',
                                     null=True, blank=True)
    day01recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 01', related_name='day01recipe1',
                                     null=True, blank=True)
    day02recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 02', related_name='day02recipe0',
                                     null=True, blank=True)
    day02recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 02', related_name='day02recipe1',
                                     null=True, blank=True)
    day03recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 03', related_name='day03recipe0',
                                     null=True, blank=True)
    day03recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 03', related_name='day03recipe1',
                                     null=True, blank=True)
    day04recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 04', related_name='day04recipe0',
                                     null=True, blank=True)
    day04recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 04', related_name='day04recipe1',
                                     null=True, blank=True)
    day05recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 05', related_name='day05recipe0',
                                     null=True, blank=True)
    day05recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 05', related_name='day05recipe1',
                                     null=True, blank=True)
    day06recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 06', related_name='day06recipe0',
                                     null=True, blank=True)
    day06recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 06', related_name='day06recipe1',
                                     null=True, blank=True)
    day07recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 07', related_name='day07recipe0',
                                     null=True, blank=True)
    day07recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 07', related_name='day07recipe1',
                                     null=True, blank=True)
    day08recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 08', related_name='day08recipe0',
                                     null=True, blank=True)
    day08recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 08', related_name='day08recipe1',
                                     null=True, blank=True)
    day09recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 09', related_name='day09recipe0',
                                     null=True, blank=True)
    day09recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 09', related_name='day09recipe1',
                                     null=True, blank=True)
    day10recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 10', related_name='day10recipe0',
                                     null=True, blank=True)
    day10recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 10', related_name='day10recipe1',
                                     null=True, blank=True)
    day11recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 11', related_name='day11recipe0',
                                     null=True, blank=True)
    day11recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 11', related_name='day11recipe1',
                                     null=True, blank=True)
    day12recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 12', related_name='day12recipe0',
                                     null=True, blank=True)
    day12recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 12', related_name='day12recipe1',
                                     null=True, blank=True)
    day13recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 13', related_name='day13recipe0',
                                     null=True, blank=True)
    day13recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 13', related_name='day13recipe1',
                                     null=True, blank=True)
    day14recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 14', related_name='day14recipe0',
                                     null=True, blank=True)
    day14recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 14', related_name='day14recipe1',
                                     null=True, blank=True)
    day15recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 15', related_name='day15recipe0',
                                     null=True, blank=True)
    day15recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 15', related_name='day15recipe1',
                                     null=True, blank=True)
    day16recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 16', related_name='day16recipe0',
                                     null=True, blank=True)
    day16recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 16', related_name='day16recipe1',
                                     null=True, blank=True)
    day17recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 17', related_name='day17recipe0',
                                     null=True, blank=True)
    day17recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 17', related_name='day17recipe1',
                                     null=True, blank=True)
    day18recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 18', related_name='day18recipe0',
                                     null=True, blank=True)
    day18recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 18', related_name='day18recipe1',
                                     null=True, blank=True)
    day19recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 19', related_name='day19recipe0',
                                     null=True, blank=True)
    day19recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 19', related_name='day19recipe1',
                                     null=True, blank=True)
    day20recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 20', related_name='day20recipe0',
                                     null=True, blank=True)
    day20recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 20', related_name='day20recipe1',
                                     null=True, blank=True)
    day21recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 21', related_name='day21recipe0',
                                     null=True, blank=True)
    day21recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 21', related_name='day21recipe1',
                                     null=True, blank=True)
    day22recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 22', related_name='day22recipe0',
                                     null=True, blank=True)
    day22recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 22', related_name='day22recipe1',
                                     null=True, blank=True)
    day23recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 23', related_name='day23recipe0',
                                     null=True, blank=True)
    day23recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 23', related_name='day23recipe1',
                                     null=True, blank=True)
    day24recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 24', related_name='day24recipe0',
                                     null=True, blank=True)
    day24recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 24', related_name='day24recipe1',
                                     null=True, blank=True)
    day25recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 25', related_name='day25recipe0',
                                     null=True, blank=True)
    day25recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 25', related_name='day25recipe1',
                                     null=True, blank=True)
    day26recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 26', related_name='day26recipe0',
                                     null=True, blank=True)
    day26recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 26', related_name='day26recipe1',
                                     null=True, blank=True)
    day27recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 27', related_name='day27recipe0',
                                     null=True, blank=True)
    day27recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 27', related_name='day27recipe1',
                                     null=True, blank=True)
    day28recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 28', related_name='day28recipe0',
                                     null=True, blank=True)
    day28recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 28', related_name='day28recipe1',
                                     null=True, blank=True)
    day29recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 29', related_name='day29recipe0',
                                     null=True, blank=True)
    day29recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 29', related_name='day29recipe1',
                                     null=True, blank=True)
    day30recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 30', related_name='day30recipe0',
                                     null=True, blank=True)
    day30recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 30', related_name='day30recipe1',
                                     null=True, blank=True)
    day31recipe0 = models.ForeignKey(Recipe, help_text='A pointer to recipe 0 for day 31', related_name='day31recipe0',
                                     null=True, blank=True)
    day31recipe1 = models.ForeignKey(Recipe, help_text='A pointer to recipe 1 for day 31', related_name='day31recipe1',
                                     null=True, blank=True)

    def __str__(self):
        if self.nickname:
            if len(self.nickname) < 40:
                return self.nickname
            return self.nickname[:40]
        else:
            return "Unnamed calendar"

    def get_monthly_dates(self):
        """
        Returns monthly data, including date numbers and recipe ids for each day, if applicable
        :return: An array of 4 or 5 weeks, each week is an array of 7 days, each day has a date_number key that will be
        0 or the actual date and a two recipe ids, that may be None if no recipes are selected
        """
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
                recipes = self.get_recipes_for_day_of_month(date)
                this_date['recipe0'] = recipes[0]
                this_date['recipe1'] = recipes[1]
                this_week.append(this_date)
            full_date_data.append(this_week)
        return full_date_data

    def get_recipes_for_day_of_month(self, date_num):
        """
        Returns the recipe ids for the given date num on this calendar instance, if applicable
        :param date_num: The date of the month, 1-31
        :return: List of two ids: [recipe01_id, recipe02_id]; these may be None if no recipes are selected or if
        date_num is out of range
        """
        if date_num == 0:
            return [None, None]
        day_string = '%02d' % date_num
        return [getattr(self, 'day%srecipe0' % day_string), getattr(self, 'day%srecipe1' % day_string)]
        # TODO: Error handle all over here

    def get_absolute_url(self):
        return reverse('planner:months-detail', kwargs={'pk': self.id})
