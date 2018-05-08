// create an angular module to hold everything for this page
// note to self, if we split things across JS files, calling angular.module with just a name won't create a new app
var app = angular.module('recipeApp', ['ngAnimate', 'mgcrea.ngStrap']);

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

app.factory('recipeService', ['$http', function ($http) {
    var recipe_factory = {};
    recipe_factory.update_recipe = function (calendar_id, date_num, daily_recipe_id, recipe_pk) {
        return $http.put(
            '/api/calendars/' + calendar_id + '/recipe_id/',
            {date_num: date_num, daily_recipe_id: daily_recipe_id, recipe_pk: recipe_pk}
        ).then(function (response) {
            return response.data;
        });
    };
    recipe_factory.get_monthly_data = function (calendar_id) {
        return $http.get('/api/calendars/' + calendar_id + '/monthly_dates/');
    };
    recipe_factory.get_recipes = function () {
        return $http.get('/api/recipes/');
    };
    recipe_factory.get_calendars = function () {
        return $http.get('/api/calendars/');
    };
    recipe_factory.post_calendar = function (year, month, name) {
        return $http.post(
            '/api/calendars/',
            {'nickname': name, 'year': year, 'month': month}
        )
    };
    return recipe_factory;
}]);

// create a controller containing functions and variables made available in the controller's scope
app.controller('recipeController', ['$scope', '$http', 'recipeService', function ($scope, $http, recipeService) {
    "use strict";

    // Variables and functions for the E+ task section
    $scope.retrieve_recipes = function () {
        recipeService.get_recipes().then(
            function (response) {
                $scope.recipe_list = response.data;
            }
        );
    };

    $scope.filter_table_rows = function () {
        // Declare variables
        var filter, table, tr, td, i, inner_a;
        filter = $scope.filterText.toUpperCase();
        table = document.getElementById("recipeListTable");
        tr = table.getElementsByTagName("tr");

        // TODO: Keep recipe title and ingredient list in hidden table column so we can search that column
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1]; // Change this for a different column, really I just want to search the whole recipe maybe...
            if (td) {
                inner_a = td.getElementsByTagName("a")[0]; // Add error handling in case this doesn't have any a elements
                if (inner_a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    };

    $scope.clear_filter = function () {
        $scope.filterText = '';
        $scope.filter_table_rows();
    };

    $scope.get_calendars = function () {
        recipeService.get_calendars().then(
            function (calendars_response) {
                $scope.allCalendars = calendars_response.data;
                if ($scope.allCalendars.length !== 0) {
                    $scope.selectedCalendar = $scope.allCalendars[$scope.allCalendars.length-1];
                    $scope.get_month_data();
                }
            }
        );
    };

    $scope.get_month_data = function () {
        if ($scope.selectedCalendar) {
            recipeService.get_monthly_data($scope.selectedCalendar.id).then(
                function (date_response) {
                    $scope.monthly_data = date_response.data;
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
        var date_in_month = $scope.monthly_data.array_data[week_num][date_num].date_number;
        recipeService.update_recipe($scope.selectedCalendar.id, date_in_month, day_recipe_num, value).then(
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
        recipeService.post_calendar(this_year, this_month, this_name).then(
            $scope.get_calendars
        )
    };

    // things to do during page initialization
    $scope.filterText = '';
    $scope.recipe_list = [];
    $scope.retrieve_recipes();
    $scope.get_calendars();

}]);
