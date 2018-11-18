# -*- coding: utf-8 -*-
import json

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from recipes.models.enums import AmountType, MeasurementType
from recipes.models.ingredient import Ingredient
from recipes.models.recipe import Recipe, RecipeTypes


class TestRecipeAPIMethods(TestCase):
    def test_get_empty_recipes(self):
        url_path = reverse('planner:api:recipe-list')
        self.assertEqual('/planner/api/recipes/', url_path)
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = response.json()
        self.assertIsInstance(body, list)
        self.assertEqual(len(body), 0)

    def test_get_populated_recipes(self):
        Recipe.objects.create(title='Do things!')
        Recipe.objects.create(title='Do things again!')
        url_path = reverse('planner:api:recipe-list')
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = response.json()
        self.assertIsInstance(body, list)
        self.assertEqual(len(body), 2)

    def test_get_detail_item_invalid(self):
        url_path = reverse('planner:api:recipe-detail', args=[1])
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_detail_item_valid(self):
        title = u'Sweet Recipe Name!'
        Recipe.objects.create(title=title)
        url_path = reverse('planner:api:recipe-detail', args=[1])
        self.assertEqual('/planner/api/recipes/1/', url_path)
        response = self.client.get(url_path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = response.json()
        self.assertEqual(body['id'], 1)
        self.assertEqual(body['title'], title)

    def test_post_fails_if_not_logged_in(self):
        url_path = reverse('planner:api:recipe-list')
        response = self.client.post(url_path, data=json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_succeeds_with_title_only_recipe(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.login(username='testuser', password='12345')
        url_path = reverse('planner:api:recipe-list')
        response = self.client.post(url_path, data=json.dumps({'title': 'Only Title'}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Recipe.objects.get(pk=1).title, 'Only Title')

    def test_put_fails(self):
        url_path = reverse('planner:api:recipe-detail', args=[1])
        response = self.client.put(url_path, data=json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_patch_fails(self):
        url_path = reverse('planner:api:recipe-detail', args=[1])
        response = self.client.patch(url_path, data=json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_delete_fails(self):
        url_path = reverse('planner:api:recipe-detail', args=[1])
        response = self.client.delete(url_path)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_poor_recipes_empty(self):
        User.objects.create_user(username='dummy', password='pass', first_name='A', last_name='B')
        self.client.login(username='dummy', password='pass')
        url_path = reverse('planner:api:recipe-poor-recipes')
        response = self.client.get(url_path)
        body = response.json()
        self.assertIn('poor_recipes', body)
        self.assertEqual(0, len(body['poor_recipes']))

    def test_poor_recipes_some(self):
        u = User.objects.create_user(username='dummy', password='pass', first_name='A', last_name='B')
        self.client.login(username='dummy', password='pass')
        r_1 = Recipe.objects.create(
            title='Recipe TITLE',
            recipe_type=RecipeTypes.SALAD,
            creator=u
        )
        r_2 = Recipe.objects.create(
            title='Recipe TITLE 2',
            recipe_type=RecipeTypes.SALAD,
            creator=u,
        )
        Ingredient.objects.create(
            amount=AmountType.ONE_HALF, measurement=MeasurementType.TEASPOON, item_description='Foodstuff', recipe=r_1
        )
        url_path = reverse('planner:api:recipe-poor-recipes')
        response = self.client.get(url_path)
        body = response.json()
        self.assertIn('poor_recipes', body)
        self.assertEqual(1, len(body['poor_recipes']))
        self.assertEqual(r_2.title, body['poor_recipes'][0])  # should just have r_2 in it

    def test_poor_recipes_none(self):
        u = User.objects.create_user(username='dummy', password='pass', first_name='A', last_name='B')
        self.client.login(username='dummy', password='pass')
        r_1 = Recipe.objects.create(
            title='Recipe TITLE',
            recipe_type=RecipeTypes.SALAD,
            creator=u
        )
        r_2 = Recipe.objects.create(
            title='Recipe TITLE 2',
            recipe_type=RecipeTypes.SALAD,
            creator=u,

        )
        Ingredient.objects.create(
            amount=AmountType.ONE_HALF, measurement=MeasurementType.TEASPOON, item_description='Foodstuff', recipe=r_1
        )
        Ingredient.objects.create(
            amount=AmountType.ONE_HALF, measurement=MeasurementType.TABLESPOON, item_description='Foodstuff', recipe=r_2
        )
        url_path = reverse('planner:api:recipe-poor-recipes')
        response = self.client.get(url_path)
        body = response.json()
        self.assertIn('poor_recipes', body)
        self.assertEqual(0, len(body['poor_recipes']))

    def test_poor_recipes_all(self):
        u = User.objects.create_user(username='dummy', password='pass', first_name='A', last_name='B')
        self.client.login(username='dummy', password='pass')
        r_1 = Recipe.objects.create(
            title='Recipe TITLE',
            recipe_type=RecipeTypes.SALAD,
            creator=u
        )
        r_2 = Recipe.objects.create(
            title='Recipe TITLE 2',
            recipe_type=RecipeTypes.SALAD,
            creator=u,
        )
        Ingredient.objects.create(
            item_description='Foodstuff 1', recipe=r_1
        )
        Ingredient.objects.create(
            item_description='Foodstuff 2', recipe=r_2
        )
        url_path = reverse('planner:api:recipe-poor-recipes')
        response = self.client.get(url_path)
        body = response.json()
        self.assertIn('poor_recipes', body)
        self.assertEqual(0, len(body['poor_recipes']))

    def test_poor_recipes_only_from_current_user(self):
        u_1 = User.objects.create_user(username='dummy', password='pass', first_name='A', last_name='B')
        u_2 = User.objects.create_user(username='dummy2', password='pass2', first_name='A', last_name='B')
        self.client.login(username='dummy', password='pass')
        r_1 = Recipe.objects.create(
            title='Recipe TITLE',
            recipe_type=RecipeTypes.SALAD,
            creator=u_1
        )
        Recipe.objects.create(
            title='Recipe TITLE 2',
            recipe_type=RecipeTypes.SALAD,
            creator=u_2,
        )
        url_path = reverse('planner:api:recipe-poor-recipes')
        response = self.client.get(url_path)
        body = response.json()
        self.assertIn('poor_recipes', body)
        self.assertEqual(1, len(body['poor_recipes']))
        self.assertEqual(r_1.title, body['poor_recipes'][0])  # should just have u_1's recipe in it
