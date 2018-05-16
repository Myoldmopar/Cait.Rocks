# -*- coding: utf-8 -*-

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status


class TestUserAPIMethods(TestCase):
    def test_get_current_user_logged_in(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.login(username='testuser', password='12345')
        url_path = reverse('planner:api:users-current-user-id')
        self.assertEqual('/planner/api/users/current_user_id/', url_path)
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = response.json()
        self.assertEqual(1, body['id'])

    def test_get_current_user_logged_out(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        url_path = reverse('planner:api:users-current-user-id')
        self.assertEqual('/planner/api/users/current_user_id/', url_path)
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = response.json()
        self.assertIsNone(body['id'])
