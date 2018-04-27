# -*- coding: utf-8 -*-
from django.test import TestCase

from recipes.models.ingredient import Ingredient, AmountType, MeasurementType


class IngredientModelConstructionTests(TestCase):

    def test_ingredient_can_be_blank(self):
        """
        Makes sure ingredient can potentially be blank...do we want this?
        """
        blank_ingredient = Ingredient(item_description='')
        self.assertIs(str(blank_ingredient), '')

    def test_ingredient_default_construction(self):
        """
        Makes sure ingredient can potentially be blank...do we want this?
        """
        blank_ingredient = Ingredient()
        self.assertIs(str(blank_ingredient), '')

    def test_ingredient_normal_construction(self):
        ingredient_string = 'This is a normal ingredient'
        blank_ingredient = Ingredient(item_description=ingredient_string)
        self.assertIs(str(blank_ingredient), ingredient_string)


class IngredientFullStringFunctionTests(TestCase):

    def create_and_test_ingredient(self, expected_full_string, **kwargs):
        i = Ingredient(**kwargs)
        expected_amount = kwargs.get('amount', '')  # Should this actually expect AmountType.NONE ('0')?
        self.assertEqual(i.amount, expected_amount)
        expected_measurement = kwargs.get('measurement', '')  # Similar: MeasurementType.NONE ('0')?
        self.assertEqual(i.measurement, expected_measurement)
        expected_description = kwargs.get('item_description', '')
        self.assertEqual(i.item_description, expected_description)
        self.assertEqual(i.full_string(), expected_full_string)

    def test_full_string_combinations(self):
        """
        Tests a bunch of perturbations of ingredient member variables to exercise the full_string function
        """
        self.create_and_test_ingredient(
            ''
        )
        self.create_and_test_ingredient(
            '½ ', amount=AmountType.ONE_HALF
        )
        self.create_and_test_ingredient(
            '',
            measurement=MeasurementType.TEASPOON
        )
        self.create_and_test_ingredient(
            '',
            item_description='Foodstuff'
        )
        self.create_and_test_ingredient(
            '',
            amount=AmountType.ONE_HALF, measurement=MeasurementType.TEASPOON
        )
        self.create_and_test_ingredient(
            '',
            amount=AmountType.ONE_HALF, item_description='Foodstuff'
        )
        self.create_and_test_ingredient(
            '',
            measurement=MeasurementType.TEASPOON, item_description='Foodstuff'
        )
        self.create_and_test_ingredient(
            '',
            amount=AmountType.ONE_HALF, measurement=MeasurementType.TEASPOON, item_description='Foodstuff'
        )
