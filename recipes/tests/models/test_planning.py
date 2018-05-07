# -*- coding: utf-8 -*-
from django.test import TestCase

from recipes.models.planning import Calendar


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
