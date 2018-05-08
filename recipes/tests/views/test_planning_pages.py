# -*- coding: utf-8 -*-
from django.test import TestCase
from django.urls import reverse
from recipes.models.planning import Calendar


class TestMonthView(TestCase):
    def test_url_path(self):
        """
        Test the path directly
        """
        response = self.client.get('/planner/months/')
        self.assertEqual(response.status_code, 200)

    def test_reversed_path(self):
        """
        Rely on the url reversing
        """
        url_path = reverse('planner:months-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, 200)

    def test_url_path_detail(self):
        """
        Test the path directly
        """
        Calendar.objects.create(nickname='hey', year=2010, month=3)
        response = self.client.get('/planner/months/1/')
        self.assertEqual(response.status_code, 200)

    def test_reversed_path_detail(self):
        """
        Rely on the url reversing
        """
        Calendar.objects.create(nickname='hey', year=2010, month=3)
        url_path = reverse('planner:months-detail', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, 200)


class TestPlannerView(TestCase):
    def test_url_path(self):
        """
        Test the path directly
        """
        response = self.client.get('/planner/')
        self.assertEqual(response.status_code, 200)

    def test_reversed_path(self):
        """
        Rely on the url reversing
        """
        url_path = reverse('planner:planner-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, 200)
