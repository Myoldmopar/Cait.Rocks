from django.shortcuts import get_object_or_404, render
from rest_framework import status

from recipes.models.recipe import Recipe


def cookbook(request):
    return render(request, 'recipes/recipe_list.html')


def detail_recipe(request, recipe_id=None):
    recipe = get_object_or_404(Recipe, pk=recipe_id)
    return render(request, 'recipes/recipe_detail.html', {'recipe': recipe})


def get_monthly_view(request):
    return render(request, 'recipes/monthly_view.html')


def monthly_plan(request):
    return render(request, 'recipes/meal_plan.html')


def grocery_list(request):
    return render(request, 'recipes/grocery_list.html')


def handle404(request):
    return render(request, 'recipes/404.html', status=status.HTTP_404_NOT_FOUND)
