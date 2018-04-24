from django.conf.urls import url, include

from . import views
from rest_framework.routers import DefaultRouter

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'recipes', views.RecipeViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    # ex: /recipes/
    url(r'^$', views.list_recipes, name='all'),
    # ex: /recipes/5/
    url(r'^(?P<recipe_id>[0-9]+)/$', views.detail_recipe, name='detail'),
    url(r'^api/', include(router.urls)),
]
