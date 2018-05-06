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
        """
        Creates a custom response on the API for getting monthly data, including date numbers, and calendar-day ids
        :param request: A full django request object
        :param pk: The primary key for this particular calendar instance
        :return: A JSONResponse with two keys: dates and num_weeks.  num_weeks returns the number of weeks in this month
        for convenience, either 4 or 5.  dates is a dictionary, with keys dxy, where x is the week number and y is the
        day number, both zero based.  d00 represents the top left block of the calendar, which will be the first Sunday
        if the month starts on that day.  d16 represents the second Saturday of the month.  These keys are paired with
        values that are dictionaries themselves, containing day_key and date_number.  day_key is the key to the
        calendar-day database object for that day, if applicable; date_number is the numeric calendar date, or just a
        hyphen if this day isn't a part of the current month.
        """
        c = Calendar.objects.get(pk=pk)
        dates = c.get_monthly_dates()
        date_response = {}
        for week_num, week_dates in enumerate(dates):
            for day_num, date_data in enumerate(week_dates):
                date_number = '-'
                if date_data['date_number'] > 0:
                    date_number = date_data['date_number']
                day_key = date_data['day_key']
                full_day = date_data['calendar_day']
                date_response["d%s%s" % (week_num, day_num)] = {
                    'day_key': day_key,
                    'date_number': date_number,
                    'recipe01': {'title': full_day.recipe01.title, 'id': full_day.recipe01.id},
                    'recipe02': {'title': full_day.recipe02.title, 'id': full_day.recipe02.id},
                    'recipe03': {'title': full_day.recipe03.title, 'id': full_day.recipe03.id},
                    'recipe04': {'title': full_day.recipe04.title, 'id': full_day.recipe04.id}
                }
        return JsonResponse({'dates': date_response, 'num_weeks': len(dates)})


class CalendarDayViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CalendarDay.objects.all()
    serializer_class = CalendarDaySerializer
