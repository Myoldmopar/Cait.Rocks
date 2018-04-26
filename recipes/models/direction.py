# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from recipes.models.recipe import Recipe


class Direction(models.Model):
    full_directions = models.TextField()
    recipe = models.ForeignKey(Recipe)

    def __str__(self):
        if len(self.full_directions) < 40:
            return self.full_directions
        return self.full_directions[:40]
