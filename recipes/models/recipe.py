# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.urlresolvers import reverse
from django.db import models
from django.contrib.auth.models import User


class RecipeTypes(object):
    """
    This class is a list of strings used to internally reference and store different recipe types
    """
    UNKNOWN = '10'
    ENTREE = '30'
    SALAD_ENTREE = '35'
    SOUP = '40'
    SALAD = '50'
    DRINK = '60'
    DESSERT = '70'
    SIDE_DISH = '80'
    SAUCE_DRESSING = '90'
    SEASONING = '100'


class Recipe(models.Model):
    """
    The recipe model captures the heart of this project, defining what a recipe is, including a title, directions, and
    ingredients.  Title, directions, recipe type, and other scalar fields are defined here, while Ingredients are
    defined on the Ingredient model itself, to allow a variable number of them, via foreign key.
    """

    #: The title field is required to be a unique string across all Recipe instances
    title = models.CharField(max_length=100, unique=True, help_text='The descriptive title for this recipe')

    #: This tuple of tuples allows referencing display values for each recipe type via enum string values
    RECIPE_TYPE_CHOICES = (
        (RecipeTypes.UNKNOWN, 'Unknown'),
        (RecipeTypes.ENTREE, 'Entree'),
        (RecipeTypes.SALAD_ENTREE, 'Salad-Entree'),
        (RecipeTypes.SOUP, 'Soup'),
        (RecipeTypes.SALAD, 'Salad'),
        (RecipeTypes.DRINK, 'Drink'),
        (RecipeTypes.DESSERT, 'Dessert'),
        (RecipeTypes.SIDE_DISH, 'Side Dish'),
        (RecipeTypes.SAUCE_DRESSING, 'Sauce/Dressing'),
        (RecipeTypes.SEASONING, 'Seasoning'),
    )

    #: The recipe type choice field captures the type of recipe
    recipe_type = models.CharField(max_length=20, choices=RECIPE_TYPE_CHOICES, default='Unknown',
                                   help_text='The category for this recipe')

    #: The directions field is a free form text field defining the directions for making this
    directions = models.TextField(help_text='A free-form set of text instructions for making this recipe', null=True)

    #: The creator field is a foreign key, allowing us to link this recipe to a specific User instance
    creator = models.ForeignKey(User, related_name='recipes',
                                help_text='The user who created this recipe instance', null=True)

    #: The created and modified date fields allow us to automatically track timestamps, internally the field is updated
    #: on the field's pre_save() method.
    created_date = models.DateTimeField(auto_now_add=True, help_text='The creation date for this recipe object')
    modified_date = models.DateTimeField(auto_now=True, help_text='The last modified date for this recipe object')

    #: The image field contains image data to allow showing off the beauty of this recipe
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
        return reverse('planner:recipes-detail', kwargs={'pk': self.id})
