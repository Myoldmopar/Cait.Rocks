from rest_framework import viewsets

from recipes.models.direction import Direction
from recipes.models.ingredient import Ingredient
from recipes.models.recipe import Recipe
from recipes.serializers.direction import DirectionSerializer
from recipes.serializers.ingredient import IngredientSerializer
from recipes.serializers.recipe import RecipeSerializer


class DirectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Direction.objects.all()
    serializer_class = DirectionSerializer


class IngredientViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class RecipeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Recipe.objects.order_by("title")
    serializer_class = RecipeSerializer
