var app = angular.module('cait_rocks_app');

app.controller('recipe_list_controller', ['$scope', 'recipe_service', function ($scope, recipe_service) {

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
    };

    $scope.logme = function (recipe_id) {
        console.log("HEY", recipe_id);
    };

}]);
