# -*- coding: utf-8 -*-
from django.test import TestCase
from django.urls import reverse


class TestMonthlyPlanView(TestCase):
    def test_url_path(self):
        """
        Test the path directly
        """
        response = self.client.get('/cookbook/monthly_plan/')
        self.assertEqual(response.status_code, 200)

    def test_reversed_path(self):
        """
        Rely on the url reversing
        """
        url_path = reverse('cookbook:monthly_plan-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, 200)


class TestCalendarView(TestCase):
    def test_url_path(self):
        """
        Test the path directly
        """
        response = self.client.get('/cookbook/monthly_plan/monthly_plan/')
        self.assertEqual(response.status_code, 200)

    def test_reversed_path(self):
        """
        Rely on the url reversing
        """
        url_path = reverse('cookbook:monthly_plan-monthly-plan')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, 200)


class TestGroceryListView(TestCase):
    def test_url_path(self):
        """
        Test the path directly
        """
        response = self.client.get('/cookbook/monthly_plan/grocery_list/')
        self.assertEqual(response.status_code, 200)

    def test_reversed_path(self):
        """
        Rely on the url reversing
        """
        url_path = reverse('cookbook:monthly_plan-grocery-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, 200)
