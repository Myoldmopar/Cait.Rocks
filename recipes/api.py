from rest_framework import viewsets

from recipes.models import Recipe
from recipes.serializers import RecipeSerializer


class RecipeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Recipe.objects.order_by("title")
    serializer_class = RecipeSerializer
