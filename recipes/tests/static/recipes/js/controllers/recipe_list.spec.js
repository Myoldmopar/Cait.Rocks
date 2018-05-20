describe('recipe_list_controller testing', function () {
    var $scope, mock_recipe_service, httpBackend;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, recipe_service, $httpBackend, $q) {
        $scope = $rootScope.$new();
        mock_recipe_service = recipe_service;
        httpBackend = $httpBackend;
        $scope.$q = $q;
        $controller('recipe_list_controller', {
            $scope: $scope,
            recipe_service: mock_recipe_service
        });
    }));

    beforeEach(function () {
        var recipeTable =
            '<table id="recipeListTable">' +
            '<tr>' +
            '<th></th><th></th><th></th><th></th>' +
            '</tr>' +
            '<tr id="row1">' +
            '<td>TypeA</td>' +
            '<td><a href="#">TitleA</a></td>' +
            '<td>CreatorA</td>' +
            '<td>IngredientA</td>' +
            '<tr id="row2">' +
            '<td>TypeB</td>' +
            '<td><a href="#">TitleB</a></td>' +
            '<td>CreatorB</td>' +
            '<td>IngredientB</td>' +
            '</table>';
        document.body.insertAdjacentHTML('afterbegin', recipeTable);

        var datasetBasedItem = '<div id="someSpecialID" data-weeknum="0" data-daynum="0" data-recipenum="0"></div>';
        document.body.insertAdjacentHTML('afterbegin', datasetBasedItem);
    });

    afterEach(function () {
        document.body.removeChild(document.getElementById('recipeListTable'));
    });

    it('should initialize the controller just for recipes', function () {
        spyOn(mock_recipe_service, 'get_recipes').and.returnValue($scope.$q.when({'data': ['recipes']}));
        $scope.init();
        $scope.$digest();
        expect(mock_recipe_service.get_recipes).toHaveBeenCalled();
        expect($scope.recipe_list).toEqual(['recipes']);
    });

    // All of this below should go in the service test!
    // This controller should, at this point, just test whether it has these functions available
    // Once I find a better spot for that DRY code, maybe these comments will also change
    // So for now I'll be leaving them here

    it('should clear the filter variable', function () {
        $scope.filterText = 'abc';
        $scope.clear_filter();
        expect($scope.filterText).toEqual('');
    });

    it('should ignore if it cant find a table', function () {
        $scope.filterText = '';
        $scope.filter_table_rows();
    });

    it('should re-show all table rows for a blank filter', function () {
        var row1 = document.getElementById('row1');
        var row2 = document.getElementById('row2');
        row1.style.display = 'none';
        row2.style.display = 'none';
        $scope.filterText = '';
        $scope.filter_table_rows();
        expect(row1.style.display).toEqual('');
        expect(row2.style.display).toEqual('');
    });

    it('should hide all table rows for a non-matching filter', function () {
        var row1 = document.getElementById('row1');
        var row2 = document.getElementById('row2');
        row1.style.display = '';
        row2.style.display = '';
        $scope.filterText = 'abc';
        $scope.filter_table_rows();
        expect(row1.style.display).toEqual('none');
        expect(row2.style.display).toEqual('none');
    });

    it('should show based on title', function () {
        var row1 = document.getElementById('row1');
        var row2 = document.getElementById('row2');

        row1.style.display = 'none';
        row2.style.display = 'none';
        $scope.filterText = 'Title';
        $scope.filter_table_rows();
        expect(row1.style.display).toEqual('');
        expect(row2.style.display).toEqual('');

        row1.style.display = 'none';
        row2.style.display = 'none';
        $scope.filterText = 'TitleA';
        $scope.filter_table_rows();
        expect(row1.style.display).toEqual('');
        expect(row2.style.display).toEqual('none');

        row1.style.display = 'none';
        row2.style.display = 'none';
        $scope.filterText = 'TitleB';
        $scope.filter_table_rows();
        expect(row1.style.display).toEqual('none');
        expect(row2.style.display).toEqual('');
    });

    it('should show based on creator', function () {
        var row1 = document.getElementById('row1');
        var row2 = document.getElementById('row2');

        row1.style.display = 'none';
        row2.style.display = 'none';
        $scope.filterText = 'Creator';
        $scope.filter_table_rows();
        expect(row1.style.display).toEqual('');
        expect(row2.style.display).toEqual('');

        row1.style.display = 'none';
        row2.style.display = 'none';
        $scope.filterText = 'CreatorA';
        $scope.filter_table_rows();
        expect(row1.style.display).toEqual('');
        expect(row2.style.display).toEqual('none');

        row1.style.display = 'none';
        row2.style.display = 'none';
        $scope.filterText = 'CreatorB';
        $scope.filter_table_rows();
        expect(row1.style.display).toEqual('none');
        expect(row2.style.display).toEqual('');
    });

    it('should show based on ingredients', function () {
        var row1 = document.getElementById('row1');
        var row2 = document.getElementById('row2');

        row1.style.display = 'none';
        row2.style.display = 'none';
        $scope.filterText = 'Ingredient';
        $scope.filter_table_rows();
        expect(row1.style.display).toEqual('');
        expect(row2.style.display).toEqual('');

        row1.style.display = 'none';
        row2.style.display = 'none';
        $scope.filterText = 'IngredientA';
        $scope.filter_table_rows();
        expect(row1.style.display).toEqual('');
        expect(row2.style.display).toEqual('none');

        row1.style.display = 'none';
        row2.style.display = 'none';
        $scope.filterText = 'IngredientB';
        $scope.filter_table_rows();
        expect(row1.style.display).toEqual('none');
        expect(row2.style.display).toEqual('');
    });

    it('should match on multi-part search', function () {
        var row1 = document.getElementById('row1');
        var row2 = document.getElementById('row2');

        row1.style.display = 'none';
        row2.style.display = 'none';
        $scope.filterText = 'Ingredient Creator';
        $scope.filter_table_rows();
        expect(row1.style.display).toEqual('');
        expect(row2.style.display).toEqual('');

        row1.style.display = 'none';
        row2.style.display = 'none';
        $scope.filterText = 'IngredientA Creator';
        $scope.filter_table_rows();
        expect(row1.style.display).toEqual('');
        expect(row2.style.display).toEqual('none');
    });

});