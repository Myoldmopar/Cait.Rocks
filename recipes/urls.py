from django.conf.urls import url

from . import views

# The API URLs are now determined automatically by the router.
urlpatterns = [

    # Main cookbook entry page
    url(r'^$', views.cookbook, name='cookbook'),

    # Detailed recipe entry page
    url(r'^recipe/(?P<recipe_id>[0-9]+)/$', views.detail_recipe, name='detail'),

]
