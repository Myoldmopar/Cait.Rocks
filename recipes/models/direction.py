# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from recipes.models.recipe import Recipe


class Direction(models.Model):
    """
    This model captures a free-form string description of the directions to make a recipe
    """
    # TODO: Restrict one direction per recipe, so just make this a text field on the recipe!  Yay!
    full_directions = models.TextField(help_text="A free-form list of directions for making this recipe")
    recipe = models.ForeignKey(Recipe, related_name="directions",
                               help_text="A pointer to an existing recipe to link them together", null=True)

    def __str__(self):
        """
        Creates a meaningful string for this object instance
        :return: string
        """
        if len(self.full_directions) < 40:
            return self.full_directions
        return self.full_directions[:40]
