var app = angular.module('cait_rocks_app');

app.controller('planner_controller', ['$scope', 'calendar_service', 'recipe_service', function ($scope, calendar_service, recipe_service) {
    'use strict';

    $scope.retrieve_recipes = function () {
        recipe_service.get_recipes().then(
            function (data) {
                $scope.recipe_list = data;
            }
        ).catch(function () {
            $scope.recipe_list = [];
        });
    };

    $scope.filter_table_rows = function () {
        // Declare variables
        var filter, table, tr, td, i, j, inner_a;
        filter = $scope.filterText.toUpperCase();
        table = document.getElementById('recipe_list_table');
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

    $scope.retrieve_calendars = function () {
        calendar_service.get_calendars().then(
            function (calendars_response) {
                if (calendars_response.length === 0) {
                    $scope.selected_calendar = null;
                    $scope.month = null;
                }
                $scope.allCalendars = calendars_response;
                $scope.selected_calendar = $scope.allCalendars[$scope.allCalendars.length - 1];
                $scope.get_month_data();
            }
        ).catch(function () {
            $scope.calendar_error_message = 'Could not get calendars through API; server broken?';
        });
    };

    $scope.get_month_data = function () {
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

    $scope.select_recipe_id = function (week_num, day_num, recipe_num, date_num) {
        var recipe_db_index = $scope.month.data[week_num][day_num]['recipe' + parseInt(recipe_num)].id;
        calendar_service.update_calendar_recipe_id($scope.selected_calendar.id, date_num, recipe_num, recipe_db_index).then(
            function (response) {
                $scope.get_month_data();
            }
        )
    };

    $scope.clear_recipe_id = function (week_num, day_num, recipe_num, date_num) {
        if ($scope.confirm_recipe_delete()) {
            calendar_service.update_calendar_recipe_id($scope.selected_calendar.id, date_num, recipe_num, 0).then(
                function (response) {
                    $scope.get_month_data();
                }
            ).catch(function () {
                $scope.calendar_error_message = 'Could not remove selected recipe!';
            });
        } else {
            // nothing should happen
        }
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
        calendar_service.post_calendar(this_year, this_month, this_name).then(
            $scope.retrieve_calendars
        ).catch(function () {
            $scope.calendar_error_message = 'Could not POST a calendar, not sure why';
        })
    };

    $scope.remove_calendar = function () {
        // check to make sure a calendar is selected
        if (!$scope.selected_calendar) {
            return;
        }
        if ($scope.confirm_calendar_delete()) {
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

    $scope.confirm_calendar_delete = function () {
        return confirm('Are you super sure you want to delete this calendar?  This is permanent!');
    };

    $scope.confirm_recipe_delete = function () {
        return confirm('Are you sure you want to clear this recipe?');
    };

    $scope.add_blank_recipe = function () {
        if (!$scope.blank_recipe_title) {
            $scope.calendar_error_message = 'Cannot add a blank recipe title!';
            return;
        }
        recipe_service.post_blank_recipe($scope.blank_recipe_title).then(
            function (response) {
                $scope.blank_recipe_title = '';
                $scope.retrieve_recipes();
            }
        ).catch(function () {
            $scope.calendar_error_message = 'Could not create a blank recipe!';
        })
    };

    $scope.init = function () {
        // use this init for pages where you need recipes, calendars, date, etc.
        $scope.filterText = '';
        $scope.blank_recipe_title = '';
        $scope.recipe_list = [];
        $scope.calendar_error_message = false;
        $scope.days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.retrieve_recipes();
        $scope.retrieve_calendars();
        $scope.set_models_to_today();
    };

}]);
