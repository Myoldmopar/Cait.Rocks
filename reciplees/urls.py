# -*- coding: utf-8 -*-
from django.conf.urls import include, url
from django.contrib import admin

from recipes.views.utility_pages import home

handler404 = 'recipes.views.utility_pages.handle404'

urlpatterns = [

    # Authentication pages
    url(r'accounts/', include('django.contrib.auth.urls')),

    # Administration page for adding recipes, etc.
    url(r'^admin/', admin.site.urls, name="admin"),

    # Main app pages
    url(r'^planner/', include('recipes.urls')),

    # Root home page
    url(r'^$', home, name="home"),

]
