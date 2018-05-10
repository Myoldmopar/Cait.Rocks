# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from rest_framework import serializers

from recipes.models.planning import Calendar


class CalendarSerializer(serializers.ModelSerializer):
    """
    This serializer allows direct serialization for calendar objects, with additional keys as needed
    """
    creator = serializers.SerializerMethodField()

    class Meta:
        model = Calendar
        fields = '__all__'

    def get_creator(self, calendar_instance):
        if not calendar_instance.creator:
            return ""
        try:
            c = User.objects.get(pk=calendar_instance.creator.pk)
            return "%s %s" % (c.first_name, c.last_name)
        except User.DoesNotExist:
            return ""
