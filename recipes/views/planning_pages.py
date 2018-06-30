# -*- coding: utf-8 -*-

from calendar import month_name
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404, render
from rest_framework.viewsets import ViewSet

from recipes.models.planning import Calendar


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
        months = Calendar.objects.filter(creator=request.user.id)
        return render(request, 'recipes/month_list.html', {'months': months})

    def retrieve(self, request, pk=None):
        """
        Retrieves a single monthly plan and renders it in a template
        :param request: An http request object
        :param pk: The pk for the month of interest
        :return: Rendered HTML
        """
        month = get_object_or_404(Calendar, pk=pk)
        this_month_name = month_name[month.month]
        return render(request, 'recipes/month_detail.html', {'month_id': month.id, 'month_name': this_month_name})


class PlannerViewSet(LoginRequiredMixin, ViewSet):
    """
    This view set provides a single view into the planner page.  That page is fully dynamic through Angular XHR calls
    so no context needs to be rendered.
    """
    def list(self, request):
        return render(request, 'recipes/planner.html')
