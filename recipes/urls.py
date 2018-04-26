from django.conf.urls import url, include

from recipes.views import MonthlyPlanViewSet, RecipeViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'recipes', RecipeViewSet, base_name='recipes')
router.register(r'monthly_plan', MonthlyPlanViewSet, base_name='monthly_plan')

app_name = 'cookbook'
urlpatterns = [

    # Main cookbook entry page
    url(r'^', include(router.urls)),

]
