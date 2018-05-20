var app = angular.module('cait_rocks_app');

app.controller('month_detail_controller', ['$scope', 'calendar_service', function ($scope, calendar_service) {
    'use strict';

    $scope.retrieve_calendars = function () {return calendar_service.retrieve_calendars($scope);};

    $scope.get_month_data = function () {return calendar_service.get_month_data($scope);};

    $scope.init = function () {
        $scope.days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.retrieve_calendars();
    };

}]);
