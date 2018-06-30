# -*- coding: utf-8 -*-
from rest_framework import serializers

from recipes.models.planning import Calendar
from recipes.serializers.utilities import get_creator_from_object


class CalendarSerializer(serializers.ModelSerializer):
    """
    This serializer allows direct serialization for calendar objects, with additional keys as needed
    """

    class Meta:
        model = Calendar
        fields = '__all__'

    #: The creator field is a read-only serializer method field.  Internally the base class's to_representation
    #: method will call the get_creator method when serializing the object for output
    creator = serializers.SerializerMethodField()

    def get_creator(self, calendar_instance):
        """
        This method is used to generate a representation of the creator field for output
        :param calendar_instance: The calendar instance from which the creator data is mined in order to show output
        :return: Whatever the get_creator_from_object worker function returns, which is for now "FirstName LastName"
        """
        return get_creator_from_object(calendar_instance)
