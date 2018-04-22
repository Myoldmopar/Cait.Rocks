from django.conf.urls import url

from . import views

urlpatterns = [
    # ex: /recipes/
    url(r'^$', views.list_recipes, name='all'),
    # ex: /recipes/5/
    url(r'^(?P<recipe_id>[0-9]+)/$', views.detail_recipe, name='detail'),
]