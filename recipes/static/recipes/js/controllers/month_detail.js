var app = angular.module('cait_rocks_app');

app.controller('month_detail_controller', ['$scope', 'calendar_service', function ($scope, calendar_service) {
    'use strict';

    $scope.get_month_data = function ($scope) {
        if ($scope.selected_calendar) {
            calendar_service.get_calendar_monthly_data($scope.selected_calendar.id).then(
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

    $scope.retrieve_calendar = function (calendar_id) {
        calendar_service.get_calendar(calendar_id).then(
            function (calendar_response) {
                $scope.selected_calendar = calendar_response;
                $scope.get_month_data();
            }
        ).catch(function () {
            $scope.calendar_error_message = 'Could not get calendars through API; server broken?';
        });
    };

    $scope.init = function () {
        $scope.days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    };

}]);
