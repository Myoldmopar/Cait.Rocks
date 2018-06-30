# -*- coding: utf-8 -*-
from django.shortcuts import get_object_or_404, render
from rest_framework.viewsets import ViewSet

from recipes.models.ingredient import Ingredient
from recipes.models.recipe import Recipe


class RecipeViewSet(ViewSet):
    """
    This view set provides two page views, a "list" view which shows all the recipes and a "detail"
    view which shows just a single recipe
    """

    def list(self, request):
        """
        Retrieves a list of recipes and renders them in a template

        :param request: An http request object
        :return: Rendered HTML
        """
        recipes = Recipe.objects.all()
        return render(request, 'recipes/recipe_list.html', {'recipes': recipes})

    def retrieve(self, request, pk=None):
        """
        Retrieves a single recipe and renders it in a template

        :param request: An http request object
        :param pk: The pk for the recipe of interest
        :return: Rendered HTML
        """
        recipe = get_object_or_404(Recipe, pk=pk)
        ingredients = Ingredient.objects.filter(recipe=recipe)
        return render(request, 'recipes/recipe_detail.html', {'recipe': recipe, 'ingredients': ingredients})
