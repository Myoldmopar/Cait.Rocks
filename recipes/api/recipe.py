# -*- coding: utf-8 -*-
from django.http import JsonResponse
from rest_framework import mixins, status, viewsets

from recipes.models.recipe import Recipe
from recipes.serializers.recipe import RecipeSerializer


class RecipeViewSet(mixins.CreateModelMixin, viewsets.ReadOnlyModelViewSet):
    """
    This class provides the API get and retrieve views for the recipe objects.
    The class also uses the CreateModelMixin to provide the POST hook, and the create method is overridden to customize
    the creation step.  I think this should probably be moved to the serializer at some point
    """
    queryset = Recipe.objects.order_by('title')
    serializer_class = RecipeSerializer

    def create(self, request, *args, **kwargs):
        """
        The create method is overridden here to allow us to do two things: 1) verify the current user is logged in
        before allowing creation of a new calendar, and 2) assigning the creator attribute on the request to the
        currently logged in user before passing the data to the serializer.  The serializer should then handle
        grabbing the creator instance and assigning it to the newly created calendar.  I think there is something in
        there that would make this easier, like overriding the pre-save on the serializer or something.

        :param request: An http request
        :param args: Ordered arguments
        :param kwargs: Keyword arguments
        :return: JSONResponse with the created object or a failure message
        """
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
