// create an angular module to hold everything for this page
// note to self, if we split things across JS files, calling angular.module with just a name won't create a new app
var app = angular.module('caitRocksApp', ['ngAnimate', 'mgcrea.ngStrap']);

// configure the module to use a different template interpolation sequence to avoid conflicting with Django
app.config(function ($interpolateProvider) {
    "use strict";
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

// configure the module to perform C.S.R.F. operations nicely with Django
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

app.factory('calendarService', ['$http', function ($http) {
    var calendar_factory = {};
    calendar_factory.update_calendar_recipe_id = function (calendar_id, date_num, daily_recipe_id, recipe_pk) {
        return $http.put(
            '/planner/api/calendars/' + calendar_id + '/recipe_id/',
            {date_num: date_num, daily_recipe_id: daily_recipe_id, recipe_pk: recipe_pk}
        ).then(function (response) {
            return response.data;
        });
    };
    calendar_factory.get_calendar_monthly_data = function (calendar_id) {
        return $http.get('/planner/api/calendars/' + calendar_id + '/monthly_data/');
    };

    calendar_factory.get_calendars = function () {
        return $http.get('/planner/api/calendars/');
    };
    calendar_factory.post_calendar = function (year, month, name) {
        return $http.post(
            '/planner/api/calendars/',
            {'nickname': name, 'year': year, 'month': month}
        )
    };
    return calendar_factory;
}]);

app.factory('recipeService', ['$http', function ($http) {
    var recipe_factory = {};

    recipe_factory.get_recipes = function () {
        return $http.get('/planner/api/recipes/');
    };
    return recipe_factory;
}]);

// create a controller containing functions and variables made available in the controller's scope
app.controller('caitRocksController', ['$scope', '$http', 'calendarService', 'recipeService', function ($scope, $http, calendar_service, recipe_service) {
    "use strict";

    // Variables and functions for the E+ task section
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
        table = document.getElementById("recipeListTable");
        tr = table.getElementsByTagName("tr");

        // TODO: Keep recipe title and ingredient list in hidden table column so we can search that column

        // make sure all rows are shown first
        for (i = 0; i < tr.length; i++) {
            tr[i].style.display = "";
        }

        // leave early with everything shown if the search string is too short
        if (filter.length < 2) {
            return;
        }

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 1; i < tr.length; i++) {

            // initialize to false and only show if we get a match
            var show_this_row = false;

            // we will check each token of the search string
            var tokens_to_check = filter.split(' ');

            for (j = 0; j < tokens_to_check.length; j++) {
                var token = tokens_to_check[j];
                var token_found = false;
                // check the title of the recipe
                td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                    inner_a = td.getElementsByTagName("a")[0]; // Add error handling in case this doesn't have any a elements
                    if (inner_a.innerHTML.toUpperCase().indexOf(token) > -1) {
                        token_found = true;
                    }
                }
                // check the author of the recipe
                if (!token_found) {
                    td = tr[i].getElementsByTagName("td")[2];
                    if (td) {
                        if (td.innerHTML.toUpperCase().indexOf(token) > -1) {
                            token_found = true;
                        }
                    }
                }
                if (!token_found) {
                    // check the ingredients of the recipe
                    td = tr[i].getElementsByTagName("td")[3];
                    if (td) {
                        if (td.innerHTML.toUpperCase().indexOf(token) > -1) {
                            token_found = true;
                        }
                    }
                }
                tokens_to_check[j] = token_found;
            }

            // now turn that one
            if (tokens_to_check.every(function(t){return t;})) {
                // woohoo we have a match! leave it shown
            } else {
                tr[i].style.display = "none";
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
                $scope.allCalendars = calendars_response.data;
                if ($scope.allCalendars.length !== 0) {
                    if ($scope.initialize_to_calendar) {
                        $scope.selectedCalendar = $scope.allCalendars.find(function (month) {
                            return month.id === $scope.initialize_to_calendar
                        });
                    } else {
                        $scope.selectedCalendar = $scope.allCalendars[$scope.allCalendars.length - 1];
                    }
                    $scope.get_month_data();
                }
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
        }
    };

    $scope.$on('$typeahead.select', function (event, value, index, elem) {
        // would be nicer to just store the index on the object itself instead
        var meta_data = document.getElementById(elem.$id).dataset;
        var week_num = meta_data['weeknum'];
        var date_num = meta_data['daynum'];
        var day_recipe_num = meta_data['recipenum'];
        var date_in_month = $scope.month.data[week_num][date_num].date_number;
        calendar_service.update_calendar_recipe_id($scope.selectedCalendar.id, date_in_month, day_recipe_num, value).then(
            function (response) {
                $scope.get_month_data();
            }
        )
    });

    $scope.add_calendar = function () {
        var this_year = $scope.calendar_year;
        // TODO: Validate the year/month, make the HTML inputs a choice field
        var this_month = $scope.calendar_month;
        var this_name = $scope.calendar_name;
        calendar_service.post_calendar(this_year, this_month, this_name).then(
            $scope.get_calendars
        )
    };

    // some hardcoded values
    $scope.days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // things to do during page initialization
    $scope.filterText = '';
    $scope.recipe_list = [];
    $scope.retrieve_recipes();
    $scope.get_calendars();

}]);
