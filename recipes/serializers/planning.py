# -*- coding: utf-8 -*-
from recipes.models.planning import Calendar
from recipes.serializers.base import CreatorBaseSerializer


class CalendarSerializer(CreatorBaseSerializer):
    """
    This serializer allows direct serialization for calendar objects, with additional keys as needed
    """

    class Meta:
        model = Calendar
        fields = '__all__'
