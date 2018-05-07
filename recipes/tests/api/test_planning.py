# -*- coding: utf-8 -*-
from django.test import TestCase
from django.urls import reverse

import json

from recipes.models.planning import Calendar
from recipes.models.recipe import Recipe


class TestPlanningAPIMethods(TestCase):

    def test_no_calendar(self):
        pass

    def test_empty_calendar(self):
        Calendar.objects.create(year=2018, month=5)
        url_path = reverse('calendar-monthly-dates', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, 200)

    def test_updating_recipe_id_valid(self):
        Calendar.objects.create(year=2018, month=5)
        Recipe.objects.create(title='Caits favorite')
        url_path = reverse('calendar-recipe-id', args=[1])
        response = self.client.put(
            url_path,
            data=json.dumps({"date_num": 3, "daily_recipe_id": 1, "recipe_pk": 1}),
            content_type='application/json'
        )  # Test that GET fails
        self.assertEqual(response.status_code, 200)
        # Check output

    # Test out of range dates
