# -*- coding: utf-8 -*-
import json

from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from recipes.models.direction import Direction


class TestDirectionAPIMethods(TestCase):
    def test_get_empty_directions(self):
        url_path = reverse('api:direction-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = json.loads(response.content)
        self.assertIsInstance(body, list)
        self.assertEqual(len(body), 0)

    def test_get_populated_directions(self):
        Direction.objects.create(full_directions='Do things!')
        Direction.objects.create(full_directions='Do things again!')
        url_path = reverse('api:direction-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = json.loads(response.content)
        self.assertIsInstance(body, list)
        self.assertEqual(len(body), 2)

    def test_get_detail_item_invalid(self):
        url_path = reverse('api:direction-detail', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_detail_item_valid(self):
        directions = u'Do more things!'
        Direction.objects.create(full_directions=directions)
        url_path = reverse('api:direction-detail', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = json.loads(response.content)
        self.assertEqual(body['id'], 1)
        self.assertEqual(body['full_directions'], directions)

    def test_post_fails(self):
        url_path = reverse('api:direction-list')
        response = self.client.post(url_path, data=json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_put_fails(self):
        url_path = reverse('api:direction-detail', args=[1])
        response = self.client.put(url_path, data=json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_patch_fails(self):
        url_path = reverse('api:direction-detail', args=[1])
        response = self.client.patch(url_path, data=json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_delete_fails(self):
        url_path = reverse('api:direction-detail', args=[1])
        response = self.client.delete(url_path)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
