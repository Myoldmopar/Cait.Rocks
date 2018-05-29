var app = angular.module('cait_rocks_app');

app.controller('recipe_list_controller', ['$scope', 'recipe_service', function ($scope, recipe_service) {
    'use strict';

    $scope.sortType = 'title'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchRecipe = '';     // set the default search/filter term

    $scope.init = function () {
        // create the list of sushi rolls
        recipe_service.get_recipes().then(
            function (response) {
                $scope.allRecipes = response;
            }
        );
        $scope.selected_recipe = null;
    };

    $scope.logme = function (recipe_id) {
        recipe_service.get_recipe(recipe_id).then(
            function (response) {
                $scope.selected_recipe = response;
            }
        )
    };

}]);
