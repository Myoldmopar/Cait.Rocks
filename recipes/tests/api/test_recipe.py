# -*- coding: utf-8 -*-
import json

from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from recipes.models.recipe import Recipe


class TestRecipeAPIMethods(TestCase):
    def test_get_empty_recipes(self):
        url_path = reverse('planner:api:recipe-list')
        self.assertEqual('/planner/api/recipes/', url_path)
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = json.loads(response.content)
        self.assertIsInstance(body, list)
        self.assertEqual(len(body), 0)

    def test_get_populated_recipes(self):
        Recipe.objects.create(title='Do things!')
        Recipe.objects.create(title='Do things again!')
        url_path = reverse('planner:api:recipe-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = json.loads(response.content)
        self.assertIsInstance(body, list)
        self.assertEqual(len(body), 2)

    def test_get_detail_item_invalid(self):
        url_path = reverse('planner:api:recipe-detail', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_detail_item_valid(self):
        title = u'Sweet Recipe Name!'
        Recipe.objects.create(title=title)
        url_path = reverse('planner:api:recipe-detail', args=[1])
        self.assertEqual('/planner/api/recipes/1/', url_path)
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = json.loads(response.content)
        self.assertEqual(body['id'], 1)
        self.assertEqual(body['title'], title)

    def test_post_fails(self):
        url_path = reverse('planner:api:recipe-list')
        response = self.client.post(url_path, data=json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_put_fails(self):
        url_path = reverse('planner:api:recipe-detail', args=[1])
        response = self.client.put(url_path, data=json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_patch_fails(self):
        url_path = reverse('planner:api:recipe-detail', args=[1])
        response = self.client.patch(url_path, data=json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_delete_fails(self):
        url_path = reverse('planner:api:recipe-detail', args=[1])
        response = self.client.delete(url_path)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
