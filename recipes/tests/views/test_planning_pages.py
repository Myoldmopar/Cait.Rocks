# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from recipes.models.planning import Calendar


class TestMonthView(TestCase):
    def test_url_path(self):
        """
        Test the path directly
        """
        response = self.client.get('/planner/months/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_reversed_path(self):
        """
        Rely on the url reversing
        """
        url_path = reverse('planner:months-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_url_path_detail(self):
        """
        Test the path directly
        """
        Calendar.objects.create(nickname='hey', year=2010, month=3)
        response = self.client.get('/planner/months/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_reversed_path_detail(self):
        """
        Rely on the url reversing
        """
        Calendar.objects.create(nickname='hey', year=2010, month=3)
        url_path = reverse('planner:months-detail', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestPlannerView(TestCase):
    def log_in_user(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.login(username='testuser', password='12345')

    def test_url_path_logged_in(self):
        """
        Test the path directly
        """
        self.log_in_user()
        response = self.client.get('/planner/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_reversed_path_logged_in(self):
        """
        Rely on the url reversing
        """
        self.log_in_user()
        url_path = reverse('planner:planner-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_url_path_logged_out(self):
        """
        Test the path directly
        """
        response = self.client.get('/planner/')
        self.assertEqual(response.status_code, status.HTTP_302_FOUND)
        self.assertEqual(response.url, u'/accounts/login/?next=/planner/')

    def test_reversed_path_logged_out(self):
        """
        Rely on the url reversing
        """
        url_path = reverse('planner:planner-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_302_FOUND)
        self.assertEqual(response.url, u'/accounts/login/?next=/planner/')
