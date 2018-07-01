# -*- coding: utf-8 -*-

from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from rest_framework.viewsets import ViewSet


class MonthViewSet(ViewSet):
    """
    This view set provides two page views, a "list" view which shows all the months and a "detail"
    view which shows just a single month
    """
    def list(self, request):
        """
        Retrieves a list of monthly plans and renders them in a template
        :param request: An http request object
        :return: Rendered HTML
        """
        return render(request, 'recipes/months.html', {'django_month_id': False})

    def retrieve(self, request, pk=None):
        """
        Retrieves a single monthly plan and renders it in a template
        :param request: An http request object
        :param pk: The pk for the month of interest
        :return: Rendered HTML
        """
        return render(request, 'recipes/months.html', {'django_month_id': pk})


class PlannerViewSet(LoginRequiredMixin, ViewSet):
    """
    This view set provides a single view into the planner page.  That page is fully dynamic through Angular XHR calls
    so no context needs to be rendered.
    """
    def list(self, request):
        return render(request, 'recipes/planner.html')
