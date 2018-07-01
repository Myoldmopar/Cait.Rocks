# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework_swagger.views import get_swagger_view

from recipes.api.ingredient import IngredientViewSet
from recipes.api.planning import CalendarViewSet
from recipes.api.recipe import RecipeViewSet
from recipes.views.planning_pages import MonthViewSet, PlannerViewSet
from recipes.views.recipe_pages import RecipeViewSet as RecipePageViewSet

# This defines the app_name that is used to scope url names within this app
app_name = 'planner'

# Create a router and register our API view-sets
api_router = DefaultRouter()
api_router.register(r'ingredients', IngredientViewSet)
api_router.register(r'recipes', RecipeViewSet)
api_router.register(r'calendars', CalendarViewSet, base_name='calendar')

# Create a set of urlpatterns that only include the API
api_urlpatterns = [url(r'^api/', include(api_router.urls, namespace="api")), ]

# Show the API endpoints only on the Swagger page
schema_view = get_swagger_view(title='RecipLees API', patterns=api_urlpatterns, url='/planner/')

# Create a router to route all the other pages (the HTML pages)
page_router = DefaultRouter()
page_router.register(r'recipes', RecipePageViewSet, base_name='recipes')
page_router.register(r'months', MonthViewSet, base_name='months')
page_router.register(r'', PlannerViewSet, base_name='planner')

# And now create the final list of all API endpoints to allow proper routing
urlpatterns = api_urlpatterns + [
    url(r'^swagger/', schema_view, name='swagger'),  # Swagger API documentation page
    url(r'^', include(page_router.urls)),  # Main page views
]
