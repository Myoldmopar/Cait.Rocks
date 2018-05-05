# -*- coding: utf-8 -*-
from rest_framework import serializers
from recipes.models.planning import Calendar, CalendarDay


class CalendarSerializer(serializers.ModelSerializer):

    class Meta:
        model = Calendar
        fields = '__all__'


class CalendarDaySerializer(serializers.ModelSerializer):

    class Meta:
        model = CalendarDay
        fields = '__all__'
