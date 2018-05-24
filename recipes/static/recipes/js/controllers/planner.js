var app = angular.module('cait_rocks_app');

app.controller('planner_controller', ['$scope', 'calendar_service', 'recipe_service', function ($scope, calendar_service, recipe_service) {
    'use strict';

    $scope.retrieve_recipes = function () {return recipe_service.retrieve_recipes($scope);};

    $scope.filter_table_rows = function () {return recipe_service.filter_table_rows($scope);};

    $scope.clear_filter = function () {return recipe_service.clear_filter($scope)};

    $scope.retrieve_calendars = function () {return calendar_service.retrieve_calendars($scope);};

    $scope.get_month_data = function () {return calendar_service.get_month_data($scope);};

    $scope.select_recipe_id = function (week_num, day_num, recipe_num, date_num) {
        var recipe_db_index = $scope.month.data[week_num][day_num]['recipe' + parseInt(recipe_num)].id;
        calendar_service.update_calendar_recipe_id($scope.selected_calendar.id, date_num, recipe_num, recipe_db_index).then(
            function (response) {
                $scope.get_month_data();
            }
        )
    };

    $scope.clear_recipe_id = function (week_num, day_num, recipe_num, date_num) {
        calendar_service.update_calendar_recipe_id($scope.selected_calendar.id, date_num, recipe_num, 0).then(
            function (response) {
                $scope.get_month_data();
            }
        )
    };

    $scope.clear_cal_error = function () {
        $scope.calendar_error_message = false;
    };

    $scope.add_calendar = function () {
        $scope.calendar_error_message = false;
        var int_calendar_year = parseInt($scope.calendar_year);
        var error = false;
        if (isNaN(int_calendar_year)) {
            $scope.calendar_error_message = 'Could not convert calendar_year to an integer, can\'t add calendar';
            error = true;
        }
        if (int_calendar_year < 2018 || int_calendar_year > 2025) {
            $scope.calendar_error_message = 'You tried to use an out of range year; use 2018-2025';
            error = true;
        }
        var int_calendar_month = parseInt($scope.calendar_month);
        if (isNaN(int_calendar_month)) {
            $scope.calendar_error_message = 'Could not convert calendar_month to an integer, can\'t add calendar';
            error = true;
        }
        if (int_calendar_month < 1 || int_calendar_month > 12) {
            $scope.calendar_error_message = 'You tried to use an out of range month; use 1-12';
            error = true;
        }
        if ($scope.calendar_name === '' || $scope.calendar_name === undefined || $scope.calendar_name === null) {
            $scope.calendar_error_message = 'You can\'t have a blank calendar name!';
            error = true;
        }
        if (error) return;
        var this_year = $scope.calendar_year;
        var this_month = $scope.calendar_month;
        var this_name = $scope.calendar_name;
        calendar_service.get_current_user().then( // I don't think we need this right?
            function (response) {
                calendar_service.post_calendar(this_year, this_month, this_name, response.id).then(
                    $scope.retrieve_calendars
                ).catch(function () {
                    $scope.calendar_error_message = 'Could not POST a calendar, not sure why';
                })
            }
        ).catch(function () {
            $scope.calendar_error_message = 'Could not get current user, are you somehow not logged in?';
        })
    };

    $scope.remove_calendar = function () {
        // check to make sure a calendar is selected
        if (!$scope.selected_calendar) {
            return;
        }
        if (calendar_service.confirm_calendar_delete()) {
            calendar_service.delete_calendar($scope.selected_calendar.id).then(
                function (response) {
                    $scope.selected_calendar = null;
                    $scope.retrieve_calendars();
                }
            ).catch(function () {
                $scope.calendar_error_message = 'Could not delete currently selected calendar!';
            });
        } else {
            // nothing should happen
        }
    };

    $scope.set_models_to_today = function () {
        var now = new Date();
        $scope.calendar_month = now.getMonth() + 1;
        $scope.calendar_year = now.getFullYear();
        $scope.calendar_date = now.getDate();
    };

    $scope.init = function () {
        // use this init for pages where you need recipes, calendars, date, etc.
        $scope.filterText = '';
        $scope.recipe_list = [];
        $scope.calendar_error_message = false;
        $scope.days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.retrieve_recipes();
        $scope.retrieve_calendars();
        $scope.set_models_to_today();
    };

}]);
