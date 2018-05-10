# -*- coding: utf-8 -*-
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

from recipes.models.recipe import Recipe, RecipeTypes
from recipes.models.ingredient import Ingredient, MeasurementType, AmountType
from recipes.models.planning import Calendar


class Command(BaseCommand):
    help = 'Re-initializes a few recipes and stuff on the DB'

    def handle(self, *args, **options):
        u = User.objects.create_user(
            username="TestUser",
            password="TestPass",
            first_name="Caitlin",
            last_name="Lee"
        )
        u2 = User.objects.create_user(
            username="TestUser2",
            password="TestPass2",
            first_name="Edwin",
            last_name="Lee"
        )
        r1 = Recipe.objects.create(
            title="Sauce recipe",
            recipe_type=RecipeTypes.SAUCE_DRESSING,
            creator=u,
            directions="Do some stuff\nThen do more"
        )
        r2 = Recipe.objects.create(
            title="Chicken recipe",
            recipe_type=RecipeTypes.ENTREE,
            creator=u,
            directions="Make all the things\nPrep it\nCook it\nEat it\nSit back and enjoy"
        )
        r3 = Recipe.objects.create(
            title="Beef recipe",
            recipe_type=RecipeTypes.ENTREE,
            creator=u2,
            directions="Make all the things\nPrep it\nCook it\nEat it\nSit back and enjoy"
        )
        Ingredient.objects.create(
            amount=AmountType.ONE_HALF,
            measurement=MeasurementType.TEASPOON,
            item_description="Sauce",
            recipe=r1
        )
        Ingredient.objects.create(
            amount=AmountType.ONE_HALF,
            measurement=MeasurementType.TEASPOON,
            item_description="Sauce",
            recipe=r2
        )
        Ingredient.objects.create(
            amount=AmountType.ONE_HALF,
            measurement=MeasurementType.TEASPOON,
            item_description="Sauce",
            recipe=r3
        )
        Ingredient.objects.create(
            amount=2,
            measurement=MeasurementType.NONE,
            item_description="Chicken breasts",
            recipe=r2
        )
        Ingredient.objects.create(
            amount=2,
            measurement=MeasurementType.POUND,
            item_description="Hamburger",
            recipe=r3
        )
        Calendar.objects.create(
            nickname="This Month",
            year=2018,
            month=5,
            creator=u
        )
