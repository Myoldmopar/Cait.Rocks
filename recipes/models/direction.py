# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from recipes.models.recipe import Recipe


class Direction(models.Model):
    full_directions = models.TextField(help_text="A freeform list of directions for making this recipe")
    recipe = models.ForeignKey(Recipe, help_text="A pointer to an existing recipe to link them together", null=True)

    def __str__(self):
        if len(self.full_directions) < 40:
            return self.full_directions
        return self.full_directions[:40]
