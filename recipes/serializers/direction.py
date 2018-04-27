# -*- coding: utf-8 -*-
from rest_framework import serializers
from recipes.models.direction import Direction


class DirectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Direction
        fields = '__all__'
