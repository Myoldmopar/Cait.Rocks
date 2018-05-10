
describe("caitRockController Testing Suite", function () {
    var $scope, mockCalendarService;
    beforeEach(module("caitRocksApp"));

    // Inject the real caitRockService
    beforeEach(inject(function ($controller, $rootScope, calendarService) {// , calenderService) {
        $scope = $rootScope.$new();

        // Set mockStringService equal to the real service code.
        mockCalendarService = calendarService;
        //mockCalendarService = calenderService;

        // Turn the mockStringService into a Jasmine spy and call a fake function that
        // basically does the same thing as the real one, but now this one is isolated
        // to just this test.
        spyOn(mockCalendarService, "addExcitement").and.returnValue("Doesn't matter what this says, we're not testing the result");
        $controller("caitRockController", {$scope: $scope, calendarService: mockCalendarService});
    }));

    it("should make a string more exciting", function () {
        var boringString = "Hey";
        $scope.excitement(boringString);

        // We only care that the function was called, we don't need to test the value that got returned.
        expect(mockCalendarService.addExcitement).toHaveBeenCalled();
    });
});