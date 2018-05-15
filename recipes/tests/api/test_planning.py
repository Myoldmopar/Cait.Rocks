# -*- coding: utf-8 -*-
import json

from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from recipes.models.planning import Calendar
from recipes.models.recipe import Recipe


class TestPlanningAPIMethods(TestCase):
    def test_get_empty_calendars(self):
        url_path = reverse('planner:api:calendar-list')
        self.assertEqual('/planner/api/calendars/', url_path)
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = response.json()
        self.assertIsInstance(body, list)
        self.assertEqual(len(body), 0)

    def test_get_populated_calendars(self):
        Calendar.objects.create(nickname='Hey', year=2018, month=4)
        Calendar.objects.create(nickname='Again', year=2018, month=4)
        url_path = reverse('planner:api:calendar-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = response.json()
        self.assertIsInstance(body, list)
        self.assertEqual(len(body), 2)

    def test_get_detail_item_invalid(self):
        url_path = reverse('planner:api:calendar-detail', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_detail_item_valid(self):
        description = u'Still more stuff?!?!'
        Calendar.objects.create(nickname=description, year=2018, month=4)
        url_path = reverse('planner:api:calendar-detail', args=[1])
        self.assertEqual('/planner/api/calendars/1/', url_path)
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = response.json()
        self.assertEqual(body['id'], 1)
        self.assertEqual(body['nickname'], description)

    def test_post_fails(self):
        url_path = reverse('planner:api:calendar-list')
        response = self.client.post(url_path, data=json.dumps({'nickname': 'new_name', 'year': 2018, 'month': 4}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        data = response.json()
        self.assertEqual(data['nickname'], 'new_name')
        self.assertEqual(data['year'], 2018)
        self.assertEqual(data['month'], 4)

    def test_put_fails(self):
        url_path = reverse('planner:api:calendar-detail', args=[1])
        response = self.client.put(url_path, data=json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_patch_fails(self):
        url_path = reverse('planner:api:calendar-detail', args=[1])
        response = self.client.patch(url_path, data=json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_delete_succeeds(self):
        c = Calendar.objects.create(nickname='ToBeDeleted', year=2019, month=1)
        url_path = reverse('planner:api:calendar-detail', args=[c.pk])
        response = self.client.delete(url_path)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class TestPlanningAPIMonthlyDatesView(TestCase):

    def test_no_calendar(self):
        url_path = reverse('planner:api:calendar-monthly-data', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_empty_calendar(self):
        Calendar.objects.create(year=2018, month=5)
        url_path = reverse('planner:api:calendar-monthly-data', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_calendar_with_one_day_filled(self):
        c = Calendar(year=2018, month=5)
        r = Recipe(title='temporary')
        r.save()
        c.day01recipe0 = r
        c.day01recipe1 = r
        c.save()
        url_path = reverse('planner:api:calendar-monthly-data', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestPlanningAPIRecipeIDView(TestCase):

    def test_recipe_id_fails_for_logged_out(self):
        Calendar.objects.create(year=2018, month=5)
        url_path = reverse('planner:api:calendar-recipe-id', args=[1])
        response = self.client.post(
            url_path,
            data=json.dumps({'date_num': 3, 'daily_recipe_id': 1, 'recipe_pk': 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_recipe_id_only_accepts_put(self):
        Calendar.objects.create(year=2018, month=5)
        url_path = reverse('planner:api:calendar-recipe-id', args=[1])
        response = self.client.post(
            url_path,
            data=json.dumps({'date_num': 3, 'daily_recipe_id': 1, 'recipe_pk': 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_updating_recipe_id_valid(self):
        c = Calendar.objects.create(year=2018, month=5)
        r = Recipe.objects.create(title='Caits favorite')
        url_path = reverse('planner:api:calendar-recipe-id', args=[1])

        response = self.client.put(
            url_path,
            data=json.dumps({'date_num': 3, 'daily_recipe_id': 1, 'recipe_pk': 1}),
            content_type='application/json'
        )
        c.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(c.day03recipe1.id, r.id)

    def test_updating_recipe_id_missing_args(self):
        url_path = reverse('planner:api:calendar-recipe-id', args=[1])

        response = self.client.put(
            url_path,
            data=json.dumps({'date_num': 3}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.put(
            url_path,
            data=json.dumps({'daily_recipe_id': 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.put(
            url_path,
            data=json.dumps({'recipe_pk': 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.put(
            url_path,
            data=json.dumps({'date_num': 3, 'daily_recipe_id': 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.put(
            url_path,
            data=json.dumps({'daily_recipe_id': 1, 'recipe_pk': 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.put(
            url_path,
            data=json.dumps({'recipe_pk': 1, 'daily_recipe_id': 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_updating_recipe_id_invalid_args(self):
        Calendar.objects.create(year=2018, month=5)
        Recipe.objects.create(title='Caits favorite')
        url_path = reverse('planner:api:calendar-recipe-id', args=[1])

        response = self.client.put(
            url_path,
            data=json.dumps({'date_num': 'alpha', 'daily_recipe_id': 1, 'recipe_pk': 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(b'Could not convert date_num', response.content)

        response = self.client.put(
            url_path,
            data=json.dumps({'date_num': 3, 'daily_recipe_id': 'beta', 'recipe_pk': 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(b'Could not convert daily_recipe_id', response.content)

        # Numerically out of range recipe PK
        response = self.client.put(
            url_path,
            data=json.dumps({'date_num': 3, 'daily_recipe_id': 1, 'recipe_pk': 2}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn(b'Cannot find recipe with pk=2', response.content)

        response = self.client.put(
            url_path,
            data=json.dumps({'date_num': 3, 'daily_recipe_id': 1, 'recipe_pk': 'gamma'}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(b'Could not convert recipe_pk', response.content)

    def test_updating_recipe_id_invalid_pk(self):
        Calendar.objects.create(year=2018, month=5)
        Recipe.objects.create(title='Caits favorite')
        url_path = reverse('planner:api:calendar-recipe-id', args=[2])

        response = self.client.put(
            url_path,
            data=json.dumps({'date_num': 1, 'daily_recipe_id': 1, 'recipe_pk': 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn(b'Cannot find calendar with pk=2', response.content)

    def test_updating_recipe_id_out_of_range_date(self):
        Calendar.objects.create(year=2018, month=5)
        Recipe.objects.create(title='Caits favorite')
        url_path = reverse('planner:api:calendar-recipe-id', args=[1])

        response = self.client.put(
            url_path,
            data=json.dumps({'date_num': 32, 'daily_recipe_id': 1, 'recipe_pk': 1}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(b'Cannot locate field day32recipe1', response.content)

    def test_clearing_recipe_id(self):
        c = Calendar.objects.create(year=2018, month=5, nickname='My Calendar')
        r = Recipe.objects.create(title='Caits favorite')
        c.day01recipe1 = r
        c.save()
        url_path = reverse('planner:api:calendar-recipe-id', args=[c.pk])
        response = self.client.put(
            url_path,
            data=json.dumps({'date_num': 1, 'daily_recipe_id': 1, 'recipe_pk': 0}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        c.refresh_from_db()
        self.assertIsNone(c.day01recipe1)
