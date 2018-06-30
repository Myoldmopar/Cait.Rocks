# -*- coding: utf-8 -*-
from django.contrib.auth.models import User


def get_creator_from_object(created_instance):
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
