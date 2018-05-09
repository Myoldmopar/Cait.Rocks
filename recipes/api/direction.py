# -*- coding: utf-8 -*-
from rest_framework import viewsets

from recipes.models.direction import Direction
from recipes.serializers.direction import DirectionSerializer


class DirectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This class provides the API get and retrieve views for the direction objects
    """
    queryset = Direction.objects.all()
    serializer_class = DirectionSerializer
