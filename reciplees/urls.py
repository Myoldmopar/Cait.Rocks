# -*- coding: utf-8 -*-
from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView
from recipes.views.utility_pages import server_version_data

handler404 = 'recipes.views.utility_pages.handle404'

urlpatterns = [

    # Authentication pages
    url(r'accounts/', include('django.contrib.auth.urls')),

    # Administration page for adding recipes, etc.
    url(r'^admin/', admin.site.urls, name="admin"),

    # Main app pages
    url(r'^planner/', include('recipes.urls')),

    # "About" page with Git sha and version info
    url(r'^about/', server_version_data, name='about'),

    # ... your project urls
    url(r'^robots.txt$', TemplateView.as_view(template_name="common/robots.txt", content_type="text/plain"),
        name="robots_file"),
    url(r'^humans.txt$', TemplateView.as_view(template_name="common/humans.txt", content_type="text/plain"),
        name="humans_file"),

    # Root home page
    url(r'^$', TemplateView.as_view(template_name='common/home.html', content_type="text/html"), name="home")

]
