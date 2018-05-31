# -*- coding: utf-8 -*-
from django.db.utils import IntegrityError
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


class RecipeTitleUniquenessTests(TestCase):
    @staticmethod
    def _add_recipe(title):
        Recipe(title=title).save()

    def test_two_unique_recipes_are_ok(self):
        self._add_recipe('My Recipe 1')
        self._add_recipe('My Recipe 2')
        # no assertions needed, it should just work

    def test_duplicate_recipe_titles_fails(self):
        self._add_recipe('Hey')
        r2 = Recipe(title='Hey')
        with self.assertRaises(IntegrityError):
            r2.save()
