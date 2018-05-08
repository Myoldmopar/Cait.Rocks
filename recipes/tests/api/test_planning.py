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

    def test_updating_recipe_id_missing_args(self):
        url_path = reverse('calendar-recipe-id', args=[1])

        response = self.client.put(
            url_path,
            data=json.dumps({"date_num": 3}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.put(
            url_path,
            data=json.dumps({"daily_recipe_id": 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.put(
            url_path,
            data=json.dumps({"recipe_pk": 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.put(
            url_path,
            data=json.dumps({"date_num": 3, "daily_recipe_id": 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.put(
            url_path,
            data=json.dumps({"daily_recipe_id": 1, "recipe_pk": 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.put(
            url_path,
            data=json.dumps({"recipe_pk": 1, "daily_recipe_id": 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_updating_recipe_id_invalid_args(self):
        Calendar.objects.create(year=2018, month=5)
        Recipe.objects.create(title='Caits favorite')
        url_path = reverse('calendar-recipe-id', args=[1])

        response = self.client.put(
            url_path,
            data=json.dumps({"date_num": 'alpha', "daily_recipe_id": 1, "recipe_pk": 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Could not convert date_num', response.content)

        response = self.client.put(
            url_path,
            data=json.dumps({"date_num": 3, "daily_recipe_id": 'beta', "recipe_pk": 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Could not convert daily_recipe_id', response.content)

        # Numerically out of range recipe PK
        response = self.client.put(
            url_path,
            data=json.dumps({"date_num": 3, "daily_recipe_id": 1, "recipe_pk": 2}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Cannot find recipe with pk=2', response.content)

        response = self.client.put(
            url_path,
            data=json.dumps({"date_num": 3, "daily_recipe_id": 1, "recipe_pk": 'gamma'}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Could not convert recipe_pk', response.content)

    def test_updating_recipe_id_invalid_pk(self):
        Calendar.objects.create(year=2018, month=5)
        Recipe.objects.create(title='Caits favorite')
        url_path = reverse('calendar-recipe-id', args=[2])

        response = self.client.put(
            url_path,
            data=json.dumps({"date_num": 1, "daily_recipe_id": 1, "recipe_pk": 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Cannot find calendar with pk=2', response.content)

    def test_updating_recipe_id_out_of_range_date(self):
        Calendar.objects.create(year=2018, month=5)
        Recipe.objects.create(title='Caits favorite')
        url_path = reverse('calendar-recipe-id', args=[1])

        response = self.client.put(
            url_path,
            data=json.dumps({"date_num": 32, "daily_recipe_id": 1, "recipe_pk": 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Cannot locate field day32recipe1', response.content)