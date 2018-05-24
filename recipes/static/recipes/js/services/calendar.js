var app = angular.module('cait_rocks_app');

app.service('calendar_service', ['$http', function ($http) {
    'use strict';
    this.update_calendar_recipe_id = function (calendar_id, date_num, daily_recipe_id, recipe_pk) {
        return $http.put(
            '/planner/api/calendars/' + calendar_id + '/recipe_id/',
            {date_num: date_num, daily_recipe_id: daily_recipe_id, recipe_pk: recipe_pk}
        ).then(function (response) {
            return response.data;
        });
    };
    this.get_calendar_monthly_data = function (calendar_id) {
        return $http.get('/planner/api/calendars/' + calendar_id + '/monthly_data/').then(function (response) {
            return response.data;
        });
    };

    this.get_calendars = function () {
        return $http.get('/planner/api/calendars/').then(function (response) {
            return response.data;
        });
    };
    this.post_calendar = function (year, month, name, user_id) {
        return $http.post(
            '/planner/api/calendars/',
            {'nickname': name, 'year': year, 'month': month, 'creator_id': user_id}
        ).then(function (response) {
            return response.data;
        })
    };
    this.delete_calendar = function (calendar_id) {
        return $http.delete('/planner/api/calendars/' + calendar_id + '/').then(function (response) {
            return response.data;
        });
    };
    this.get_current_user = function () {
        return $http.get('/planner/api/users/current_user_id/').then(function (response) {
            return response.data;
        });
    };

    // this is not really a service method, but seems like some sort of "worker" method
    // not sure the best place for this, so it will live here for now

    this.confirm_calendar_delete = function () {
        return confirm('Are you super sure you want to delete this calendar?  This is permanent!');
    };

    // So the following functions are much better suited to live in the controller, as they act on the page scope
    // and maybe the document object itself.  But the code is used by two different controllers, and I wasn't sure
    // where I should drop that code so that each controller could use it.  I thought about extending the controller
    // but that seemed like a bit overkill.  I also thought about dropping the code into a standalone JS file, as
    // global functions, but that didn't seem right.  So here they are.  I'd love to move them if I can figure out
    // the right place to put them.

    this.retrieve_calendars = function ($scope) {
        this.get_calendars().then(
            function (calendars_response) {
                if (calendars_response.length === 0) {
                    return;
                }
                $scope.allCalendars = calendars_response;
                if ($scope.initialize_to_calendar) {
                    $scope.selected_calendar = $scope.allCalendars.find(function (month) {
                        return month.id === $scope.initialize_to_calendar
                    });
                } else {
                    $scope.selected_calendar = $scope.allCalendars[$scope.allCalendars.length - 1];
                }
                $scope.get_month_data();
            }
        ).catch(function () {
            $scope.calendar_error_message = 'Could not get calendars through API; server broken?';
        });
    };

    this.get_month_data = function ($scope) {
        if ($scope.selected_calendar) {
            this.get_calendar_monthly_data($scope.selected_calendar.id).then(
                function (date_response) {
                    $scope.month = date_response;
                    $scope.num_weeks = date_response.num_weeks;
                }
            ).catch(function () {
                $scope.calendar_error_message = 'Could not get monthly calendar data; server broken?';
            });
        } else {
            // nothing should really happen; I guess we could null out $scope variables
        }
    };
}]);
