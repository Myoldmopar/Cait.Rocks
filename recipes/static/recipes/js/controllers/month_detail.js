var app = angular.module('cait_rocks_app');

app.controller('month_detail_controller', ['$scope', 'calendar_service', function ($scope, calendar_service) {
    'use strict';

    $scope.get_calendars = function () {
        calendar_service.get_calendars().then(
            function (calendars_response) {
                if (calendars_response.data.length === 0) {
                    return;
                }
                $scope.allCalendars = calendars_response.data;
                if ($scope.initialize_to_calendar) {
                    $scope.selected_calendar = $scope.allCalendars.find(function (month) {
                        return month.id === $scope.initialize_to_calendar
                    });
                } else {
                    $scope.selected_calendar = $scope.allCalendars[$scope.allCalendars.length - 1];
                }
                $scope.get_month_data();
            }
        );
    };

    $scope.get_month_data = function () {
        if ($scope.selected_calendar) {
            calendar_service.get_calendar_monthly_data($scope.selected_calendar.id).then(
                function (date_response) {
                    $scope.month = date_response.data;
                    $scope.num_weeks = date_response.data.num_weeks;
                }
            );
        } else {
            // nothing should really happen; I guess we could null out $scope variables
        }
    };

    $scope.init = function () {
        $scope.days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.get_calendars();
    };

}]);
