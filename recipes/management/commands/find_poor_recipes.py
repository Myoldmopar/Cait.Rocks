# -*- coding: utf-8 -*-
from django.core.management.base import BaseCommand

from recipes.models.recipe import Recipe


class Command(BaseCommand):
    help = 'Finds recipes where all ingredients are unintelligent (no measurement or amount)'

    def handle(self, *args, **options):
        for recipe in Recipe.get_poor_recipes():
            print("Found dumb recipe: %s" % recipe.title)
