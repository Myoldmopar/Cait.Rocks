# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from django.test import TestCase

from recipes.models.recipe import Recipe, RecipeTypes
from recipes.serializers.recipe import RecipeSerializer


class RecipeSerializerTests(TestCase):
    def test_recipe_url_method(self):
        recipe_attributes = {
            'title': 'Recipe TITLE',
            'recipe_type': RecipeTypes.SALAD
        }
        recipe_object = Recipe.objects.create(**recipe_attributes)
        recipe_serializer = RecipeSerializer(instance=recipe_object)
        url = recipe_serializer.get_absolute_url(recipe_object)
        self.assertEqual(u'/planner/recipe_views/1/', url)

    def test_recipe_creator_method_empty(self):
        recipe_attributes = {
            'title': 'Recipe TITLE',
            'recipe_type': RecipeTypes.SALAD
        }
        recipe_object = Recipe.objects.create(**recipe_attributes)
        recipe_serializer = RecipeSerializer(instance=recipe_object)
        creator = recipe_serializer.get_creator(recipe_object)
        self.assertEqual(creator, '')

    def test_recipe_creator_method_valid(self):
        u = User.objects.create_user(username='dummy', password='pass', first_name='A', last_name='B')
        recipe_attributes = {
            'title': 'Recipe TITLE',
            'recipe_type': RecipeTypes.SALAD,
            'creator': u
        }
        recipe_object = Recipe.objects.create(**recipe_attributes)
        recipe_serializer = RecipeSerializer(instance=recipe_object)
        creator = recipe_serializer.get_creator(recipe_object)
        self.assertEqual(creator, 'A B')

    def test_recipe_creator_method_not_in_db(self):
        u = User.objects.create_user(username='dummy', password='pass', first_name='A', last_name='B')
        recipe_attributes = {
            'title': 'Recipe TITLE',
            'recipe_type': RecipeTypes.SALAD,
            'creator': u
        }
        recipe_object = Recipe.objects.create(**recipe_attributes)
        recipe_serializer = RecipeSerializer(instance=recipe_object)
        u.delete()
        creator = recipe_serializer.get_creator(recipe_object)
        self.assertEqual(creator, '')
