# -*- coding: utf-8 -*-
from django.test import TestCase
import six

from recipes.models.ingredient import Ingredient, AmountType, MeasurementType


class IngredientModelConstructionTests(TestCase):
    def test_ingredient_can_be_blank(self):
        """
        Makes sure ingredient can potentially be blank...do we want this?
        """
        blank_ingredient = Ingredient(item_description='')
        if six.PY2:
            self.assertEqual(unicode(blank_ingredient), u'')  # noqa: F821  (unicode not defined in Py3)
        elif six.PY3:
            self.assertEqual(str(blank_ingredient), u'')

    def test_ingredient_default_construction(self):
        """
        Makes sure ingredient can potentially be blank...do we want this?
        """
        blank_ingredient = Ingredient()
        if six.PY2:
            self.assertEqual(unicode(blank_ingredient), u'')  # noqa: F821  (unicode not defined in Py3)
        elif six.PY3:
            self.assertEqual(str(blank_ingredient), u'')

    def test_ingredient_normal_construction(self):
        ingredient_string = u'This is a normal ingredient'
        proper_ingredient = Ingredient(item_description=ingredient_string)
        if six.PY2:
            self.assertEqual(unicode(proper_ingredient), ingredient_string)  # noqa: F821  (unicode not defined in Py3)
        elif six.PY3:
            self.assertEqual(str(proper_ingredient), ingredient_string)


class TestIngredientStringTests(TestCase):
    def test_unicode_character_version(self):
        i = Ingredient(
            amount=AmountType.ONE_HALF, measurement=MeasurementType.TEASPOON, item_description='Foodstuff'
        )
        if six.PY2:
            with self.assertRaises(Exception):
                str(i)
        elif six.PY3:
            self.assertEqual(str(i), u"u'½ tsp Foodstuff")

    def test_ascii_compliant_version(self):
        i = Ingredient(
            amount=AmountType.ONE, measurement=MeasurementType.TEASPOON, item_description='Foodstuff'
        )
        self.assertEqual(str(i), "1 tsp Foodstuff")


class IngredientFullStringFunctionTests(TestCase):
    def create_and_test_ingredient(self, expected_full_string, **kwargs):
        i = Ingredient(**kwargs)
        expected_amount = kwargs.get('amount', '')  # Should this actually expect AmountType.NONE ('0')?
        self.assertEqual(i.amount, expected_amount)
        expected_measurement = kwargs.get('measurement', '')  # Similar: MeasurementType.NONE ('0')?
        self.assertEqual(i.measurement, expected_measurement)
        expected_description = kwargs.get('item_description', '')
        self.assertEqual(i.item_description, expected_description)
        if six.PY2:
            self.assertEqual(unicode(i), expected_full_string)  # noqa: F821  (unicode not defined in Py3)
        elif six.PY3:
            self.assertEqual(str(i), expected_full_string)

    def test_full_string_combinations(self):
        """
        Tests a bunch of perturbations of ingredient member variables to exercise the full_string function
        """
        self.create_and_test_ingredient(
            u''
        )
        self.create_and_test_ingredient(
            u'½ ', amount=AmountType.ONE_HALF
        )
        self.create_and_test_ingredient(
            u'tsp ',
            measurement=MeasurementType.TEASPOON
        )
        self.create_and_test_ingredient(
            u'Foodstuff',
            item_description='Foodstuff'
        )
        self.create_and_test_ingredient(
            u'½ tsp ',
            amount=AmountType.ONE_HALF, measurement=MeasurementType.TEASPOON
        )
        self.create_and_test_ingredient(
            u'½ Foodstuff',
            amount=AmountType.ONE_HALF, item_description='Foodstuff'
        )
        self.create_and_test_ingredient(
            u'tsp Foodstuff',
            measurement=MeasurementType.TEASPOON, item_description='Foodstuff'
        )
        self.create_and_test_ingredient(
            u'½ tsp Foodstuff',
            amount=AmountType.ONE_HALF, measurement=MeasurementType.TEASPOON, item_description='Foodstuff'
        )
