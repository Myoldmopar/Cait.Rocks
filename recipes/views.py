from django.shortcuts import get_object_or_404, render

from recipes.models import Recipe


def cookbook(request):
    return render(request, 'recipes/recipe_list.html')


def detail_recipe(request, recipe_id=None):
    recipe = get_object_or_404(Recipe, pk=recipe_id)
    return render(request, 'recipes/recipe_detail.html', {'recipe': recipe})
