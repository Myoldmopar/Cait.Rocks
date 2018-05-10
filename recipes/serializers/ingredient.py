# -*- coding: utf-8 -*-
from rest_framework import serializers

from recipes.models.ingredient import Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    """
    This serializer allows direct serialization for ingredient objects, with additional keys for choice fields
    """
    amount = serializers.CharField(source='get_amount_display')
    measurement = serializers.CharField(source='get_measurement_display')

    class Meta:
        model = Ingredient
        fields = '__all__'
