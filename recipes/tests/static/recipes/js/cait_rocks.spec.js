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
});