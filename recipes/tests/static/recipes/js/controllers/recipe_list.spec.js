describe('recipe_list_controller testing init function', function () {
    var $scope, mock_recipe_service;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, recipe_service, $q) {
        $scope = $rootScope.$new();
        mock_recipe_service = recipe_service;
        $scope.$q = $q;
        $controller('recipe_list_controller', {
            $scope: $scope,
            recipe_service: mock_recipe_service
        });
    }));

    it('should initialize the allRecipes variable during controller initialization', function () {
        spyOn(mock_recipe_service, 'get_recipes').and.returnValue($scope.$q.when([{'key': 5}]));
        $scope.init();
        $scope.$digest();
        expect($scope.allRecipes.length).toEqual(1);
        expect($scope.recipe_error_message).toBeFalsy();
    });

    it('should fail to initialize the allRecipes variable during controller initialization', function () {
        spyOn(mock_recipe_service, 'get_recipes').and.returnValue($scope.$q.reject('reasons'));
        $scope.init();
        $scope.$digest();
        expect($scope.allRecipes.length).toEqual(0);
        expect($scope.recipe_error_message).toBeTruthy();
    });

});

describe('recipe_list_controller testing select_a_recipe function', function () {
    var $scope, mock_recipe_service;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, recipe_service, $q) {
        $scope = $rootScope.$new();
        mock_recipe_service = recipe_service;
        $scope.$q = $q;
        $controller('recipe_list_controller', {
            $scope: $scope,
            recipe_service: mock_recipe_service
        });
    }));

     it('should set the current recipe where the recipe has an image', function () {
        spyOn(mock_recipe_service, 'get_recipe').and.returnValue($scope.$q.when({'id': 1, 'image': ''}));
        $scope.select_a_recipe(1);
        $scope.$digest();
        expect(mock_recipe_service.get_recipe).toHaveBeenCalled();
        expect($scope.selected_recipe.id).toEqual(1);
        // it would be nice to test the actual image element got updated, but karma kept throwing 404s for missing image
        // var image_element = document.getElementById('selected_recipe_image');
        // expect(image_element.src).toEqual('');
    });

    it('should set the current recipe where the recipe does not have an image', function () {
        spyOn(mock_recipe_service, 'get_recipe').and.returnValue($scope.$q.when({'id': 1}));
        $scope.select_a_recipe(1);
        $scope.$digest();
        expect(mock_recipe_service.get_recipe).toHaveBeenCalled();
        expect($scope.selected_recipe.id).toEqual(1);
    });

    it('should fail to set the current recipe', function () {
        spyOn(mock_recipe_service, 'get_recipe').and.returnValue($scope.$q.reject('reasons'));
        $scope.select_a_recipe(1);
        $scope.$digest();
        expect(mock_recipe_service.get_recipe).toHaveBeenCalled();
        expect($scope.selected_recipe).toBeFalsy();
    });

});

describe('recipe_list_controller loading spinner function responds to underlying flags', function () {
    var $scope, mock_recipe_service;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, recipe_service, $q) {
        $scope = $rootScope.$new();
        mock_recipe_service = recipe_service;
        $scope.$q = $q;
        $controller('recipe_list_controller', {
            $scope: $scope,
            recipe_service: mock_recipe_service
        });
    }));

   it('should turn on whenever the anything is loading', function () {
       $scope.loading_recipe = true;
       $scope.loading_recipes = false;
       expect($scope.show_loading_spinner()).toBeTruthy();
       $scope.loading_recipe = false;
       $scope.loading_recipes = true;
       expect($scope.show_loading_spinner()).toBeTruthy();
       $scope.loading_recipe = true;
       $scope.loading_recipes = true;
       expect($scope.show_loading_spinner()).toBeTruthy();
   });

   it('should turn off when all flags are off', function () {
       $scope.loading_recipe = false;
       $scope.loading_recipes = false;
       expect($scope.show_loading_spinner()).toBeFalsy();
   })

});
