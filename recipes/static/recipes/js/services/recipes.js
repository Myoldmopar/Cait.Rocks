var app = angular.module('cait_rocks_app');

app.service('recipe_service', ['$http', function ($http) {
    'use strict';
    this.get_recipes = function () {
        return $http.get('/planner/api/recipes/').then(function (response) {
            return response.data;
        });
    };
}]);
