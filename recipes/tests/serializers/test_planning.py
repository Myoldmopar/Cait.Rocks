# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from django.test import TestCase

from recipes.models.planning import Calendar
from recipes.serializers.planning import CalendarSerializer


class PlanningSerializerTests(TestCase):

    def test_planning_creator_method_empty(self):
        calendar_attributes = {
            'nickname': 'Month TITLE',
            'year': 2018,
            'month': 2,
        }
        calendar_object = Calendar.objects.create(**calendar_attributes)
        calendar_serializer = CalendarSerializer(instance=calendar_object)
        creator = calendar_serializer.get_creator(calendar_object)
        self.assertEqual(creator, '')

    def test_planning_creator_method_valid(self):
        u = User.objects.create_user(username="dummy", password="pass", first_name="A", last_name="B")
        calendar_attributes = {
            'nickname': 'Month TITLE',
            'year': 2018,
            'month': 2,
            'creator': u
        }
        calendar_object = Calendar.objects.create(**calendar_attributes)
        calendar_serializer = CalendarSerializer(instance=calendar_object)
        creator = calendar_serializer.get_creator(calendar_object)
        self.assertEqual(creator, 'A B')

    def test_planning_creator_method_not_in_db(self):
        u = User.objects.create_user(username="dummy", password="pass", first_name="A", last_name="B")
        calendar_attributes = {
            'nickname': 'Month TITLE',
            'year': 2018,
            'month': 2,
            'creator': u
        }
        calendar_object = Calendar.objects.create(**calendar_attributes)
        calendar_serializer = CalendarSerializer(instance=calendar_object)
        u.delete()
        creator = calendar_serializer.get_creator(calendar_object)
        self.assertEqual(creator, '')
