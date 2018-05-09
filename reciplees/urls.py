# -*- coding: utf-8 -*-
from django.conf.urls import include, url
from django.contrib import admin
# from django.http import HttpResponseRedirect
from rest_framework_swagger.views import get_swagger_view
from django.contrib.auth import views as auth_views
from recipes.views.utility_pages import home

external_url_patterns = [

    # API endpoints live inside here
    url(r'^api/', include('recipes.api.urls')),

]

schema_view = get_swagger_view(title='RecipLees API', patterns=external_url_patterns)

handler404 = 'recipes.views.utility_pages.handle404'

urlpatterns = external_url_patterns + [

    # Swagger API documentation page
    url(r'^swagger/', schema_view, name='api'),

    # Main page, listing all the recipes
    url(r'^planner/', include('recipes.urls', namespace='cookbook')),

    # Authentication pages
    url(r'accounts/', include('django.contrib.auth.urls')),

    # Administration page for adding recipes, etc.
    url(r'^admin/', admin.site.urls, name="admin"),

    url(r'^$', home, name="home"),

    # # When in doubt, redirect to the home page
    # url(r'^$', lambda r: HttpResponseRedirect('')),

]
