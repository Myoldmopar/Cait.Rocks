# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from recipes.models.recipe import Recipe


class Ingredient(models.Model):
    raw_string = models.CharField(max_length=200, blank=False)
    recipe = models.ForeignKey(Recipe)

    def __str__(self):
        return self.raw_string
