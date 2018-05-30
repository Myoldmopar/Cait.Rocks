# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.urlresolvers import reverse
from django.db import models
from django.contrib.auth.models import User


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
    title = models.CharField(max_length=100, help_text='The descriptive title for this recipe')

    RECIPE_TYPE_CHOICES = (
        (RecipeTypes.UNKNOWN, 'Unknown'),
        (RecipeTypes.ENTREE, 'Entree'),
        (RecipeTypes.SOUP, 'Soup'),
        (RecipeTypes.SALAD, 'Salad'),
        (RecipeTypes.DRINK, 'Drink'),
        (RecipeTypes.DESSERT, 'Dessert'),
        (RecipeTypes.SIDE_DISH, 'Side Dish'),
        (RecipeTypes.SAUCE_DRESSING, 'Sauce/Dressing'),
        (RecipeTypes.SEASONING, 'Seasoning'),
    )
    recipe_type = models.CharField(max_length=20, choices=RECIPE_TYPE_CHOICES, default='Unknown',
                                   help_text='The category for this recipe')

    directions = models.TextField(help_text='A free-form set of text instructions for making this recipe', null=True)

    creator = models.ForeignKey(User, related_name='recipes',
                                help_text='The user who created this recipe instance', null=True)

    created_date = models.DateTimeField(auto_now_add=True, help_text='The creation date for this recipe object')
    modified_date = models.DateTimeField(auto_now=True, help_text='The last modified date for this recipe object')
    image = models.ImageField(upload_to='images/%y/%m/%d', max_length=200, null=True, blank=True)

    def __str__(self):
        """
        Creates a meaningful string for this object instance
        :return: string
        """
        return self.title

    def get_absolute_url(self):
        """
        Gets the URL path to this recipe's nice view page, not the API url!
        :return: string
        """
        return reverse('planner:recipe_views-detail', kwargs={'pk': self.id})
