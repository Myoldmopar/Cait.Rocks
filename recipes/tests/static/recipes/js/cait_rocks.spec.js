
describe("caitRockController Testing Suite", function () {
    var $scope, mockRecipeService;
    beforeEach(module("caitRocksApp"));

    // Inject the real caitRockService
    beforeEach(inject(function ($controller, $rootScope, recipeService) {// , calenderService) {
        $scope = $rootScope.$new();

        // Set mockStringService equal to the real service code.
        mockRecipeService = recipeService;
        //mockCalendarService = calenderService;

        // Turn the mockStringService into a Jasmine spy and call a fake function that
        // basically does the same thing as the real one, but now this one is isolated
        // to just this test.
        spyOn(mockRecipeService, "addExcitement").and.returnValue("Doesn't matter what this says, we're not testing the result");
        $controller("caitRockController", {$scope: $scope, recipeService: mockRecipeService});
    }));

    it("should make a string more exciting", function () {
        var boringString = "Hey";
        $scope.excitement(boringString);

        // We only care that the function was called, we don't need to test the value that got returned.
        expect(mockRecipeService.addExcitement).toHaveBeenCalled();
    });
});