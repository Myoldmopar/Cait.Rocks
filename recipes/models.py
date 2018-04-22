# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Recipe(models.Model):
    title = models.CharField(max_length=100)

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
