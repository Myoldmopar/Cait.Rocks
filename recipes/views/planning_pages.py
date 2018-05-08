# -*- coding: utf-8 -*-

from django.shortcuts import get_object_or_404, render
from rest_framework.viewsets import ViewSet

from recipes.models.planning import Calendar


class MonthViewSet(ViewSet):
    def list(self, request):
        months = Calendar.objects.all()
        return render(request, 'recipes/month_list.html', {'months': months})

    def retrieve(self, request, pk=None):
        month = get_object_or_404(Calendar, pk=pk)
        return render(request, 'recipes/month_detail.html', {'month': month})


class PlannerViewSet(ViewSet):
    def list(self, request):
        return render(request, 'recipes/planner.html')
