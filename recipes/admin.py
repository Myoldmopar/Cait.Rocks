# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from recipes.models.direction import Direction
from recipes.models.ingredient import Ingredient
from recipes.models.recipe import Recipe

admin.site.register(Direction)
admin.site.register(Ingredient)


class IngredientInline(admin.TabularInline):
    model = Ingredient
    extra = 0


class DirectionInline(admin.StackedInline):
    model = Direction
    max_num = 1


class RecipeAdmin(admin.ModelAdmin):
    model = Recipe
    inlines = [IngredientInline, DirectionInline]
    list_display = ('title', 'recipe_type')

admin.site.register(Recipe, RecipeAdmin)
