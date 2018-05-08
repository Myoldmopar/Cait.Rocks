# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from recipes.views.planning_pages import MonthViewSet, PlannerViewSet
from recipes.views.recipe_pages import RecipeViewSet

router = DefaultRouter()
router.register(r'recipes', RecipeViewSet, base_name='recipes')
router.register(r'months', MonthViewSet, base_name='months')
router.register(r'', PlannerViewSet, base_name='planner')

app_name = 'planner'
urlpatterns = [

    # Main cookbook entry page
    url(r'^', include(router.urls)),

]
