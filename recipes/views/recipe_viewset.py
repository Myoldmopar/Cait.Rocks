from django.shortcuts import get_object_or_404, render

from rest_framework.viewsets import ViewSet

from recipes.models.recipe import Recipe


class RecipeViewSet(ViewSet):
    def list(self, request):
        return render(request, 'recipes/recipe_list.html')

    def retrieve(self, request, pk=None):
        recipe = get_object_or_404(Recipe, pk=pk)
        ingredient_strings = []
        for ingredient in recipe.ingredient_set.all():
            this_ingedient_string = ''
            if ingredient.amount:
                this_ingedient_string += ingredient.get_amount_display() + ' '
            if ingredient.measurement:
                this_ingedient_string += ingredient.get_measurement_display() + ' '
            this_ingedient_string += ingredient.item_description
            ingredient_strings.append(this_ingedient_string)
        return render(request, 'recipes/recipe_detail.html', {'recipe': recipe, 'ingredients': ingredient_strings})
