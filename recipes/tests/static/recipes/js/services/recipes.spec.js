
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
            expect(response).toEqual('yummy recipes');
        });
        httpBackend.flush();
    });

    it('should get a single recipe and return exactly what comes back from api on data member', function () {
        httpBackend.when('GET', '/planner/api/recipes/1/').respond('yummy recipe');
        recipe_service.get_recipe(1).then(function (response) {
            expect(response).toEqual('yummy recipe');
        });
        httpBackend.flush();
    });

    it('should post a blank recipe and return exactly what comes back from api on data member', function () {
        httpBackend.when('POST', '/planner/api/recipes/').respond('yummy recipe');
        recipe_service.post_blank_recipe(1).then(function (response) {
            expect(response).toEqual('yummy recipe');
        });
        httpBackend.flush();
    });
});