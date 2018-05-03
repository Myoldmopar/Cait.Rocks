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

    $scope.getCurrentCalendar = function () {
        return $http.get('/api/calendars/1/').then(
            function (response) {
                $scope.calendar = response.data;
            }
        );
    };

    // things to do during page initialization
    $scope.filterText = '';
    $scope.recipe_list = [];
    $scope.retrieve_recipes();
    $scope.getCurrentCalendar();

}]);
