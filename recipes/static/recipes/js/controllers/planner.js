var app = angular.module('cait_rocks_app');

// create a controller containing functions and variables made available in the controller's scope
app.controller('planner_controller', ['$scope', 'calendar_service', 'recipe_service', function ($scope, calendar_service, recipe_service) {
    'use strict';

    $scope.retrieve_recipes = function () {
        recipe_service.get_recipes().then(
            function (response) {
                $scope.recipe_list = response.data;
            }
        );
    };

    $scope.filter_table_rows = function () {
        // Declare variables
        var filter, table, tr, td, i, j, inner_a;
        filter = $scope.filterText.toUpperCase();
        table = document.getElementById('recipeListTable');
        tr = table.getElementsByTagName('tr');

        // make sure all rows are shown first
        for (i = 0; i < tr.length; i++) {
            tr[i].style.display = '';
        }

        // leave early with everything shown if the search string is too short
        if (filter.length < 2) {
            return;
        }

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 1; i < tr.length; i++) {

            // we will check each token of the search string
            var tokens_to_check = filter.split(' ');

            for (j = 0; j < tokens_to_check.length; j++) {
                var token = tokens_to_check[j];
                var token_found = false;
                // check the title of the recipe
                td = tr[i].getElementsByTagName('td')[1];
                inner_a = td.getElementsByTagName('a')[0];
                if (inner_a.innerHTML.toUpperCase().indexOf(token) > -1) {
                    token_found = true;
                }
                // check the author of the recipe
                if (!token_found) {
                    td = tr[i].getElementsByTagName('td')[2];
                    if (td.innerHTML.toUpperCase().indexOf(token) > -1) {
                        token_found = true;
                    }
                }
                if (!token_found) {
                    // check the ingredients of the recipe
                    td = tr[i].getElementsByTagName('td')[3];
                    if (td.innerHTML.toUpperCase().indexOf(token) > -1) {
                        token_found = true;
                    }
                }
                tokens_to_check[j] = token_found;
            }

            // now turn that one
            if (tokens_to_check.every(function (t) {
                    return t;
                })) {
                // woo-hoo we have a match! leave it shown
            } else {
                tr[i].style.display = 'none';
            }
        }
    };

    $scope.clear_filter = function () {
        $scope.filterText = '';
        $scope.filter_table_rows();
    };

    $scope.get_calendars = function () {
        calendar_service.get_calendars().then(
            function (calendars_response) {
                if (calendars_response.data.length === 0) {
                    return;
                }
                $scope.allCalendars = calendars_response.data;
                if ($scope.initialize_to_calendar) {
                    $scope.selectedCalendar = $scope.allCalendars.find(function (month) {
                        return month.id === $scope.initialize_to_calendar
                    });
                } else {
                    $scope.selectedCalendar = $scope.allCalendars[$scope.allCalendars.length - 1];
                }
                $scope.get_month_data();
            }
        );
    };

    $scope.get_month_data = function () {
        if ($scope.selectedCalendar) {
            calendar_service.get_calendar_monthly_data($scope.selectedCalendar.id).then(
                function (date_response) {
                    $scope.month = date_response.data;
                    $scope.num_weeks = date_response.data.num_weeks;
                }
            );
        } else {
            // nothing should really happen; I guess we could null out $scope variables
        }
    };

    $scope.select_recipe_id = function (week_num, day_num, recipe_num, date_num) {
        var recipe_db_index = $scope.month.data[week_num][day_num]['recipe' + parseInt(recipe_num)].id;
        calendar_service.update_calendar_recipe_id($scope.selectedCalendar.id, date_num, recipe_num, recipe_db_index).then(
            function (response) {
                $scope.get_month_data();
            }
        )
    };

    $scope.clear_recipe_id = function (week_num, day_num, recipe_num, date_num) {
        calendar_service.update_calendar_recipe_id($scope.selectedCalendar.id, date_num, recipe_num, 0).then(
            function (response) {
                $scope.get_month_data();
            }
        )
    };

    $scope.clear_cal_error = function () {
        $scope.add_calendar_error_message = false;
    };

    $scope.add_calendar = function () {
        $scope.add_calendar_error_message = false;
        var int_calendar_year = parseInt($scope.calendar_year);
        var error = false;
        if (isNaN(int_calendar_year)) {
            $scope.add_calendar_error_message = 'Could not convert calendar_year to an integer, can\'t add calendar';
            error = true;
        }
        if (int_calendar_year < 2018 || int_calendar_year > 2025) {
            $scope.add_calendar_error_message = 'You tried to use an out of range year; use 2018-2025';
            error = true;
        }
        var int_calendar_month = parseInt($scope.calendar_month);
        if (isNaN(int_calendar_month)) {
            $scope.add_calendar_error_message = 'Could not convert calendar_month to an integer, can\'t add calendar';
            error = true;
        }
        if (int_calendar_month < 1 || int_calendar_month > 12) {
            $scope.add_calendar_error_message = 'You tried to use an out of range month; use 1-12';
            error = true;
        }
        if ($scope.calendar_name === '' || $scope.calendar_name === undefined || $scope.calendar_name === null) {
            $scope.add_calendar_error_message = 'You can\'t have a blank calendar name!';
            error = true;
        }
        if (error) return;
        var this_year = $scope.calendar_year;
        var this_month = $scope.calendar_month;
        var this_name = $scope.calendar_name;
        calendar_service.get_current_user().then(
            function (response) {
                calendar_service.post_calendar(this_year, this_month, this_name, response.data.id).then(
                    $scope.get_calendars
                )
            }
        )
    };

    $scope.remove_calendar = function () {
        // check to make sure a calendar is selected
        if (!$scope.selectedCalendar) {
            return;
        }
        if (calendar_service.confirm_calendar_delete()) {
            calendar_service.delete_calendar($scope.selectedCalendar.id).then(
                function (response) {
                    $scope.selectedCalendar = null;
                    $scope.get_calendars();
                }
            );
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

    var init = function () {
        // use this init for pages where you need recipes, calendars, date, etc.
        $scope.filterText = '';
        $scope.recipe_list = [];
        $scope.add_calendar_error_message = false;
        $scope.days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.retrieve_recipes();
        $scope.get_calendars();
        $scope.set_models_to_today();
    };

    init();

}]);
