# -*- coding: utf-8 -*-
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import action

from recipes.models.planning import Calendar, Recipe
from recipes.serializers.planning import CalendarSerializer


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
        weekly_array_data = []
        for week_num, week_dates in enumerate(dates):
            daily_array_data = []
            for day_num, date_data in enumerate(week_dates):
                date_number = '-'
                if date_data['date_number'] > 0:
                    date_number = date_data['date_number']
                if date_data['recipe0']:
                    recipe01id = date_data['recipe0'].id
                else:
                    recipe01id = None
                if date_data['recipe1']:
                    recipe02id = date_data['recipe1'].id
                else:
                    recipe02id = None
                daily_array_data.append(
                    {
                        'date_number': date_number,
                        'recipe01': recipe01id,
                        'recipe02': recipe02id,
                    }
                )
            weekly_array_data.append(daily_array_data)
        return JsonResponse({'num_weeks': len(dates), 'array_data': weekly_array_data})

    @action(methods=['put'], detail=True)
    def recipe_id(self, request, pk):
        """
        Sets the recipe for this particular calendar date and recipe id
        Expects three parameters on the request body: date_num (1-31), daily_recipe_id (0 or 1), and recipe_pk
        :param request:
        :param pk: The primary key of the calendar to modify
        :return:
        """
        # TODO: ERROR HANDLE EVERY THING HERE!
        date_num = int(request.data['date_num'])  # TODO: ERROR HANDLE
        day_recipe_num = int(request.data['daily_recipe_id'])  # TODO: ERROR HANDLE
        recipe_id = int(request.data['recipe_pk'])  # TODO: ERROR HANDLE
        recipe_to_assign = Recipe.objects.get(pk=recipe_id)
        calendar_to_modify = Calendar.objects.get(pk=pk)
        day_string = '%02d' % date_num
        setattr(calendar_to_modify, 'day{0}recipe{1}'.format(day_string, day_recipe_num), recipe_to_assign)
        calendar_to_modify.save()
        return JsonResponse({'success': True})
