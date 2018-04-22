from django.shortcuts import get_object_or_404, render

from recipes.models import Recipe


def list_recipes(request):
    all_recipes = Recipe.objects.order_by("title")
    return render(request, 'recipes/recipe_list.html', {'recipe_list': all_recipes})


def detail_recipe(request, recipe_id=None):
    recipe = get_object_or_404(Recipe, pk=recipe_id)
    return render(request, 'recipes/recipe_detail.html', {'recipe': recipe})

