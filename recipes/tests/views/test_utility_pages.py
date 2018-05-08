# -*- coding: utf-8 -*-
from django.test import TestCase


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
