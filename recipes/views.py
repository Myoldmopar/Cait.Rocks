from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet

from recipes.models.recipe import Recipe


class RecipeViewSet(ViewSet):
    def list(self, request):
        return render(request, 'recipes/recipe_list.html')

    def retrieve(self, request, pk=None):
        recipe = get_object_or_404(Recipe, pk=pk)
        return render(request, 'recipes/recipe_detail.html', {'recipe': recipe})


class MonthlyPlanViewSet(ViewSet):
    def list(self, request):
        return render(request, 'recipes/monthly_view.html')

    @action(methods=['get'], detail=False)
    def monthly_plan(self, request):
        return render(request, 'recipes/meal_plan.html')

    @action(methods=['get'], detail=False)
    def grocery_list(self, request):
        return render(request, 'recipes/grocery_list.html')


def handle404(request):
    return render(request, 'recipes/404.html', status=status.HTTP_404_NOT_FOUND)
