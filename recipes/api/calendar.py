# -*- coding: utf-8 -*-
from rest_framework import viewsets

from recipes.models.calendar import Calendar
from recipes.serializers.calendar import CalendarSerializer


class CalendarViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer
