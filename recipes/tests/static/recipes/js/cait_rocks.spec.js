describe("caitRockController Testing Suite", function () {
    var $scope, mockCalendarService, mockRecipeService, httpBackend;

    beforeEach(module("caitRocksApp"));

    // Inject the real caitRockService
    beforeEach(inject(function ($controller, $rootScope, calendarService, recipeService, $httpBackend, $q) {
        // I don't necessary like having to spy on these things up here before I call controller,
        // but since I have init code at the bottom of the controller, I have to mock things ahead of time
        // Sometime maybe I'll switch to using ng-init better and avoid the init calls
        $scope = $rootScope.$new();
        mockCalendarService = calendarService;
        spyOn(mockCalendarService, 'get_calendars').and.returnValue($q.when({'data': []}));
        spyOn(mockCalendarService, 'get_calendar_monthly_data').and.returnValue($q.when({'data': {'num_weeks': 5}}));
        mockRecipeService = recipeService;
        spyOn(mockRecipeService, 'get_recipes').and.returnValue($q.when({'data': ['recipes']}));
        httpBackend = $httpBackend;
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

    afterEach(function () {
        document.body.removeChild(document.getElementById('recipeListTable'));
    });

    it("should get recipes through the recipe API service", function () {
        $scope.retrieve_recipes();
        expect(mockRecipeService.get_recipes).toHaveBeenCalled();
        $scope.$digest();
        expect($scope.recipe_list).toEqual(['recipes']);
    });

    it("should get month data for the current calendar through the calendar API service", function () {
        $scope.selectedCalendar = {'id': 1};
        $scope.get_month_data();
        expect(mockCalendarService.get_calendar_monthly_data).toHaveBeenCalled();
        $scope.$digest();
        expect($scope.month).toEqual({'num_weeks': 5});
        expect($scope.num_weeks).toEqual(5);
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

describe("calendarService Testing Suite", function () {
    var calendarService, httpBackend;
    beforeEach(module("caitRocksApp"));

    beforeEach(inject(function (_calendarService_, $httpBackend) {
        calendarService = _calendarService_;
        httpBackend = $httpBackend;
    }));

    it("should get calendars and return exactly what comes back from api on data member", function () {
        httpBackend.when("GET", "/planner/api/calendars/").respond("stuff");
        calendarService.get_calendars().then(function (response) {
            expect(response.data).toEqual("stuff");
        });
        httpBackend.flush();
    });

    it("should get one calendar and return exactly what comes back from api on data member", function () {
        httpBackend.when("GET", "/planner/api/calendars/1/monthly_data/").respond("stuff1");
        calendarService.get_calendar_monthly_data(1).then(function (response) {
            expect(response.data).toEqual("stuff1");
        });
        httpBackend.flush();
    });

    it("should create a new calendar and return exactly what comes back from api on data member", function () {
        httpBackend.when("POST", "/planner/api/calendars/").respond("whatever_server_responds");
        calendarService.post_calendar(2018, 1, "name").then(function (response) {
            expect(response.data).toEqual("whatever_server_responds");
        });
        httpBackend.flush();
    });

    it("should get one calendar and return exactly what comes back from api on data member", function () {
        httpBackend.when("PUT", '/planner/api/calendars/1/recipe_id/').respond("updated");
        calendarService.update_calendar_recipe_id(1, 25, 0, 1).then(function (response) {
            expect(response.data).toEqual("updated");
        });
        httpBackend.flush();
    });
});

describe("recipeService Testing Suite", function () {
    var recipeService, httpBackend;
    beforeEach(module("caitRocksApp"));

    beforeEach(inject(function (_recipeService_, $httpBackend) {
        recipeService = _recipeService_;
        httpBackend = $httpBackend;
    }));

    it("should get recipes and return exactly what comes back from api on data member", function () {
        httpBackend.when("GET", "/planner/api/recipes/").respond("yummy recipes");
        recipeService.get_recipes().then(function (response) {
            expect(response.data).toEqual("yummy recipes");
        });
        httpBackend.flush();
    });
});
