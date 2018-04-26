from rest_framework import viewsets

from recipes.models.recipe import Recipe
from recipes.serializers.recipe import RecipeSerializer


class RecipeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Recipe.objects.order_by("title")
    serializer_class = RecipeSerializer
