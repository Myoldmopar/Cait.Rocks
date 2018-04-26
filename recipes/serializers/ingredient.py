from rest_framework import serializers
from recipes.models.ingredient import Ingredient


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = '__all__'
