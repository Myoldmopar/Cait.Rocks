# -*- coding: utf-8 -*-
from django.shortcuts import get_object_or_404, render
from rest_framework.viewsets import ViewSet

from recipes.models.ingredient import Ingredient
from recipes.models.recipe import Recipe


class RecipeViewSet(ViewSet):
    def list(self, request, pk=None):
        recipes = Recipe.objects.all()
        return render(request, 'recipes/recipe_list.html', {'recipes': recipes})

    def retrieve(self, request, pk=None):
        recipe = get_object_or_404(Recipe, pk=pk)
        ingredients = Ingredient.objects.filter(recipe=recipe)
        return render(request, 'recipes/recipe_detail.html', {'recipe': recipe, 'ingredients': ingredients})
