# -*- coding: utf-8 -*-
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import action

from recipes.models.planning import Calendar, CalendarDay
from recipes.serializers.planning import CalendarSerializer, CalendarDaySerializer


class CalendarViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer

    @action(methods=['get'], detail=True)
    def monthly_dates(self, request, pk):
        c = Calendar.objects.get(pk=pk)
        dates = c.get_monthly_dates()
        date_response = {}
        for week_num, week_dates in enumerate(dates):
            for day_num, week_date in enumerate(week_dates):
                if week_date > 0:
                    date_response["d%s%s" % (week_num, day_num)] = str(week_date)
                else:
                    date_response["d%s%s" % (week_num, day_num)] = '-'
        return JsonResponse({'dates': date_response, 'num_weeks': len(dates)})


class CalendarDayViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CalendarDay.objects.all()
    serializer_class = CalendarDaySerializer
