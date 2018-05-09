# -*- coding: utf-8 -*-
from rest_framework import serializers

from recipes.models.recipe import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    """
    This serializer allows direct serialization for recipe objects, with additional keys for choice fields
    """
    recipe_type = serializers.CharField(source='get_recipe_type_display')
    absolute_url = serializers.SerializerMethodField()

    def get_absolute_url(self, recipe_instance):
        """
        This worker function enables us to append the absolute_url field to requests for Recipe model objects
        :param recipe_instance: A full recipe instance, we really just need the ID
        :return: The fully formed URL for this recipe instance
        """
        return recipe_instance.get_absolute_url()

    class Meta:
        model = Recipe
        fields = '__all__'
