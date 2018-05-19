
describe('recipe_service testing', function () {
    var recipe_service, httpBackend;
    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function (_recipe_service_, $httpBackend) {
        recipe_service = _recipe_service_;
        httpBackend = $httpBackend;
    }));

    it('should get recipes and return exactly what comes back from api on data member', function () {
        httpBackend.when('GET', '/planner/api/recipes/').respond('yummy recipes');
        recipe_service.get_recipes().then(function (response) {
            expect(response.data).toEqual('yummy recipes');
        });
        httpBackend.flush();
    });

});
