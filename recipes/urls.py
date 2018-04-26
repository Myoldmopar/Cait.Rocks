from django.conf.urls import url

from recipes.views import get_monthly_view, grocery_list, monthly_plan, cookbook, detail_recipe

# The API URLs are now determined automatically by the router.
urlpatterns = [

    # Main cookbook entry page
    url(r'^$', cookbook, name='cookbook'),

    # Detailed recipe entry page
    url(r'^recipe/(?P<recipe_id>[0-9]+)/$', detail_recipe, name='detail'),

    # Monthly Plan pages, ultimately containing a nice calendar and table of ingredients for grocery shopping
    url(r'^thismonth/', get_monthly_view),
    url(r'^grocery_list/', grocery_list),
    url(r'^monthly_plan/', monthly_plan),

]
