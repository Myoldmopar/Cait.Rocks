// create an angular module to hold everything for this page
// note to self, if we split things across JS files, calling angular.module with just a name won't create a new app
var app = angular.module('recipeApp', []);

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
                    $scope.updateForSelectedCalendar();
                }
            }
        );
    };

    $scope.updateForSelectedCalendar = function () {
        console.log($scope.selectedCalendar);
        $scope.getMonthData().then(
            function () {
                $scope.day00 = $scope.monthly_data.dates.d00.full_day;
                $scope.day01 = $scope.monthly_data.dates.d01.full_day;
                $scope.day02 = $scope.monthly_data.dates.d02.full_day;
                $scope.day03 = $scope.monthly_data.dates.d03.full_day;
                $scope.day04 = $scope.monthly_data.dates.d04.full_day;
                $scope.day05 = $scope.monthly_data.dates.d05.full_day;
                $scope.day06 = $scope.monthly_data.dates.d06.full_day;
            }
        )
    };

    $scope.getCalendarDayData = function (day_index) {
        if (!day_index) {
            return {'recipe01': null, 'recipe02': null, 'recipe03': null, 'recipe04': null}
        }
        $http.get('/api/calendardays/' + day_index + '/').then(
            function (day_response) {
                var this_response = {};
                if (day_response.data.recipe01) {
                    $http.get('/api/recipes/' + day_response.data.recipe01 + '/').then(
                        function (recipe_response) {
                            this_response['recipe01'] = recipe_response.data.title;
                        }
                    );
                }
                if (day_response.data.recipe02) {
                    $http.get('/api/recipes/' + day_response.data.recipe02 + '/').then(
                        function (recipe_response) {
                            this_response['recipe02'] = recipe_response.data.title;
                        }
                    );
                }
                if (day_response.data.recipe03) {
                    $http.get('/api/recipes/' + day_response.data.recipe03 + '/').then(
                        function (recipe_response) {
                            this_response['recipe03'] = recipe_response.data.title;
                        }
                    );
                }
                if (day_response.data.recipe04) {
                    $http.get('/api/recipes/' + day_response.data.recipe04 + '/').then(
                        function (recipe_response) {
                            this_response['recipe04'] = recipe_response.data.title;
                        }
                    );
                }
                return this_response;
            }
        );
    };

    $scope.getCurrentCalendar = function () {
        // return $http.get('/api/calendars/' + $scope.selectedCalendar.id + '/').then(
        //     function (response) {
        //         $scope.day01 = $scope.getCalendarDayData(response.data.day01);
        //         $scope.day02 = $scope.getCalendarDayData(response.data.day02);
        //     }
        // );
    };

    $scope.getMonthData = function () {
        if ($scope.selectedCalendar) {
            return $http.get('/api/calendars/' + $scope.selectedCalendar.id + '/monthly_dates/').then(
                function (date_response) {
                    $scope.monthly_data = date_response.data;
                    $scope.num_weeks = date_response.data.num_weeks;
                    console.log($scope.monthly_data);
                    console.log($scope.num_weeks);
                }
            );
        }
    };

    // things to do during page initialization
    $scope.filterText = '';
    $scope.recipe_list = [];
    $scope.retrieve_recipes();
    $scope.getCalendars();
    $scope.getCurrentCalendar();

}]);
