# -*- coding: utf-8 -*-
from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter

from recipes.api.direction import DirectionViewSet
from recipes.api.ingredient import IngredientViewSet
from recipes.api.planning import CalendarViewSet
from recipes.api.recipe import RecipeViewSet

# Create a router and register our API view-sets with it.
api_router = DefaultRouter()
api_router.register(r'directions', DirectionViewSet)
api_router.register(r'ingredients', IngredientViewSet)
api_router.register(r'recipes', RecipeViewSet)
api_router.register(r'calendars', CalendarViewSet)

urlpatterns = [

    # API endpoints live inside here
    url(r'^', include(api_router.urls)),

]
