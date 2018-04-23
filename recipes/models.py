# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class RecipeTypes(object):
    UNKNOWN = '10'
    ENTREE = '30'
    SOUP = '40'
    SALAD = '50'
    DRINK = '60'
    DESSERT = '70'
    SIDE_DISH = '80'
    SAUCE_DRESSING = '90'
    SEASONING = '100'


class Recipe(models.Model):

    title = models.CharField(max_length=100)

    RECIPE_TYPE_CHOICES = (
        (RecipeTypes.UNKNOWN, "Unknown"),
        (RecipeTypes.ENTREE, "Entree"),
        (RecipeTypes.SOUP, "Soup"),
        (RecipeTypes.SALAD, "Salad"),
        (RecipeTypes.DRINK, "Drink"),
        (RecipeTypes.DESSERT, "Dessert"),
        (RecipeTypes.SIDE_DISH, "Side Dish"),
        (RecipeTypes.SAUCE_DRESSING, "Sauce/Dressing"),
        (RecipeTypes.SEASONING, "Seasoning"),
    )
    recipe_type = models.CharField(max_length=20, choices=RECIPE_TYPE_CHOICES, default='Unknown')

    def __str__(self):
        return self.title


class Ingredient(models.Model):
    raw_string = models.CharField(max_length=200)
    recipe = models.ForeignKey(Recipe)

    def __str__(self):
        return self.raw_string


class Direction(models.Model):
    full_directions = models.TextField()
    recipe = models.ForeignKey(Recipe)

    def __str__(self):
        if len(self.full_directions) < 40:
            return self.full_directions
        return self.full_directions[:40]
