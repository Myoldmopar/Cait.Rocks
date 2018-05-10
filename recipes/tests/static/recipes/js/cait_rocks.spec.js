
describe("caitRockController Testing Suite", function () {
    var $scope, mockCalendarService, mockRecipeService;
    beforeEach(module("caitRocksApp"));

    // Inject the real caitRockService
    beforeEach(inject(function ($controller, $rootScope, calendarService, recipeService) {
        $scope = $rootScope.$new();

        // Set mockStringService equal to the real service code.
        mockCalendarService = calendarService;
        mockRecipeService = recipeService;

        // Turn the mockStringService into a Jasmine spy and call a fake function that
        // basically does the same thing as the real one, but now this one is isolated
        // to just this test.
        spyOn(mockCalendarService, "addExcitement").and.returnValue("Doesn't matter what this says, we're not testing the result");
        spyOn(mockRecipeService, "addExcitement").and.returnValue("Doesn't matter what this says, we're not testing the result");
        $controller("caitRocksController", {$scope: $scope, calendarService: mockCalendarService, recipeService: mockRecipeService});
    }));

    it("should make a string more exciting", function () {
        $scope.excitement();

        // We only care that the function was called, we don't need to test the value that got returned.
        expect(mockCalendarService.addExcitement).toHaveBeenCalled();
    });
});