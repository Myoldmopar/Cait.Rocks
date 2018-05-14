# -*- coding: utf-8 -*-
import json

from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from recipes.models.ingredient import Ingredient


class TestIngredientAPIMethods(TestCase):
    def test_get_empty_ingredients(self):
        url_path = reverse('planner:api:ingredient-list')
        self.assertEqual('/planner/api/ingredients/', url_path)
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = response.json()
        self.assertIsInstance(body, list)
        self.assertEqual(len(body), 0)

    def test_get_populated_ingredients(self):
        Ingredient.objects.create(item_description='Some Stuff!')
        Ingredient.objects.create(item_description='Other stuff!!')
        url_path = reverse('planner:api:ingredient-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = response.json()
        self.assertIsInstance(body, list)
        self.assertEqual(len(body), 2)

    def test_get_detail_item_invalid(self):
        url_path = reverse('planner:api:ingredient-detail', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_detail_item_valid(self):
        description = u'Still more stuff?!?!'
        Ingredient.objects.create(item_description=description)
        url_path = reverse('planner:api:ingredient-detail', args=[1])
        self.assertEqual('/planner/api/ingredients/1/', url_path)
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = response.json()
        self.assertEqual(body['id'], 1)
        self.assertEqual(body['item_description'], description)

    def test_post_fails(self):
        url_path = reverse('planner:api:ingredient-list')
        response = self.client.post(url_path, data=json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_put_fails(self):
        url_path = reverse('planner:api:ingredient-detail', args=[1])
        response = self.client.put(url_path, data=json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_patch_fails(self):
        url_path = reverse('planner:api:ingredient-detail', args=[1])
        response = self.client.patch(url_path, data=json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_delete_fails(self):
        url_path = reverse('planner:api:ingredient-detail', args=[1])
        response = self.client.delete(url_path)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
