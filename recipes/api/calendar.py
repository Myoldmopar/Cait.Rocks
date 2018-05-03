# -*- coding: utf-8 -*-
from rest_framework import viewsets

from recipes.models.calendar import Calendar, CalendarDay
from recipes.serializers.calendar import CalendarSerializer, CalendarDaySerializer


class CalendarViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer


class CalendarDayViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CalendarDay.objects.all()
    serializer_class = CalendarDaySerializer
