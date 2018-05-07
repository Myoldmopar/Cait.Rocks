# -*- coding: utf-8 -*-
import json

from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from recipes.models.planning import Calendar
from recipes.models.recipe import Recipe


class TestPlanningAPIMethods(TestCase):
    def test_no_calendar(self):
        pass

    def test_empty_calendar(self):
        Calendar.objects.create(year=2018, month=5)
        url_path = reverse('calendar-monthly-dates', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_calendar_with_one_day_filled(self):
        c = Calendar(year=2018, month=5)
        r = Recipe(title='temporary')
        r.save()
        c.day01recipe0 = r
        c.day01recipe1 = r
        c.save()
        url_path = reverse('calendar-monthly-dates', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_recipe_id_only_accepts_put(self):
        Calendar.objects.create(year=2018, month=5)
        url_path = reverse('calendar-recipe-id', args=[1])
        response = self.client.post(
            url_path,
            data=json.dumps({"date_num": 3, "daily_recipe_id": 1, "recipe_pk": 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_updating_recipe_id_valid(self):
        Calendar.objects.create(year=2018, month=5)
        Recipe.objects.create(title='Caits favorite')
        url_path = reverse('calendar-recipe-id', args=[1])
        response = self.client.put(
            url_path,
            data=json.dumps({"date_num": 3, "daily_recipe_id": 1, "recipe_pk": 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Check output

        # Test out of range dates
