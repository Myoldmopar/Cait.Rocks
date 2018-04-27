# -*- coding: utf-8 -*-
from rest_framework import viewsets

from recipes.models.ingredient import Ingredient
from recipes.serializers.ingredient import IngredientSerializer


class IngredientViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
