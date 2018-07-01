var app = angular.module('cait_rocks_app');

app.filter('recipe_match', function () {
    return function (input, filter) {
        if (input && input.length > 0) {

            // return everything if the search string is too short
            if (filter.length === 0) {
                return input;
            }

            // create the output array here
            var output_array = [];

            // Loop through all input objects, and filter out those who don't match the search query
            for (var i = 0; i < input.length; i++) {

                // we will check each token of the search string
                var tokens_to_check = filter.split(' ');
                var this_recipe = input[i];  // not doing forEach because I'm keeping a separate flag array

                for (var j = 0; j < tokens_to_check.length; j++) {
                    var token = tokens_to_check[j].toUpperCase();
                    var token_found = false;
                    if (this_recipe.title.toUpperCase().indexOf(token) > -1) {
                        token_found = true;
                    }
                    if (this_recipe.creator.toUpperCase().indexOf(token) > -1) {
                        token_found = true;
                    }
                    if (this_recipe.ingredients && this_recipe.ingredients.some(
                        function (i) {
                            return i.toUpperCase().indexOf(token) > -1
                        }
                    )) {
                        token_found = true;
                    }
                    if (this_recipe.directions && this_recipe.directions.toUpperCase().indexOf(token) > -1) {
                        token_found = true;
                    }
                    tokens_to_check[j] = token_found;
                }

                // now turn that one
                if (tokens_to_check.every(function (t) {
                    return t;
                })) {
                    // woo-hoo we have a match! add it to the output array
                    output_array.push(this_recipe);
                }
            }

            // and finally return the filtered down array
            return output_array;
        }
    };
});