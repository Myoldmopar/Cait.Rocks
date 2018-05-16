# -*- coding: utf-8 -*-
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import action


class UserViewSet(viewsets.ViewSet):
    """
    This class provides the API get routine for the currently logged in user
    """

    @action(methods=['get'], detail=False)
    def current_user_id(self, request):
        current_user = request.user
        return JsonResponse({'id': current_user.id})
