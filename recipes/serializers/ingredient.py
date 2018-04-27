from rest_framework import serializers
from recipes.models.ingredient import Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    amount = serializers.CharField(source='get_amount_display')
    measurement = serializers.CharField(source='get_measurement_display')

    class Meta:
        model = Ingredient
        fields = '__all__'
