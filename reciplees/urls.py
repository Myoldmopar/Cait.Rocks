# -*- coding: utf-8 -*-
from django.conf.urls import include, url
from django.contrib import admin
from django.http import HttpResponseRedirect
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='RecipLees API')

handler404 = 'recipes.views.utilities.handle404'

urlpatterns = [

    # Administration page for adding recipes, etc.
    url(r'^admin/', admin.site.urls, name="admin"),

    # API endpoints live inside here
    url(r'^api/', include('recipes.api.urls')),

    # Swagger API documentation page
    url(r'^swagger/', schema_view, name='api'),

    # Main page, listing all the recipes
    url(r'^cookbook/', include('recipes.urls', namespace='cookbook')),

    # When in doubt, redirect to the main cookbook page
    url(r'^$', lambda r: HttpResponseRedirect('cookbook/recipes/')),

]
