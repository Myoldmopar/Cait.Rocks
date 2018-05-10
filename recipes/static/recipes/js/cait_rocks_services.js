var app = angular.module('caitRocksApp');

app.factory('calendarService', ['$http', function ($http) {
    var calendar_factory = {};
    calendar_factory.update_calendar_recipe_id = function (calendar_id, date_num, daily_recipe_id, recipe_pk) {
        return $http.put(
            '/planner/api/calendars/' + calendar_id + '/recipe_id/',
            {date_num: date_num, daily_recipe_id: daily_recipe_id, recipe_pk: recipe_pk}
        ).then(function (response) {
            return response.data;
        });
    };
    calendar_factory.get_calendar_monthly_data = function (calendar_id) {
        return $http.get('/planner/api/calendars/' + calendar_id + '/monthly_data/');
    };

    calendar_factory.get_calendars = function () {
        return $http.get('/planner/api/calendars/');
    };
    calendar_factory.post_calendar = function (year, month, name) {
        return $http.post(
            '/planner/api/calendars/',
            {'nickname': name, 'year': year, 'month': month}
        )
    };
    calendar_factory.addExcitement = function (str) {
        return str + "!!!";
    };
    return calendar_factory;
}]);

app.factory('recipeService', ['$http', function ($http) {
    var recipe_factory = {};

    recipe_factory.get_recipes = function () {
        return $http.get('/planner/api/recipes/');
    };
    recipe_factory.addExcitement = function (str) {
        return str + "!!!";
    };
    return recipe_factory;
}]);

//

app.service("caitRockService", function() {
    this.addExcitement = function (str) {
        return str + "!!!";
    };
});