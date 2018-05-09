# -*- coding: utf-8 -*-
from rest_framework import viewsets

from recipes.models.recipe import Recipe
from recipes.serializers.recipe import RecipeSerializer


class RecipeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This class provides the API get and retrieve views for the recipe objects
    """
    queryset = Recipe.objects.order_by("title")
    serializer_class = RecipeSerializer
