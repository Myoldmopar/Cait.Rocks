# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from recipes.models.recipe import Recipe


class AmountType(object):
    """
    This class is an enum list of string variables used for convenience when referencing amount choices
    """
    NONE = '0'
    ONE_EIGHTH = '10'
    ONE_QUARTER = '30'
    ONE_THIRD = '40'
    ONE_HALF = '50'
    TWO_THIRDS = '55'
    THREE_QUARTER = '57'
    ONE = '60'
    ONE_ONE_HALF = '65'
    TWO = '70'
    THREE = '80'
    FOUR = '90'
    FIVE = '100'
    SIX = '110'
    SEVEN = '120'
    EIGHT = '130'
    NINE = '140'
    TEN = '150'
    FIFTEEN = '160'
    TWENTY = '170'


class MeasurementType(object):
    """
    This class is an enum list of string variables used for convenience when referencing measurement choices
    """
    NONE = '0'
    PINCH = '5'
    TEASPOON = '10'
    TABLESPOON = '20'
    CUP = '30'
    PINT = '40'
    QUART = '50'
    LITER = '60'
    GALLON = '70'
    OUNCE = '100'
    POUND = '110'


class Ingredient(models.Model):
    """
    This class describes a single ingredient, including amount, measurement, and item description.
    The class includes model fields to describe the ingredient, plus one ForeignKey to a Recipe model instance.
    The only methods that are added to this model class are the __unicode__ and __str__ methods for representation.
    """

    AMOUNT_TYPE_CHOICES = (
        (AmountType.NONE, ''),
        (AmountType.ONE_EIGHTH, '⅛'),
        (AmountType.ONE_QUARTER, '	¼'),
        (AmountType.ONE_THIRD, '⅓'),
        (AmountType.ONE_HALF, '½'),
        (AmountType.TWO_THIRDS, '⅔'),
        (AmountType.THREE_QUARTER, '¾'),
        (AmountType.ONE, '1'),
        (AmountType.ONE_ONE_HALF, '1 ½'),
        (AmountType.TWO, '2'),
        (AmountType.THREE, '3'),
        (AmountType.FOUR, '4'),
        (AmountType.FIVE, '5'),
        (AmountType.SIX, '6'),
        (AmountType.SEVEN, '7'),
        (AmountType.EIGHT, '8'),
        (AmountType.NINE, '9'),
        (AmountType.TEN, '10'),
        (AmountType.FIFTEEN, '15'),
        (AmountType.TWENTY, '20'),
    )
    amount = models.CharField(max_length=5, choices=AMOUNT_TYPE_CHOICES, default='',
                              help_text='The numeric part of the amount of this ingredient')

    MEASUREMENT_TYPE_CHOICES = (
        (MeasurementType.NONE, ''),
        (MeasurementType.PINCH, 'Pinch'),
        (MeasurementType.TEASPOON, 'tsp'),
        (MeasurementType.TABLESPOON, 'Tbsp'),
        (MeasurementType.CUP, 'c'),
        (MeasurementType.PINT, 'pint'),
        (MeasurementType.QUART, 'qt'),
        (MeasurementType.LITER, 'liter'),
        (MeasurementType.GALLON, 'gallon'),
        (MeasurementType.OUNCE, 'oz'),
        (MeasurementType.POUND, 'lb'),
    )
    measurement = models.CharField(max_length=25, choices=MEASUREMENT_TYPE_CHOICES, default='',
                                   help_text='The measurement portion of this ingredient')

    item_description = models.CharField(max_length=200, blank=True, default='',
                                        help_text='A description of this ingredient, Can include amount '
                                                  'if the portion does not fit in the prescribed parameters')

    recipe = models.ForeignKey(Recipe, related_name='ingredients',
                               help_text='A pointer to an existing recipe to link them together', null=True)

    def __unicode__(self):
        """
        Returns a full string representation of this ingredient, including amount/measurement where applicable

        :return: string
        """
        this_ingredient_string = ''
        if self.amount:
            this_ingredient_string += self.get_amount_display() + ' '
        if self.measurement:
            this_ingredient_string += self.get_measurement_display() + ' '
        this_ingredient_string += self.item_description
        return this_ingredient_string

    def __str__(self):
        return self.__unicode__()
