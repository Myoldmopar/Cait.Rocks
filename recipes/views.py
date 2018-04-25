import os

from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render

from recipes.models import Recipe


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
