var app = angular.module('cait_rocks_app');

app.controller('recipe_list_controller', ['$scope', 'recipe_service', function ($scope, recipe_service) {
    'use strict';

    $scope.retrieve_recipes = function () {return recipe_service.retrieve_recipes($scope);};

    $scope.filter_table_rows = function () {return recipe_service.filter_table_rows($scope);};

    $scope.clear_filter = function () {return recipe_service.clear_filter($scope);};

    $scope.init = function () {
        // use this init for pages where you aren't getting the full list of recipes
        $scope.filterText = '';
        $scope.recipe_list = [];
        $scope.retrieve_recipes($scope);
    };

}]);
