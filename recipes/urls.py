from django.conf.urls import url

from recipes.views import get_monthly_view, grocery_list, monthly_plan, cookbook, detail_recipe

app_name = 'cookbook'
urlpatterns = [

    # Main cookbook entry page
    url(r'^$', cookbook, name='index'),

    # Detailed recipe entry page
    url(r'^recipe/(?P<recipe_id>[0-9]+)/$', detail_recipe, name='recipe'),

    # Monthly Plan pages, ultimately containing a nice calendar and table of ingredients for grocery shopping
    url(r'^thismonth/', get_monthly_view, name='monthlyview'),
    url(r'^grocery_list/', grocery_list, name='grocerylist'),
    url(r'^monthly_plan/', monthly_plan, name='monthlyplan'),

]
