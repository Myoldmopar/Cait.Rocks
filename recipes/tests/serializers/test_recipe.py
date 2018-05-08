# -*- coding: utf-8 -*-
from django.test import TestCase

from recipes.models.recipe import Recipe, RecipeTypes
from recipes.serializers.recipe import RecipeSerializer


class RecipeSerializerTests(TestCase):
    def test_recipe_url_method(self):
        recipe_attributes = {
            'title': 'Recipe TITLE',
            'recipe_type': RecipeTypes.SALAD
        }
        #
        # self.serializer_data = {
        #     'color': 'black',
        #     'size': 51.23
        # }

        recipe_object = Recipe.objects.create(**recipe_attributes)
        recipe_serializer = RecipeSerializer(instance=recipe_object)
        url = recipe_serializer.get_absolute_url(recipe_object)
        self.assertEqual(u'/cookbook/recipes/1/', url)
