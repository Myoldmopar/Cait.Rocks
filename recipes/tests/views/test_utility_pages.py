# -*- coding: utf-8 -*-
from django.test import TestCase
from django.urls import reverse
from rest_framework import status


class Test404Handler(TestCase):
    def test_404_handler(self):
        """
        Test the 404 handler directly
        """
        # somehow need to call the view function directly from here, make sure it returns a response
        pass

    def test_404_handler_indirectly(self):
        """
        Rely on the url routing to return a 404 for a bad endpoint
        :return:
        """
        response = self.client.get('/gibson/lee')
        self.assertEqual(response.status_code, 404)


class TestHome(TestCase):
    def test_url_path(self):
        """
        Test the path directly
        """
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_reversed_path(self):
        """
        Rely on the url reversing
        """
        url_path = reverse('home')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestAbout(TestCase):
    def test_url_path(self):
        """
        Test the path directly
        """
        response = self.client.get('/about/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn(b'Git SHA:', response.content)

    def test_reversed_path(self):
        """
        Rely on the url reversing
        """
        url_path = reverse('about')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
