from django.test import TestCase

from recipes.models.ingredient import Ingredient


class IngredientModelConstructionTests(TestCase):

    def test_ingredient_can_be_blank(self):
        """
        Makes sure ingredient can potentially be blank...do we want this?
        """
        blank_ingredient = Ingredient(raw_string='')
        self.assertIs(str(blank_ingredient), '')

    def test_ingredient_default_construction(self):
        """
        Makes sure ingredient can potentially be blank...do we want this?
        """
        blank_ingredient = Ingredient()
        self.assertIs(str(blank_ingredient), '')

    def test_ingredient_normal_construction(self):
        """
        Makes sure ingredient can potentially be blank...do we want this?
        """
        ingredient_string = 'This is a normal ingredient'
        blank_ingredient = Ingredient(raw_string=ingredient_string)
        self.assertIs(str(blank_ingredient), ingredient_string)
