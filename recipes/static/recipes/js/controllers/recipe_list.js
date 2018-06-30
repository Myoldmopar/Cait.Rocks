var app = angular.module('cait_rocks_app');

app.controller('recipe_list_controller', ['$scope', 'recipe_service', function ($scope, recipe_service) {
    'use strict';

    $scope.selected_recipe = null;
    $scope.sort_type = 'title';
    $scope.sort_reverse = false;
    $scope.search_recipe = '';
    $scope.recipe_error_message = '';
    $scope.loading_recipe = false;
    $scope.loading_recipes = false;

    $scope.init = function () {
        $scope.recipe_error_message = '';
        $scope.loading_recipe = true;
        recipe_service.get_recipes().then(
            function (response) {
                $scope.allRecipes = response;
            }
        ).catch(function () {
            $scope.allRecipes = [];
            $scope.recipe_error_message = 'Could not retrieve recipes, is the server broken?'
        }).finally(function () {
            $scope.loading_recipe = false;
        });
    };

    $scope.select_a_recipe = function (recipe_id) {
        $scope.recipe_error_message = '';
        $scope.loading_recipe = true;
        recipe_service.get_recipe(recipe_id).then(
            function (response) {
                $scope.selected_recipe = response;
                // I tried just using the img src as an angular expression in the html, but it was throwing a 404
                // when the browser was creating the DOM, before the angular expression could be evaluated,
                // so instead I just create/modify the src attribute here
                var target = document.getElementById('selected_recipe_image');
                /* istanbul ignore next */
                if (target) {
                    if ($scope.selected_recipe.image) {
                        target.src = $scope.selected_recipe.image;
                    } else {
                        target.src = '';
                    }
                }
            }
        ).catch(function () {
            $scope.selected_recipe = null;
            $scope.recipe_error_message = 'Could not retrieve recipe, is the server broken?';
        }).finally(function () {
            $scope.loading_recipe = false;
        });
    };

    $scope.show_loading_spinner = function () {
        return $scope.loading_recipes || $scope.loading_recipe;
    };
}]);
