// create an angular module to hold everything for this page
// note to self, if we split things across JS files, calling angular.module with just a name won't create a new app
var app = angular.module('recipeApp', ['ngAnimate', 'mgcrea.ngStrap']);

// configure the module to use a different template interpolation sequence to avoid conflicting with Django
app.config(function ($interpolateProvider) {
    "use strict";
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

// create a controller containing functions and variables made available in the controller's scope
app.controller('recipeController', ['$scope', '$http', function ($scope, $http) {
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
        $scope.day00recipe02 = $scope.monthly_data.dates.d00.recipe03;
        $scope.day00recipe03 = $scope.monthly_data.dates.d00.recipe04;
        
        $scope.day01recipe00 = $scope.monthly_data.dates.d01.recipe01;
        $scope.day01recipe01 = $scope.monthly_data.dates.d01.recipe02;
        $scope.day01recipe02 = $scope.monthly_data.dates.d01.recipe03;
        $scope.day01recipe03 = $scope.monthly_data.dates.d01.recipe04;
        
        $scope.day02recipe00 = $scope.monthly_data.dates.d02.recipe01;
        $scope.day02recipe01 = $scope.monthly_data.dates.d02.recipe02;
        $scope.day02recipe02 = $scope.monthly_data.dates.d02.recipe03;
        $scope.day02recipe03 = $scope.monthly_data.dates.d02.recipe04;

        $scope.day03recipe00 = $scope.monthly_data.dates.d03.recipe01;
        $scope.day03recipe01 = $scope.monthly_data.dates.d03.recipe02;
        $scope.day03recipe02 = $scope.monthly_data.dates.d03.recipe03;
        $scope.day03recipe03 = $scope.monthly_data.dates.d03.recipe04;

        $scope.day04recipe00 = $scope.monthly_data.dates.d04.recipe01;
        $scope.day04recipe01 = $scope.monthly_data.dates.d04.recipe02;
        $scope.day04recipe02 = $scope.monthly_data.dates.d04.recipe03;
        $scope.day04recipe03 = $scope.monthly_data.dates.d04.recipe04;

        $scope.day05recipe00 = $scope.monthly_data.dates.d05.recipe01;
        $scope.day05recipe01 = $scope.monthly_data.dates.d05.recipe02;
        $scope.day05recipe02 = $scope.monthly_data.dates.d05.recipe03;
        $scope.day05recipe03 = $scope.monthly_data.dates.d05.recipe04;

        $scope.day06recipe00 = $scope.monthly_data.dates.d06.recipe01;
        $scope.day06recipe01 = $scope.monthly_data.dates.d06.recipe02;
        $scope.day06recipe02 = $scope.monthly_data.dates.d06.recipe03;
        $scope.day06recipe03 = $scope.monthly_data.dates.d06.recipe04;

        
        $scope.day10recipe00 = $scope.monthly_data.dates.d10.recipe01;
        $scope.day10recipe01 = $scope.monthly_data.dates.d10.recipe02;
        $scope.day10recipe02 = $scope.monthly_data.dates.d10.recipe03;
        $scope.day10recipe03 = $scope.monthly_data.dates.d10.recipe04;
        
        $scope.day11recipe00 = $scope.monthly_data.dates.d11.recipe01;
        $scope.day11recipe01 = $scope.monthly_data.dates.d11.recipe02;
        $scope.day11recipe02 = $scope.monthly_data.dates.d11.recipe03;
        $scope.day11recipe03 = $scope.monthly_data.dates.d11.recipe04;
        
        $scope.day12recipe00 = $scope.monthly_data.dates.d12.recipe01;
        $scope.day12recipe01 = $scope.monthly_data.dates.d12.recipe02;
        $scope.day12recipe02 = $scope.monthly_data.dates.d12.recipe03;
        $scope.day12recipe03 = $scope.monthly_data.dates.d12.recipe04;

        $scope.day13recipe00 = $scope.monthly_data.dates.d13.recipe01;
        $scope.day13recipe01 = $scope.monthly_data.dates.d13.recipe02;
        $scope.day13recipe02 = $scope.monthly_data.dates.d13.recipe03;
        $scope.day13recipe03 = $scope.monthly_data.dates.d13.recipe04;

        $scope.day14recipe00 = $scope.monthly_data.dates.d14.recipe01;
        $scope.day14recipe01 = $scope.monthly_data.dates.d14.recipe02;
        $scope.day14recipe02 = $scope.monthly_data.dates.d14.recipe03;
        $scope.day14recipe03 = $scope.monthly_data.dates.d14.recipe04;

        $scope.day15recipe00 = $scope.monthly_data.dates.d15.recipe01;
        $scope.day15recipe01 = $scope.monthly_data.dates.d15.recipe02;
        $scope.day15recipe02 = $scope.monthly_data.dates.d15.recipe03;
        $scope.day15recipe03 = $scope.monthly_data.dates.d15.recipe04;

        $scope.day16recipe00 = $scope.monthly_data.dates.d16.recipe01;
        $scope.day16recipe01 = $scope.monthly_data.dates.d16.recipe02;
        $scope.day16recipe02 = $scope.monthly_data.dates.d16.recipe03;
        $scope.day16recipe03 = $scope.monthly_data.dates.d16.recipe04;

        
        $scope.day20recipe00 = $scope.monthly_data.dates.d20.recipe01;
        $scope.day20recipe01 = $scope.monthly_data.dates.d20.recipe02;
        $scope.day20recipe02 = $scope.monthly_data.dates.d20.recipe03;
        $scope.day20recipe03 = $scope.monthly_data.dates.d20.recipe04;
        
        $scope.day21recipe00 = $scope.monthly_data.dates.d21.recipe01;
        $scope.day21recipe01 = $scope.monthly_data.dates.d21.recipe02;
        $scope.day21recipe02 = $scope.monthly_data.dates.d21.recipe03;
        $scope.day21recipe03 = $scope.monthly_data.dates.d21.recipe04;
        
        $scope.day22recipe00 = $scope.monthly_data.dates.d22.recipe01;
        $scope.day22recipe01 = $scope.monthly_data.dates.d22.recipe02;
        $scope.day22recipe02 = $scope.monthly_data.dates.d22.recipe03;
        $scope.day22recipe03 = $scope.monthly_data.dates.d22.recipe04;

        $scope.day23recipe00 = $scope.monthly_data.dates.d23.recipe01;
        $scope.day23recipe01 = $scope.monthly_data.dates.d23.recipe02;
        $scope.day23recipe02 = $scope.monthly_data.dates.d23.recipe03;
        $scope.day23recipe03 = $scope.monthly_data.dates.d23.recipe04;

        $scope.day24recipe00 = $scope.monthly_data.dates.d24.recipe01;
        $scope.day24recipe01 = $scope.monthly_data.dates.d24.recipe02;
        $scope.day24recipe02 = $scope.monthly_data.dates.d24.recipe03;
        $scope.day24recipe03 = $scope.monthly_data.dates.d24.recipe04;

        $scope.day25recipe00 = $scope.monthly_data.dates.d25.recipe01;
        $scope.day25recipe01 = $scope.monthly_data.dates.d25.recipe02;
        $scope.day25recipe02 = $scope.monthly_data.dates.d25.recipe03;
        $scope.day25recipe03 = $scope.monthly_data.dates.d25.recipe04;

        $scope.day26recipe00 = $scope.monthly_data.dates.d26.recipe01;
        $scope.day26recipe01 = $scope.monthly_data.dates.d26.recipe02;
        $scope.day26recipe02 = $scope.monthly_data.dates.d26.recipe03;
        $scope.day26recipe03 = $scope.monthly_data.dates.d26.recipe04;
        
        
        $scope.day30recipe00 = $scope.monthly_data.dates.d30.recipe01;
        $scope.day30recipe01 = $scope.monthly_data.dates.d30.recipe02;
        $scope.day30recipe02 = $scope.monthly_data.dates.d30.recipe03;
        $scope.day30recipe03 = $scope.monthly_data.dates.d30.recipe04;
        
        $scope.day31recipe00 = $scope.monthly_data.dates.d31.recipe01;
        $scope.day31recipe01 = $scope.monthly_data.dates.d31.recipe02;
        $scope.day31recipe02 = $scope.monthly_data.dates.d31.recipe03;
        $scope.day31recipe03 = $scope.monthly_data.dates.d31.recipe04;
        
        $scope.day32recipe00 = $scope.monthly_data.dates.d32.recipe01;
        $scope.day32recipe01 = $scope.monthly_data.dates.d32.recipe02;
        $scope.day32recipe02 = $scope.monthly_data.dates.d32.recipe03;
        $scope.day32recipe03 = $scope.monthly_data.dates.d32.recipe04;

        $scope.day33recipe00 = $scope.monthly_data.dates.d33.recipe01;
        $scope.day33recipe01 = $scope.monthly_data.dates.d33.recipe02;
        $scope.day33recipe02 = $scope.monthly_data.dates.d33.recipe03;
        $scope.day33recipe03 = $scope.monthly_data.dates.d33.recipe04;

        $scope.day34recipe00 = $scope.monthly_data.dates.d34.recipe01;
        $scope.day34recipe01 = $scope.monthly_data.dates.d34.recipe02;
        $scope.day34recipe02 = $scope.monthly_data.dates.d34.recipe03;
        $scope.day34recipe03 = $scope.monthly_data.dates.d34.recipe04;

        $scope.day35recipe00 = $scope.monthly_data.dates.d35.recipe01;
        $scope.day35recipe01 = $scope.monthly_data.dates.d35.recipe02;
        $scope.day35recipe02 = $scope.monthly_data.dates.d35.recipe03;
        $scope.day35recipe03 = $scope.monthly_data.dates.d35.recipe04;

        $scope.day36recipe00 = $scope.monthly_data.dates.d36.recipe01;
        $scope.day36recipe01 = $scope.monthly_data.dates.d36.recipe02;
        $scope.day36recipe02 = $scope.monthly_data.dates.d36.recipe03;
        $scope.day36recipe03 = $scope.monthly_data.dates.d36.recipe04;
        
        
        $scope.day40recipe00 = $scope.monthly_data.dates.d40.recipe01;
        $scope.day40recipe01 = $scope.monthly_data.dates.d40.recipe02;
        $scope.day40recipe02 = $scope.monthly_data.dates.d40.recipe03;
        $scope.day40recipe03 = $scope.monthly_data.dates.d40.recipe04;
        
        $scope.day41recipe00 = $scope.monthly_data.dates.d41.recipe01;
        $scope.day41recipe01 = $scope.monthly_data.dates.d41.recipe02;
        $scope.day41recipe02 = $scope.monthly_data.dates.d41.recipe03;
        $scope.day41recipe03 = $scope.monthly_data.dates.d41.recipe04;
        
        $scope.day42recipe00 = $scope.monthly_data.dates.d42.recipe01;
        $scope.day42recipe01 = $scope.monthly_data.dates.d42.recipe02;
        $scope.day42recipe02 = $scope.monthly_data.dates.d42.recipe03;
        $scope.day42recipe03 = $scope.monthly_data.dates.d42.recipe04;

        $scope.day43recipe00 = $scope.monthly_data.dates.d43.recipe01;
        $scope.day43recipe01 = $scope.monthly_data.dates.d43.recipe02;
        $scope.day43recipe02 = $scope.monthly_data.dates.d43.recipe03;
        $scope.day43recipe03 = $scope.monthly_data.dates.d43.recipe04;

        $scope.day44recipe00 = $scope.monthly_data.dates.d44.recipe01;
        $scope.day44recipe01 = $scope.monthly_data.dates.d44.recipe02;
        $scope.day44recipe02 = $scope.monthly_data.dates.d44.recipe03;
        $scope.day44recipe03 = $scope.monthly_data.dates.d44.recipe04;

        $scope.day45recipe00 = $scope.monthly_data.dates.d45.recipe01;
        $scope.day45recipe01 = $scope.monthly_data.dates.d45.recipe02;
        $scope.day45recipe02 = $scope.monthly_data.dates.d45.recipe03;
        $scope.day45recipe03 = $scope.monthly_data.dates.d45.recipe04;

        $scope.day46recipe00 = $scope.monthly_data.dates.d46.recipe01;
        $scope.day46recipe01 = $scope.monthly_data.dates.d46.recipe02;
        $scope.day46recipe02 = $scope.monthly_data.dates.d46.recipe03;
        $scope.day46recipe03 = $scope.monthly_data.dates.d46.recipe04;        

    };

    // things to do during page initialization
    $scope.filterText = '';
    $scope.recipe_list = [];
    $scope.retrieve_recipes();
    $scope.getCalendars();

}]);
