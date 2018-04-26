from rest_framework import serializers
from recipes.models.recipe import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    recipe_type = serializers.CharField(source='get_recipe_type_display')

    class Meta:
        model = Recipe
        fields = '__all__'
