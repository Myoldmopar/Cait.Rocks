# -*- coding: utf-8 -*-
import json

from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from recipes.models.ingredient import Ingredient


class TestIngredientAPIMethods(TestCase):
    def test_get_empty_directions(self):
        url_path = reverse('ingredient-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = json.loads(response.content)
        self.assertIsInstance(body, list)
        self.assertEqual(len(body), 0)

    def test_get_populated_directions(self):
        Ingredient.objects.create(item_description='Some Stuff!')
        Ingredient.objects.create(item_description='Other stuff!!')
        url_path = reverse('ingredient-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = json.loads(response.content)
        self.assertIsInstance(body, list)
        self.assertEqual(len(body), 2)

    def test_get_detail_item_invalid(self):
        url_path = reverse('ingredient-detail', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_detail_item_valid(self):
        description = u'Still more stuff?!?!'
        Ingredient.objects.create(item_description=description)
        url_path = reverse('ingredient-detail', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = json.loads(response.content)
        self.assertEqual(body['id'], 1)
        self.assertEqual(body['item_description'], description)