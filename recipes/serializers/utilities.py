# -*- coding: utf-8 -*-
from django.contrib.auth.models import User


def get_creator_from_object(created_instance):
    """
    This worker function is defined here in utilities to allow each serializer to reuse this code.  This function takes
    an existing model instance that has a "creator" field on it, and looks up a string representation of that creator.
    :param created_instance: Instance of a model with a creator attribute
    :return: A string representation of that creator
    """
    if not created_instance.creator:
        return ''
    try:
        c = User.objects.get(pk=created_instance.creator.pk)
        return '%s %s' % (c.first_name, c.last_name)
    except User.DoesNotExist:
        return ''
