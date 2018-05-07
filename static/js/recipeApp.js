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
    return recipe_factory;
}]);

// create a controller containing functions and variables made available in the controller's scope
app.controller('recipeController', ['$scope', '$http', 'recipeService', function ($scope, $http, recipeService) {
    "use strict";

    // Variables and functions for the E+ task section
    $scope.retrieve_recipes = function () {
        return $http.get('/api/recipes/').then(
            function (response) {
                $scope.recipe_list = response.data;
            }
        );
    };

    $scope.filterTableRows = function () {
        // Declare variables
        var filter, table, tr, td, i, inner_a;
        filter = $scope.filterText.toUpperCase();
        table = document.getElementById("recipeListTable");
        tr = table.getElementsByTagName("tr");

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

    $scope.clearFilter = function () {
        $scope.filterText = '';
        $scope.filterTableRows();
    };

    $scope.getCalendars = function () {
        $http.get('/api/calendars/').then(
            function (calendars_response) {
                $scope.allCalendars = calendars_response.data;
                if ($scope.allCalendars.length !== 0) {
                    $scope.selectedCalendar = $scope.allCalendars[0];
                    $scope.get_month_data();
                }
            }
        );
    };

    $scope.get_month_data = function () {
        if ($scope.selectedCalendar) {
            return $http.get('/api/calendars/' + $scope.selectedCalendar.id + '/monthly_dates/').then(
                function (date_response) {
                    $scope.monthly_data = date_response.data;
                    $scope.num_weeks = date_response.data.num_weeks;
                    $scope.refresh_recipe_variables();
                    console.log($scope.monthly_data);
                    console.log($scope.num_weeks);
                }
            );
        }
    };

    $scope.refresh_recipe_variables = function () {

        $scope.day00recipe00 = $scope.monthly_data.dates.d00.recipe01;
        $scope.day00recipe01 = $scope.monthly_data.dates.d00.recipe02;

        $scope.day01recipe00 = $scope.monthly_data.dates.d01.recipe01;
        $scope.day01recipe01 = $scope.monthly_data.dates.d01.recipe02;

        $scope.day02recipe00 = $scope.monthly_data.dates.d02.recipe01;
        $scope.day02recipe01 = $scope.monthly_data.dates.d02.recipe02;

        $scope.day03recipe00 = $scope.monthly_data.dates.d03.recipe01;
        $scope.day03recipe01 = $scope.monthly_data.dates.d03.recipe02;

        $scope.day04recipe00 = $scope.monthly_data.dates.d04.recipe01;
        $scope.day04recipe01 = $scope.monthly_data.dates.d04.recipe02;

        $scope.day05recipe00 = $scope.monthly_data.dates.d05.recipe01;
        $scope.day05recipe01 = $scope.monthly_data.dates.d05.recipe02;

        $scope.day06recipe00 = $scope.monthly_data.dates.d06.recipe01;
        $scope.day06recipe01 = $scope.monthly_data.dates.d06.recipe02;


        $scope.day10recipe00 = $scope.monthly_data.dates.d10.recipe01;
        $scope.day10recipe01 = $scope.monthly_data.dates.d10.recipe02;

        $scope.day11recipe00 = $scope.monthly_data.dates.d11.recipe01;
        $scope.day11recipe01 = $scope.monthly_data.dates.d11.recipe02;

        $scope.day12recipe00 = $scope.monthly_data.dates.d12.recipe01;
        $scope.day12recipe01 = $scope.monthly_data.dates.d12.recipe02;

        $scope.day13recipe00 = $scope.monthly_data.dates.d13.recipe01;
        $scope.day13recipe01 = $scope.monthly_data.dates.d13.recipe02;

        $scope.day14recipe00 = $scope.monthly_data.dates.d14.recipe01;
        $scope.day14recipe01 = $scope.monthly_data.dates.d14.recipe02;

        $scope.day15recipe00 = $scope.monthly_data.dates.d15.recipe01;
        $scope.day15recipe01 = $scope.monthly_data.dates.d15.recipe02;

        $scope.day16recipe00 = $scope.monthly_data.dates.d16.recipe01;
        $scope.day16recipe01 = $scope.monthly_data.dates.d16.recipe02;


        $scope.day20recipe00 = $scope.monthly_data.dates.d20.recipe01;
        $scope.day20recipe01 = $scope.monthly_data.dates.d20.recipe02;

        $scope.day21recipe00 = $scope.monthly_data.dates.d21.recipe01;
        $scope.day21recipe01 = $scope.monthly_data.dates.d21.recipe02;

        $scope.day22recipe00 = $scope.monthly_data.dates.d22.recipe01;
        $scope.day22recipe01 = $scope.monthly_data.dates.d22.recipe02;

        $scope.day23recipe00 = $scope.monthly_data.dates.d23.recipe01;
        $scope.day23recipe01 = $scope.monthly_data.dates.d23.recipe02;

        $scope.day24recipe00 = $scope.monthly_data.dates.d24.recipe01;
        $scope.day24recipe01 = $scope.monthly_data.dates.d24.recipe02;

        $scope.day25recipe00 = $scope.monthly_data.dates.d25.recipe01;
        $scope.day25recipe01 = $scope.monthly_data.dates.d25.recipe02;

        $scope.day26recipe00 = $scope.monthly_data.dates.d26.recipe01;
        $scope.day26recipe01 = $scope.monthly_data.dates.d26.recipe02;


        $scope.day30recipe00 = $scope.monthly_data.dates.d30.recipe01;
        $scope.day30recipe01 = $scope.monthly_data.dates.d30.recipe02;

        $scope.day31recipe00 = $scope.monthly_data.dates.d31.recipe01;
        $scope.day31recipe01 = $scope.monthly_data.dates.d31.recipe02;

        $scope.day32recipe00 = $scope.monthly_data.dates.d32.recipe01;
        $scope.day32recipe01 = $scope.monthly_data.dates.d32.recipe02;

        $scope.day33recipe00 = $scope.monthly_data.dates.d33.recipe01;
        $scope.day33recipe01 = $scope.monthly_data.dates.d33.recipe02;

        $scope.day34recipe00 = $scope.monthly_data.dates.d34.recipe01;
        $scope.day34recipe01 = $scope.monthly_data.dates.d34.recipe02;

        $scope.day35recipe00 = $scope.monthly_data.dates.d35.recipe01;
        $scope.day35recipe01 = $scope.monthly_data.dates.d35.recipe02;

        $scope.day36recipe00 = $scope.monthly_data.dates.d36.recipe01;
        $scope.day36recipe01 = $scope.monthly_data.dates.d36.recipe02;


        $scope.day40recipe00 = $scope.monthly_data.dates.d40.recipe01;
        $scope.day40recipe01 = $scope.monthly_data.dates.d40.recipe02;

        $scope.day41recipe00 = $scope.monthly_data.dates.d41.recipe01;
        $scope.day41recipe01 = $scope.monthly_data.dates.d41.recipe02;

        $scope.day42recipe00 = $scope.monthly_data.dates.d42.recipe01;
        $scope.day42recipe01 = $scope.monthly_data.dates.d42.recipe02;

        $scope.day43recipe00 = $scope.monthly_data.dates.d43.recipe01;
        $scope.day43recipe01 = $scope.monthly_data.dates.d43.recipe02;

        $scope.day44recipe00 = $scope.monthly_data.dates.d44.recipe01;
        $scope.day44recipe01 = $scope.monthly_data.dates.d44.recipe02;

        $scope.day45recipe00 = $scope.monthly_data.dates.d45.recipe01;
        $scope.day45recipe01 = $scope.monthly_data.dates.d45.recipe02;

        $scope.day46recipe00 = $scope.monthly_data.dates.d46.recipe01;
        $scope.day46recipe01 = $scope.monthly_data.dates.d46.recipe02;

    };

    // things to do during page initialization
    $scope.filterText = '';
    $scope.recipe_list = [];
    $scope.retrieve_recipes();
    $scope.getCalendars();

    $scope.$on('$typeahead.select', function (event, value, index, elem) {
        var week_date_recipe = null;
        switch (elem.$id) {
            case 'day00recipe00input':
                week_date_recipe = [0, 0, 0];
                break;
            case 'day00recipe01input':
                week_date_recipe = [0, 0, 1];
                break;
            case 'day01recipe00input':
                week_date_recipe = [0, 1, 0];
                break;
            case 'day01recipe01input':
                week_date_recipe = [0, 1, 1];
                break;
            case 'day02recipe00input':
                week_date_recipe = [0, 2, 0];
                break;
            case 'day02recipe01input':
                week_date_recipe = [0, 2, 1];
                break;
            case 'day03recipe00input':
                week_date_recipe = [0, 3, 0];
                break;
            case 'day03recipe01input':
                week_date_recipe = [0, 3, 1];
                break;
            case 'day04recipe00input':
                week_date_recipe = [0, 4, 0];
                break;
            case 'day04recipe01input':
                week_date_recipe = [0, 4, 1];
                break;
            case 'day05recipe00input':
                week_date_recipe = [0, 5, 0];
                break;
            case 'day05recipe01input':
                week_date_recipe = [0, 5, 1];
                break;
            case 'day06recipe00input':
                week_date_recipe = [0, 6, 0];
                break;
            case 'day06recipe01input':
                week_date_recipe = [0, 6, 1];
                break;
            case 'day10recipe00input':
                week_date_recipe = [1, 0, 0];
                break;
            case 'day10recipe01input':
                week_date_recipe = [1, 0, 1];
                break;
            case 'day11recipe00input':
                week_date_recipe = [1, 1, 0];
                break;
            case 'day11recipe01input':
                week_date_recipe = [1, 1, 1];
                break;
            case 'day12recipe00input':
                week_date_recipe = [1, 2, 0];
                break;
            case 'day12recipe01input':
                week_date_recipe = [1, 2, 1];
                break;
            case 'day13recipe00input':
                week_date_recipe = [1, 3, 0];
                break;
            case 'day13recipe01input':
                week_date_recipe = [1, 3, 1];
                break;
            case 'day14recipe00input':
                week_date_recipe = [1, 4, 0];
                break;
            case 'day14recipe01input':
                week_date_recipe = [1, 4, 1];
                break;
            case 'day15recipe00input':
                week_date_recipe = [1, 5, 0];
                break;
            case 'day15recipe01input':
                week_date_recipe = [1, 5, 1];
                break;
            case 'day16recipe00input':
                week_date_recipe = [1, 6, 0];
                break;
            case 'day16recipe01input':
                week_date_recipe = [1, 6, 1];
                break;
            case 'day20recipe00input':
                week_date_recipe = [2, 0, 0];
                break;
            case 'day20recipe01input':
                week_date_recipe = [2, 0, 1];
                break;
            case 'day21recipe00input':
                week_date_recipe = [2, 1, 0];
                break;
            case 'day21recipe01input':
                week_date_recipe = [2, 1, 1];
                break;
            case 'day22recipe00input':
                week_date_recipe = [2, 2, 0];
                break;
            case 'day22recipe01input':
                week_date_recipe = [2, 2, 1];
                break;
            case 'day23recipe00input':
                week_date_recipe = [2, 3, 0];
                break;
            case 'day23recipe01input':
                week_date_recipe = [2, 3, 1];
                break;
            case 'day24recipe00input':
                week_date_recipe = [2, 4, 0];
                break;
            case 'day24recipe01input':
                week_date_recipe = [2, 4, 1];
                break;
            case 'day25recipe00input':
                week_date_recipe = [2, 5, 0];
                break;
            case 'day25recipe01input':
                week_date_recipe = [2, 5, 1];
                break;
            case 'day26recipe00input':
                week_date_recipe = [2, 6, 0];
                break;
            case 'day26recipe01input':
                week_date_recipe = [2, 6, 1];
                break;
            case 'day30recipe00input':
                week_date_recipe = [3, 0, 0];
                break;
            case 'day30recipe01input':
                week_date_recipe = [3, 0, 1];
                break;
            case 'day31recipe00input':
                week_date_recipe = [3, 1, 0];
                break;
            case 'day31recipe01input':
                week_date_recipe = [3, 1, 1];
                break;
            case 'day32recipe00input':
                week_date_recipe = [3, 2, 0];
                break;
            case 'day32recipe01input':
                week_date_recipe = [3, 2, 1];
                break;
            case 'day33recipe00input':
                week_date_recipe = [3, 3, 0];
                break;
            case 'day33recipe01input':
                week_date_recipe = [3, 3, 1];
                break;
            case 'day34recipe00input':
                week_date_recipe = [3, 4, 0];
                break;
            case 'day34recipe01input':
                week_date_recipe = [3, 4, 1];
                break;
            case 'day35recipe00input':
                week_date_recipe = [3, 5, 0];
                break;
            case 'day35recipe01input':
                week_date_recipe = [3, 5, 1];
                break;
            case 'day36recipe00input':
                week_date_recipe = [3, 6, 0];
                break;
            case 'day36recipe01input':
                week_date_recipe = [3, 6, 1];
                break;
            case 'day40recipe00input':
                week_date_recipe = [4, 0, 0];
                break;
            case 'day40recipe01input':
                week_date_recipe = [4, 0, 1];
                break;
            case 'day41recipe00input':
                week_date_recipe = [4, 1, 0];
                break;
            case 'day41recipe01input':
                week_date_recipe = [4, 1, 1];
                break;
            case 'day42recipe00input':
                week_date_recipe = [4, 2, 0];
                break;
            case 'day42recipe01input':
                week_date_recipe = [4, 2, 1];
                break;
            case 'day43recipe00input':
                week_date_recipe = [4, 3, 0];
                break;
            case 'day43recipe01input':
                week_date_recipe = [4, 3, 1];
                break;
            case 'day44recipe00input':
                week_date_recipe = [4, 4, 0];
                break;
            case 'day44recipe01input':
                week_date_recipe = [4, 4, 1];
                break;
            case 'day45recipe00input':
                week_date_recipe = [4, 5, 0];
                break;
            case 'day45recipe01input':
                week_date_recipe = [4, 5, 1];
                break;
            case 'day46recipe00input':
                week_date_recipe = [4, 6, 0];
                break;
            case 'day46recipe01input':
                week_date_recipe = [4, 6, 1];
                break;
        }
        if (week_date_recipe) {
            console.log('changing recipe for this position: ', week_date_recipe);
            console.log('assigning recipe: ', value);
            recipeService.update_recipe($scope.selectedCalendar.id, 25, week_date_recipe[2], value).then(
                function(response) {
                    console.log("UPDATED");
                }

            )
        }
    });

}]);
