# -*- coding: utf-8 -*-
from django.test import TestCase

from recipes.models.recipe import Recipe, RecipeTypes


class RecipeModelConstructionTests(TestCase):
    def test_recipe_default_construction(self):
        """
        Makes sure recipe can potentially be empty...do we want this?
        """
        blank_recipe = Recipe()
        self.assertIs(str(blank_recipe), '')

    def test_ingredient_with_title_only(self):
        title_string = 'This is a normal recipe'
        titled_recipe = Recipe(title=title_string)
        self.assertIs(str(titled_recipe), title_string)
        self.assertEqual(titled_recipe.recipe_type, "Unknown")

    def test_ingredient_with_type_only(self):
        titled_recipe = Recipe(recipe_type=RecipeTypes.DESSERT)
        self.assertIs(str(titled_recipe), '')
        self.assertEqual(titled_recipe.recipe_type, RecipeTypes.DESSERT)

    def test_ingredient_fully_constructed(self):
        title_string = 'This is a normal recipe'
        titled_recipe = Recipe(title=title_string, recipe_type=RecipeTypes.DRINK)
        self.assertIs(str(titled_recipe), title_string)
        self.assertEqual(titled_recipe.recipe_type, RecipeTypes.DRINK)
