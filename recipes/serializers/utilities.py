# -*- coding: utf-8 -*-
from django.contrib.auth.models import User


def get_creator_from_object(created_instance):
    if not created_instance.creator:
        return ''
    try:
        c = User.objects.get(pk=created_instance.creator.pk)
        return '%s %s' % (c.first_name, c.last_name)
    except User.DoesNotExist:
        return ''
