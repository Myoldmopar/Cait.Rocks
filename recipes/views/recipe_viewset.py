from django.shortcuts import get_object_or_404, render

from rest_framework.viewsets import ViewSet

from recipes.models.recipe import Recipe


class RecipeViewSet(ViewSet):
    def list(self, request):
        return render(request, 'recipes/recipe_list.html')

    def retrieve(self, request, pk=None):
        recipe = get_object_or_404(Recipe, pk=pk)
        return render(request, 'recipes/recipe_detail.html', {'recipe': recipe})
