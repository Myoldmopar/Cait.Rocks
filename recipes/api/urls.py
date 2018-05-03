# -*- coding: utf-8 -*-
from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter

from recipes.api.direction import DirectionViewSet
from recipes.api.ingredient import IngredientViewSet
from recipes.api.recipe import RecipeViewSet
from recipes.api.calendar import CalendarViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'directions', DirectionViewSet)
router.register(r'ingredients', IngredientViewSet)
router.register(r'recipes', RecipeViewSet)
router.register(r'calendars', CalendarViewSet)

urlpatterns = [

    # API endpoints live inside here
    url(r'^', include(router.urls)),

]
