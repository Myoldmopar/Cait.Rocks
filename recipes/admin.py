# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from recipes.models.ingredient import Ingredient
from recipes.models.planning import Calendar
from recipes.models.recipe import Recipe


admin.site.register(Ingredient)


class CalendarAdmin(admin.ModelAdmin):
    model = Calendar
    list_display = ('nickname', 'creator')


admin.site.register(Calendar, CalendarAdmin)


class IngredientInline(admin.TabularInline):
    model = Ingredient
    extra = 0


class RecipeAdmin(admin.ModelAdmin):
    model = Recipe
    inlines = [IngredientInline]
    list_display = ('title', 'recipe_type', 'creator')
    search_fields = ('title',)


admin.site.register(Recipe, RecipeAdmin)
