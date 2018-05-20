var app = angular.module('cait_rocks_app');

app.service('recipe_service', ['$http', function ($http) {
    'use strict';
    this.get_recipes = function () {
        return $http.get('/planner/api/recipes/');
    };

    // So the following functions are much better suited to live in the controller, as they act on the page scope
    // and maybe the document object itself.  But the code is used by two different controllers, and I wasn't sure
    // where I should drop that code so that each controller could use it.  I thought about extending the controller
    // but that seemed like a bit overkill.  I also thought about dropping the code into a standalone JS file, as
    // global functions, but that didn't seem right.  So here they are.  I'd love to move them if I can figure out
    // the right place to put them.

    this.retrieve_recipes = function ($scope) {
        this.get_recipes().then(
            function (response) {
                $scope.recipe_list = response.data;
            }
        );
    };

    this.filter_table_rows = function ($scope) {
        // Declare variables
        var filter, table, tr, td, i, j, inner_a;
        filter = $scope.filterText.toUpperCase();
        table = document.getElementById('recipeListTable');
        tr = table.getElementsByTagName('tr');

        // make sure all rows are shown first
        for (i = 0; i < tr.length; i++) {
            tr[i].style.display = '';
        }

        // leave early with everything shown if the search string is too short
        if (filter.length < 2) {
            return;
        }

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 1; i < tr.length; i++) {

            // we will check each token of the search string
            var tokens_to_check = filter.split(' ');

            for (j = 0; j < tokens_to_check.length; j++) {
                var token = tokens_to_check[j];
                var token_found = false;
                // check the title of the recipe
                td = tr[i].getElementsByTagName('td')[1];
                inner_a = td.getElementsByTagName('a')[0];
                if (inner_a.innerHTML.toUpperCase().indexOf(token) > -1) {
                    token_found = true;
                }
                // check the author of the recipe
                if (!token_found) {
                    td = tr[i].getElementsByTagName('td')[2];
                    if (td.innerHTML.toUpperCase().indexOf(token) > -1) {
                        token_found = true;
                    }
                }
                if (!token_found) {
                    // check the ingredients of the recipe
                    td = tr[i].getElementsByTagName('td')[3];
                    if (td.innerHTML.toUpperCase().indexOf(token) > -1) {
                        token_found = true;
                    }
                }
                tokens_to_check[j] = token_found;
            }

            // now turn that one
            if (tokens_to_check.every(function (t) {
                    return t;
                })) {
                // woo-hoo we have a match! leave it shown
            } else {
                tr[i].style.display = 'none';
            }
        }
    };

    this.clear_filter = function ($scope) {
        $scope.filterText = '';
        $scope.filter_table_rows();
    };

}]);
