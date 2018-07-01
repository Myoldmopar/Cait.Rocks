var app = angular.module('cait_rocks_app');

app.service('calendar_service', ['$http', function ($http) {
    'use strict';
    this.update_calendar_recipe_id = function (calendar_id, date_num, daily_recipe_id, recipe_pk) {
        return $http.put(
            '/planner/api/calendars/' + calendar_id + '/recipe_id/',
            {date_num: date_num, daily_recipe_id: daily_recipe_id, recipe_pk: recipe_pk}
        ).then(function (response) {
            return response.data;
        });
    };
    this.get_calendar_monthly_data = function (calendar_id) {
        return $http.get('/planner/api/calendars/' + calendar_id + '/monthly_data/').then(function (response) {
            return response.data;
        });
    };

    this.get_calendar = function (calendar_id) {
        return $http.get('/planner/api/calendars/' + calendar_id + '/').then(function (response) {
            return response.data;
        });
    };
    this.get_calendars = function () {
        return $http.get('/planner/api/calendars/').then(function (response) {
            return response.data;
        });
    };
    this.get_my_calendars = function () {
        return $http.get('/planner/api/calendars/mine/').then(function (response) {
            return response.data;
        });
    };
    this.post_calendar = function (year, month, name) {
        return $http.post(
            '/planner/api/calendars/',
            {'nickname': name, 'year': year, 'month': month}
        ).then(function (response) {
            return response.data;
        })
    };
    this.delete_calendar = function (calendar_id) {
        return $http.delete('/planner/api/calendars/' + calendar_id + '/').then(function (response) {
            return response.data;
        });
    };
}]);
