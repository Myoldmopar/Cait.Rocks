
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

    it('should try to get recipes but fail due to HTTP call', function () {
        httpBackend.when('GET', '/planner/api/recipes/').respond(400, 'eww');
        recipe_service.get_recipes().catch(
            function (response) {
                expect(response.data).toEqual('eww');
            }
        );
        httpBackend.flush();
    });

    it('should get a single recipe and return exactly what comes back from api on data member', function () {
        httpBackend.when('GET', '/planner/api/recipes/1/').respond('yummy recipe');
        recipe_service.get_recipe(1).then(function (response) {
            expect(response).toEqual('yummy recipe');
        });
        httpBackend.flush();
    });

    it('should try to get a single recipe but fail due to HTTP call', function () {
        httpBackend.when('GET', '/planner/api/recipes/1/').respond(400, 'yuck');
        recipe_service.get_recipe(1).catch(
            function (response) {
                expect(response.data).toEqual('yuck');
            }
        );
        httpBackend.flush();
    });

    it('should post a blank recipe and return exactly what comes back from api on data member', function () {
        httpBackend.when('POST', '/planner/api/recipes/').respond('yummy recipe');
        recipe_service.post_blank_recipe(1).then(function (response) {
            expect(response).toEqual('yummy recipe');
        });
        httpBackend.flush();
    });

    it('should try to duplicate a recipe name through the blank recipe endpoint but fail', function () {
       httpBackend.when('POST', '/planner/api/recipes/').respond(400, 'bad');
       recipe_service.post_blank_recipe('name').catch(
           function (response) {
               expect(response.data).toEqual('bad');
           }
       );
       httpBackend.flush();
    });
});
