# -*- coding: utf-8 -*-
from django.shortcuts import render

from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet


class MonthlyPlanViewSet(ViewSet):
    def list(self, request):
        return render(request, 'recipes/monthly_view.html')

    @action(methods=['get'], detail=False)
    def monthly_plan(self, request):
        return render(request, 'recipes/meal_plan.html')

    @action(methods=['get'], detail=False)
    def grocery_list(self, request):
        return render(request, 'recipes/grocery_list.html')
