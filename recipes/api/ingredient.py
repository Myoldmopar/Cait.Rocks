# -*- coding: utf-8 -*-
from rest_framework import viewsets

from recipes.models.ingredient import Ingredient
from recipes.serializers.ingredient import IngredientSerializer


class IngredientViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This class provides the API get and retrieve views for the ingredient objects
    """
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
