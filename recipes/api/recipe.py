# -*- coding: utf-8 -*-
from django.http import JsonResponse
from rest_framework import mixins, status, viewsets

from recipes.models.recipe import Recipe
from recipes.serializers.recipe import RecipeSerializer


class RecipeViewSet(mixins.CreateModelMixin, viewsets.ReadOnlyModelViewSet):
    """
    This class provides the API get and retrieve views for the recipe objects
    """
    queryset = Recipe.objects.order_by('title')
    serializer_class = RecipeSerializer

    def create(self, request, *args, **kwargs):
        if request.user.is_anonymous:
            return JsonResponse(
                {
                    'status': 'failed',
                    'message': 'Must be logged in to create calendar!'
                },
                status=status.HTTP_403_FORBIDDEN
            )
        request.data['creator'] = request.user
        recipe_serializer = RecipeSerializer(data=request.data)
        recipe_serializer.is_valid(raise_exception=True)
        recipe_instance = Recipe.objects.create(**request.data)
        recipe_serializer = RecipeSerializer(recipe_instance)
        return JsonResponse(recipe_serializer.data, status=status.HTTP_201_CREATED)
