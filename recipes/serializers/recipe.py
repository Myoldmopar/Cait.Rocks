# -*- coding: utf-8 -*-
from rest_framework import serializers

from recipes.models.recipe import Recipe
from recipes.serializers.utilities import get_creator_from_object


class RecipeSerializer(serializers.ModelSerializer):
    """
    This serializer allows direct serialization for recipe objects, with additional keys as needed
    """
    recipe_type = serializers.CharField(source='get_recipe_type_display', read_only=True)

    ingredients = serializers.StringRelatedField(many=True, required=False)

    absolute_url = serializers.SerializerMethodField()
    creator = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ('id', 'title', 'recipe_type', 'creator', 'absolute_url', 'ingredients', 'directions', 'image')

    def get_absolute_url(self, recipe_instance):
        """
        This worker function enables us to append the absolute_url field to requests for Recipe model objects
        :param recipe_instance: A full recipe instance, we really just need the ID
        :return: The fully formed URL for this recipe instance
        """
        return recipe_instance.get_absolute_url()

    def get_creator(self, recipe_instance):
        return get_creator_from_object(recipe_instance)
