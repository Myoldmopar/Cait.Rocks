from django.conf.urls import include, url
from django.contrib import admin
from django.http import HttpResponseRedirect
from rest_framework.routers import DefaultRouter
from rest_framework_swagger.views import get_swagger_view

from recipes.api import RecipeViewSet

schema_view = get_swagger_view(title='RecipLees API')

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'recipes', RecipeViewSet)

urlpatterns = [

    # Administration page for adding recipes, etc.
    url(r'^admin/', admin.site.urls, name="admin"),

    # API endpoints live inside here
    url(r'^api/', include(router.urls)),

    # Swagger API documentation page
    url(r'^swagger/', schema_view),

    # Main page, listing all the recipes
    url(r'^cookbook/', include('recipes.urls')),

    # When in doubt, redirect to the main cookbook page
    url(r'^$', lambda r: HttpResponseRedirect('cookbook/')),
]
