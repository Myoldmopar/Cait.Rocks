# -*- coding: utf-8 -*-
from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin

from recipes.models.planning import Calendar, Recipe
from recipes.serializers.planning import CalendarSerializer
from recipes.serializers.recipe import RecipeSerializer


class CalendarViewSet(CreateModelMixin, DestroyModelMixin, viewsets.ReadOnlyModelViewSet):
    """
    This class provides the API get and retrieve views for the calendar month objects, plus two workers:
    - monthly_data, which is used to get the bulk data for a whole month
    - recipe_id, which is used to put the id onto a
    """
    # queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer

    def get_queryset(self):
        return Calendar.objects.filter(creator=self.request.user.id)

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
        calendar_serializer = CalendarSerializer(data=request.data)
        calendar_serializer.is_valid(raise_exception=True)
        calendar_instance = Calendar.objects.create(**request.data)
        calendar_serializer = CalendarSerializer(calendar_instance)
        return JsonResponse(calendar_serializer.data, status=status.HTTP_201_CREATED)

    @staticmethod
    def _get_recipe_data_or_none(date_data, recipe_string):
        if date_data[recipe_string]:
            recipe_serializer = RecipeSerializer(instance=date_data[recipe_string])
            return recipe_serializer.data
        else:
            return None

    @staticmethod
    def _get_object_by_pk(model_class, pk):
        try:
            c = model_class.objects.get(pk=pk)
            return {'success': True, 'object': c}
        except model_class.DoesNotExist:
            return_body = JsonResponse(
                {
                    'success': False,
                    'message': 'Cannot find object with pk=%s' % pk},
                status=status.HTTP_404_NOT_FOUND
            )
            return {'success': False, 'response': return_body}

    @action(methods=['get'], detail=True)
    def monthly_data(self, request, pk):
        """
        Creates a custom response on the API for getting monthly data, including date numbers, recipes, etc.
        :param request: A full django request object
        :param pk: The primary key for this particular calendar instance
        :return: A JSONResponse with two keys: data and num_weeks.
        - num_weeks returns the number of weeks in this month for convenience, either 4, 5 or 6
        - data is an array of 4, 5, or 6 items, with each item being weekly data.  Each weekly data item is an array of
        7 items, with each item being daily data.  Each daily data item is a dictionary containing keys date_number,
        recipe0, recipe0title, recipe1, and recipe1title.  The date_number key can be "-" to represent this day doesn't
        belong in the current month.  The recipe0 and recipe1 keys are ids to recipe objects in the database.  The
        recipe0title and recipe1title keys are simply the recipe titles for convenience.
        """
        data = self._get_object_by_pk(Calendar, pk)
        if not data['success']:
            return data['response']
        c = data['object']
        dates = c.get_monthly_data()
        weekly_data = []
        for week_num, week_dates in enumerate(dates):
            daily_data = []
            for day_num, date_data in enumerate(week_dates):
                date_number = '-'
                if date_data['date_number'] > 0:
                    date_number = date_data['date_number']
                daily_data.append(
                    {
                        'date_number': date_number,
                        'recipe0': self._get_recipe_data_or_none(date_data, 'recipe0'),
                        'recipe1': self._get_recipe_data_or_none(date_data, 'recipe1'),
                    }
                )
            weekly_data.append(daily_data)
        return JsonResponse({'num_weeks': len(dates), 'data': weekly_data})

    @staticmethod
    def _validate_recipe_id_request_body(request_data):
        # Validate body first
        for required_key in ['date_num', 'daily_recipe_id', 'recipe_pk']:
            if required_key not in request_data:
                return {'success': False, 'response': JsonResponse({
                    'success': False,
                    'message': 'Missing %s key in recipe_id body' % required_key
                }, status=status.HTTP_400_BAD_REQUEST)}
            try:
                int(request_data[required_key])
            except (ValueError, TypeError):
                return {'success': False, 'response': JsonResponse({
                    'success': False,
                    'message': 'Could not convert %s to float; value: %s' % (required_key, request_data[required_key])
                }, status=status.HTTP_400_BAD_REQUEST)}
        return {'success': True}

    @action(methods=['put'], detail=True)
    def recipe_id(self, request, pk):
        """
        Sets the recipe for this particular calendar date and recipe id
        Expects three parameters on the request body: date_num (1-31), daily_recipe_id (0 or 1), and recipe_pk
        If recipe_pk is 0, that indicates this recipe item should be cleared
        :param request: A full django request object
        :param pk: The primary key of the calendar to modify
        :return: A JSONResponse object with keys success and message.  The status code will also be set accordingly
        """
        validate_query = self._validate_recipe_id_request_body(request.data)
        if not validate_query['success']:
            return validate_query['response']
        date_num = int(request.data['date_num'])
        day_recipe_num = int(request.data['daily_recipe_id'])
        recipe_id = int(request.data['recipe_pk'])

        # Now read items off of the database
        if recipe_id == 0:
            recipe_to_assign = None
        else:
            recipe_query = self._get_object_by_pk(Recipe, recipe_id)
            if not recipe_query['success']:
                return recipe_query['response']
            recipe_to_assign = recipe_query['object']
        calendar_query = self._get_object_by_pk(Calendar, pk)
        if not calendar_query['success']:
            return calendar_query['response']
        calendar_to_modify = calendar_query['object']

        # Now get a two-digit date number so we can lookup a member variable, and set that variable using Python voodoo
        day_string = '%02d' % date_num
        variable_name = 'day{0}recipe{1}'.format(day_string, day_recipe_num)
        if not hasattr(calendar_to_modify, variable_name):
            return_dict = {'success': False, 'message': 'Cannot locate field %s, date out of range?' % variable_name}
            return_status = status.HTTP_400_BAD_REQUEST
        else:
            setattr(calendar_to_modify, variable_name, recipe_to_assign)
            calendar_to_modify.save()
            if recipe_id == 0:
                message = 'Cleared recipe for %s' % variable_name
            else:
                message = 'Set {0} to {1}'.format(variable_name, recipe_to_assign.title)
            return_dict = {'success': True, 'message': message}
            return_status = status.HTTP_200_OK
        return JsonResponse(return_dict, status=return_status)
