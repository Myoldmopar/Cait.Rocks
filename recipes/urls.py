# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from recipes.views.monthly_plan import MonthlyPlanViewSet
from recipes.views.recipe_viewset import RecipeViewSet

router = DefaultRouter()
router.register(r'recipes', RecipeViewSet, base_name='recipes')
router.register(r'monthly_plan', MonthlyPlanViewSet, base_name='monthly_plan')

app_name = 'cookbook'
urlpatterns = [

    # Main cookbook entry page
    url(r'^', include(router.urls)),

]
