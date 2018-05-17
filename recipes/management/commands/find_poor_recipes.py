# -*- coding: utf-8 -*-
from django.core.management.base import BaseCommand

from recipes.models.recipe import Recipe
from recipes.models.ingredient import AmountType, MeasurementType


class Command(BaseCommand):
    help = 'Finds recipes where all ingredients are unintelligent (no measurement or amount)'

    def handle(self, *args, **options):
        for recipe in Recipe.objects.all():
            this_recipe_is_smart = False
            for ingredient in recipe.ingredients.all():
                if ingredient.amount != AmountType.NONE or ingredient.measurement != MeasurementType.NONE:
                    this_recipe_is_smart = True
                    break
            if not this_recipe_is_smart:
                print("Found dumb recipe: %s" % recipe.title)
