from rest_framework import viewsets

from recipes.models.direction import Direction
from recipes.serializers.direction import DirectionSerializer


class DirectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Direction.objects.all()
    serializer_class = DirectionSerializer
