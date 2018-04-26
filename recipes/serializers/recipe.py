from rest_framework import serializers
from recipes.models.recipe import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    recipe_type = serializers.CharField(source='get_recipe_type_display')
    absolute_url = serializers.SerializerMethodField()

    def get_absolute_url(self, recipe_instance):
        return recipe_instance.get_absolute_url()

    class Meta:
        model = Recipe
        fields = '__all__'
