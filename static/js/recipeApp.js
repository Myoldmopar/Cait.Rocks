// create an angular module to hold everything for this page
// note to self, if we split things across JS files, calling angular.module with just a name won't create a new app
var app = angular.module('recipeApp', []);

// configure the module to use a different template interpolation sequence to avoid conflicting with Django
app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

// configure the module to perform C.S.R.F. operations nicely with Django
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

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

    // Variables, functions, and initialization for the package testing section
    $scope.recipe_list = [];
    $scope.retrieve_recipes();

}]);
