var app = angular.module('cait_rocks_app');

app.controller('months_controller', ['$scope', 'calendar_service', '$timeout', function ($scope, calendar_service, $timeout) {
    'use strict';

    $scope.init = function (potential_month_id) {
        $scope.days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.selected_month = false;
        $scope.loading_month_data = true;
        $scope.calendar_error_message = '';

        calendar_service.get_calendars().then(
            function (response) {
                $scope.all_months = response;
                /* istanbul ignore next */ // no way in HECK am I going to verify this actually scrolled
                if (potential_month_id) {
                    $timeout( // using $timeout here will force this callback to wait until the DOM is updated
                        function () {
                            var element = document.getElementById("month_row_" + potential_month_id);
                            if (element) {
                                element.scrollIntoView();
                                element.click();
                            } else {
                                $scope.calendar_error_message = 'Could not browse to month #' + potential_month_id;
                            }
                        }
                    )
                }
            }
        ).catch(function () {
            $scope.all_months = [];
            $scope.calendar_error_message = 'Could not retrieve recipes, is the server broken?'
        }).finally(function () {
            $scope.loading_month_data = false;
        });
    };

    $scope.select_a_month = function (month_id) {
        $scope.calendar_error_message = '';
        $scope.loading_month_data = true;
        calendar_service.get_calendar_monthly_data(month_id).then(
            function (date_response) {
                $scope.selected_month = date_response;
                $scope.num_weeks = date_response.num_weeks;
            }
        ).catch(function () {
            $scope.selected_month = null;
            $scope.calendar_error_message = 'Could not retrieve recipe, is the server broken?';
        }).finally(function () {
            $scope.loading_month_data = false;
        });
    };

}]);
