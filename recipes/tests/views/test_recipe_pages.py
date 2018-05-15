# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
from django.test import TestCase
from django.urls import reverse

from recipes.models.recipe import Recipe


class TestRecipeListView(TestCase):
    def test_url_path(self):
        """
        Test the path directly
        """
        response = self.client.get('/planner/recipe_views/')
        self.assertEqual(response.status_code, 200)

    def test_reversed_path(self):
        """
        Rely on the url reversing
        """
        url_path = reverse('planner:recipe_views-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, 200)

    def test_html_response(self):
        response = self.client.get('/planner/recipe_views/')
        html_response_content = response.content
        soup = BeautifulSoup(html_response_content, 'html.parser')
        recipe_tables = soup.find_all(id='recipeListTable')
        self.assertEqual(1, len(recipe_tables))


class TestRecipeDetailView(TestCase):
    def setUp(self):
        r = Recipe()
        r.save()

    def test_url_path(self):
        """
        Test the path directly
        """
        response = self.client.get('/planner/recipe_views/1/')
        self.assertEqual(response.status_code, 200)

    def test_reversed_path(self):
        """
        Rely on the url reversing
        """
        url_path = reverse('planner:recipe_views-detail', args='1')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, 200)

    def test_html_response(self):
        response = self.client.get('/planner/recipe_views/1/')
        html_response_content = response.content
        soup = BeautifulSoup(html_response_content, 'html.parser')
        ingredient_lists = soup.find_all(id='ingredientList')
        self.assertEqual(1, len(ingredient_lists))
