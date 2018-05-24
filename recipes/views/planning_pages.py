# -*- coding: utf-8 -*-

from calendar import month_name
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404, render
from rest_framework.viewsets import ViewSet

from recipes.models.planning import Calendar


class MonthViewSet(ViewSet):
    def list(self, request):
        months = Calendar.objects.filter(creator=request.user.id)
        return render(request, 'recipes/month_list.html', {'months': months})

    def retrieve(self, request, pk=None):
        month = get_object_or_404(Calendar, pk=pk)
        this_month_name = month_name[month.month]
        return render(request, 'recipes/month_detail.html', {'month_id': month.id, 'month_name': this_month_name})


class PlannerViewSet(LoginRequiredMixin, ViewSet):
    def list(self, request):
        return render(request, 'recipes/planner.html')
