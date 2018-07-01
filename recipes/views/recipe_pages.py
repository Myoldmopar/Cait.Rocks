# -*- coding: utf-8 -*-
from django.shortcuts import render
from rest_framework.viewsets import ViewSet


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
        return render(request, 'recipes/recipes.html', {'django_recipe_id': False})

    def retrieve(self, request, pk=None):
        """
        Retrieves a single recipe and renders it in a template

        :param request: An http request object
        :param pk: The pk for the recipe of interest
        :return: Rendered HTML
        """
        return render(request, 'recipes/recipes.html', {'django_recipe_id': pk})
