var app = angular.module('cait_rocks_app');

app.service('calendar_service', ['$http', function ($http) {
    'use strict';
    this.update_calendar_recipe_id = function (calendar_id, date_num, daily_recipe_id, recipe_pk) {
        return $http.put(
            '/planner/api/calendars/' + calendar_id + '/recipe_id/',
            {date_num: date_num, daily_recipe_id: daily_recipe_id, recipe_pk: recipe_pk}
        );
    };
    this.get_calendar_monthly_data = function (calendar_id) {
        return $http.get('/planner/api/calendars/' + calendar_id + '/monthly_data/');
    };

    this.get_calendars = function () {
        return $http.get('/planner/api/calendars/');
    };
    this.post_calendar = function (year, month, name, user_id) {
        return $http.post(
            '/planner/api/calendars/',
            {'nickname': name, 'year': year, 'month': month, 'creator_id': user_id}
        )
    };
    this.confirm_calendar_delete = function () {
        return confirm('Are you super sure you want to delete this calendar?  This is permanent!');
    };
    this.delete_calendar = function (calendar_id) {
        return $http.delete('/planner/api/calendars/' + calendar_id + '/');
    };
    this.get_current_user = function () {
        return $http.get('/planner/api/users/current_user_id/');
    }
}]);
