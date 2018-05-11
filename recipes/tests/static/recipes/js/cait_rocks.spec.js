describe("caitRockController Testing Suite", function () {
    var $scope, mockCalendarService, mockRecipeService;
    beforeEach(module("caitRocksApp"));

    // Inject the real caitRockService
    beforeEach(inject(function ($controller, $rootScope, calendarService, recipeService, $q) {
        $scope = $rootScope.$new();
        mockCalendarService = calendarService;
        mockRecipeService = recipeService;
        $scope.$q = $q;
        $controller("caitRocksController", {
            $scope: $scope,
            calendarService: mockCalendarService,
            recipeService: mockRecipeService
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

        document.body.insertAdjacentHTML(
            'afterbegin',
            recipeTable);
    });

    // remove the html fixture from the DOM
    afterEach(function () {
        document.body.removeChild(document.getElementById('recipeListTable'));
    });

    it("should get recipes through the recipe API service", function () {
        var deferredSuccess = $scope.$q.defer();
        spyOn(mockRecipeService, 'get_recipes').and.returnValue(deferredSuccess.promise);
        $scope.retrieve_recipes();
        expect(mockRecipeService.get_recipes).toHaveBeenCalled();
        deferredSuccess.resolve('somethings');
        //$scope.$digest();           // This makes sure that all callbacks of promises will be called
        //expect($scope.recipe_list).toBe(null);
    });

    it("should clear the filter variable", function () {
        $scope.filterText = 'abc';
        $scope.clear_filter();
        expect($scope.filterText).toEqual('');
    });

    it("should ignore if it cant find a table", function () {
        $scope.filterText = '';
        $scope.filter_table_rows();
    });

    it("should re-show all table rows for a blank filter", function () {
        var row1 = document.getElementById('row1');
        var row2 = document.getElementById('row2');
        row1.style.display = 'none';
        row2.style.display = 'none';
        $scope.filterText = '';
        $scope.filter_table_rows();
        expect(row1.style.display).toEqual('');
        expect(row2.style.display).toEqual('');
    });

    it("should hide all table rows for a non-matching filter", function () {
        var row1 = document.getElementById('row1');
        var row2 = document.getElementById('row2');
        row1.style.display = '';
        row2.style.display = '';
        $scope.filterText = 'abc';
        $scope.filter_table_rows();
        expect(row1.style.display).toEqual('none');
        expect(row2.style.display).toEqual('none');
    });

    it("should show based on title", function () {
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

    it("should show based on creator", function () {
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

    it("should show based on ingredients", function () {
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

    it("should match on multi-part search", function () {
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