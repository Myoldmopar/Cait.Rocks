# -*- coding: utf-8 -*-
from django.test import TestCase

from recipes.models.planning import Calendar
from recipes.models.recipe import Recipe


class CalendarModelConstructionTests(TestCase):
    def test_calendar_default_construction(self):
        """
        Makes sure calendar can potentially be empty...do we want this?
        """
        blank_calendar = Calendar()
        self.assertEqual(str(blank_calendar), u'Unnamed calendar')

    def test_calendar_with_nickname_only(self):
        title_string = 'This is a normal calendar'
        titled_calendar = Calendar(nickname=title_string)
        self.assertIs(str(titled_calendar), title_string)

    def test_calendar_with_long_nickname_only(self):
        title_string = 'This is a normal calendar; This is a normal calendar'
        titled_calendar = Calendar(nickname=title_string)
        self.assertEqual(str(titled_calendar), 'This is a normal calendar; This is a nor')


class CalendarModelMethodMonthlyDataTests(TestCase):
    pass


class CalendarModelMethodRecipesForDayTests(TestCase):

    def test_empty_calendar(self):
        c = Calendar()
        self.assertEqual([None, None], c.get_recipes_for_day_of_month('a'))  # might throw exception in the future
        self.assertEqual([None, None], c.get_recipes_for_day_of_month(-10))  # might throw exception in the future
        self.assertEqual([None, None], c.get_recipes_for_day_of_month(0))  # might throw exception in the future
        self.assertEqual([None, None], c.get_recipes_for_day_of_month(1))
        self.assertEqual([None, None], c.get_recipes_for_day_of_month(5))
        self.assertEqual([None, None], c.get_recipes_for_day_of_month(23))
        self.assertEqual([None, None], c.get_recipes_for_day_of_month(31))
        self.assertEqual([None, None], c.get_recipes_for_day_of_month(32))  # might throw exception in the future

    def test_filled_calendar(self):
        c = Calendar(nickname='CalendarMonth', year=2018, month=1)
        c.save()
        r1 = Recipe(title='Recipe')
        r2 = Recipe(title='Recipe2')
        r1.save()
        r2.save()
        c.day01recipe0 = r1
        c.day01recipe1 = r2
        c.day05recipe0 = r2
        c.day23recipe0 = r2
        c.day23recipe1 = r1
        c.day31recipe1 = r1
        c.save()
        self.assertEqual([None, None], c.get_recipes_for_day_of_month('a'))  # might throw exception in the future
        self.assertEqual([None, None], c.get_recipes_for_day_of_month(-10))  # might throw exception in the future
        self.assertEqual([None, None], c.get_recipes_for_day_of_month(0))  # might throw exception in the future
        self.assertEqual([r1, r2], c.get_recipes_for_day_of_month(1))
        self.assertEqual([r2, None], c.get_recipes_for_day_of_month(5))
        self.assertEqual([r2, r1], c.get_recipes_for_day_of_month(23))
        self.assertEqual([None, r1], c.get_recipes_for_day_of_month(31))
        self.assertEqual([None, None], c.get_recipes_for_day_of_month(32))  # might throw exception in the future
