# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Ingredient)
admin.site.register(Direction)


class IngredientAdmin(admin.StackedInline):
    model = Ingredient


class DirectionAdmin(admin.StackedInline):
    model = Direction
    max_num = 1


class RecipeAdmin(admin.ModelAdmin):
    model = Recipe
    # list_display = ['title', 'ingredient', ]
    inlines = [IngredientAdmin, DirectionAdmin]


admin.site.register(Recipe, RecipeAdmin)
