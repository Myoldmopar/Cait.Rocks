# -*- coding: utf-8 -*-

from rest_framework import serializers

from recipes.models.planning import Calendar
from recipes.serializers.utilities import get_creator_from_object


class CalendarSerializer(serializers.ModelSerializer):
    """
    This serializer allows direct serialization for calendar objects, with additional keys as needed
    """
    creator = serializers.SerializerMethodField()

    class Meta:
        model = Calendar
        fields = '__all__'

    def get_creator(self, calendar_instance):
        return get_creator_from_object(calendar_instance)
