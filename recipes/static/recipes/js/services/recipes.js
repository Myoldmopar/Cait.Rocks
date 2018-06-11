var app = angular.module('cait_rocks_app');

app.service('recipe_service', ['$http', function ($http) {
    'use strict';
    this.get_recipes = function () {
        return $http.get('/planner/api/recipes/').then(function (response) {
            return response.data;
        });
    };
    this.get_recipe = function (recipe_id) {
        return $http.get('/planner/api/recipes/' + recipe_id + '/').then(function (response) {
            return response.data;
        });
    };
    this.post_blank_recipe = function (recipe_title) {
        return $http.post(
            '/planner/api/recipes/',
            {
                title: recipe_title,
                recipe_type: 'unknown'
            }
        ).then(
            function (response) {
                return response.data;
            }
        )
    };
}]);
