# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from rest_framework import serializers


class CreatorBaseSerializer(serializers.ModelSerializer):
    """
    This base class provides a method for getting a creator object serialized properly.
    This includes creating a serializer method field named creator that should match up with the underlying model
    being serialized (i.e. it should also have a creator model field).  This also includes writing a get_creator method
    that will be used to extract the creator from the model instance.
    """

    #: The creator field is a read-only serializer method field.  Internally the base class's to_representation
    #: method will call the get_creator method when serializing the object for output
    creator = serializers.SerializerMethodField()

    def get_creator(self, created_instance):
        """
        This worker function will get a creator from a class that has that field, or else return a blank string

        :param created_instance: A Python model object, or really any object that has a creator member variable - not a dict
        :return: A string, either the creator name or a blank string
        """
        if not created_instance.creator:
            return ''
        try:
            c = User.objects.get(pk=created_instance.creator.pk)
            return '%s %s' % (c.first_name, c.last_name)
        except User.DoesNotExist:
            return ''
