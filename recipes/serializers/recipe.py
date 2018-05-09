# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from rest_framework import serializers

from recipes.models.recipe import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    """
    This serializer allows direct serialization for recipe objects, with additional keys as needed
    """
    recipe_type = serializers.CharField(source='get_recipe_type_display')
    absolute_url = serializers.SerializerMethodField()
    creator = serializers.SerializerMethodField()
    ingredients = serializers.StringRelatedField(many=True)  # This is the most beautiful thing  # TODO: Do this more

    class Meta:
        model = Recipe
        fields = ('title', 'recipe_type', 'creator', 'absolute_url', 'ingredients')

    def get_absolute_url(self, recipe_instance):
        """
        This worker function enables us to append the absolute_url field to requests for Recipe model objects
        :param recipe_instance: A full recipe instance, we really just need the ID
        :return: The fully formed URL for this recipe instance
        """
        return recipe_instance.get_absolute_url()

    def get_creator(self, recipe_instance):
        if not recipe_instance.creator:
            return ""
        try:
            c = User.objects.get(pk=recipe_instance.creator.pk)
            return "%s %s" % (c.first_name, c.last_name)
        except User.DoesNotExist:
            return ""
