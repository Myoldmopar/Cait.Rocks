# -*- coding: utf-8 -*-
from rest_framework import serializers

from recipes.models.planning import Calendar


class CalendarSerializer(serializers.ModelSerializer):
    """
    This serializer allows direct serialization for calendar objects
    """
    class Meta:
        model = Calendar
        fields = '__all__'
