# -*- coding: utf-8 -*-
import json

from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from recipes.models.recipe import Recipe


class TestRecipeAPIMethods(TestCase):
    def test_get_empty_directions(self):
        url_path = reverse('recipe-list')  # TODO: Why does recipes-list show up with list_url_names but not resolve
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = json.loads(response.content)
        self.assertIsInstance(body, list)
        self.assertEqual(len(body), 0)

    def test_get_populated_directions(self):
        Recipe.objects.create(title='Do things!')
        Recipe.objects.create(title='Do things again!')
        url_path = reverse('recipe-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = json.loads(response.content)
        self.assertIsInstance(body, list)
        self.assertEqual(len(body), 2)

    def test_get_detail_item_invalid(self):
        url_path = reverse('recipe-detail', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_detail_item_valid(self):
        title = u'Sweet Recipe Name!'
        Recipe.objects.create(title=title)
        url_path = reverse('recipe-detail', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = json.loads(response.content)
        self.assertEqual(body['id'], 1)
        self.assertEqual(body['title'], title)
