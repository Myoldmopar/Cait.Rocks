# -*- coding: utf-8 -*-
from rest_framework import serializers
from recipes.models.calendar import Calendar


class CalendarSerializer(serializers.ModelSerializer):

    class Meta:
        model = Calendar
        fields = '__all__'
