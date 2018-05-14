# -*- coding: utf-8 -*-
from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView

handler404 = 'recipes.views.utility_pages.handle404'

urlpatterns = [

    # Authentication pages
    url(r'accounts/', include('django.contrib.auth.urls')),

    # Administration page for adding recipes, etc.
    url(r'^admin/', admin.site.urls, name="admin"),

    # Main app pages
    url(r'^planner/', include('recipes.urls')),

    # Root home page
    url(r'^$', TemplateView.as_view(template_name='common/home.html', content_type="text/html"),  name="home")

]
