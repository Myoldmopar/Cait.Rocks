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

    it("should make a string more exciting", function () {
        spyOn(mockCalendarService, "addExcitement").and.returnValue({data: 'HEY'});
        $scope.excitement();
        expect(mockCalendarService.addExcitement).toHaveBeenCalled();
    });

    it("should get recipes through the recipe API service", function () {
        var deferredSuccess = $scope.$q.defer();
        spyOn(mockRecipeService, 'get_recipes').and.returnValue(deferredSuccess.promise);
        $scope.retrieve_recipes();
        expect(mockRecipeService.get_recipes).toHaveBeenCalled();
        deferredSuccess.resolve();
        //$scope.$digest();           // This makes sure that all callbacks of promises will be called
        //expect($scope.recipe_list).toBe(null);
    });

    it("should clear the filter variable", function () {
        $scope.filterText = 'abc';
        $scope.clear_filter();
        expect($scope.filterText).toEqual('');
    });

    it("should re-show all table rows for a blank filter", function () {
        var t = document.createElement('table');
        t.id = 'recipeListTable';
        var tr_header = document.createElement('tr');
        t.append(tr_header);
        var tr_row_a = document.createElement('tr');
        tr_row_a.style.display = 'none';
        t.append(tr_row_a);
        var tr_row_b = document.createElement('tr');
        tr_row_b.style.display = 'none';
        t.append(tr_row_b);
        $(document.body).append(t);

        $scope.filterText = '';
        $scope.filter_table_rows();
        expect(tr_row_a.style.display).toEqual('');
        expect(tr_row_b.style.display).toEqual('');
    })

});