describe('planner_controller testing init function', function () {
    var $scope, mock_calendar_service, mock_recipe_service, httpBackend;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, calendar_service, recipe_service, $httpBackend, $q) {
        $scope = $rootScope.$new();
        mock_calendar_service = calendar_service;
        mock_recipe_service = recipe_service;
        httpBackend = $httpBackend;
        $scope.$q = $q;
        $controller('planner_controller', {
            $scope: $scope,
            calendar_service: mock_calendar_service,
            recipe_service: mock_recipe_service
        });
    }));

    it('should initialize the controller using a specific list of method calls', function () {
        spyOn(mock_calendar_service, 'get_calendars').and.returnValue($scope.$q.when([]));
        spyOn(mock_recipe_service, 'get_recipes').and.returnValue($scope.$q.when(['recipes']));
        $scope.init();
        $scope.$digest();
        expect(mock_recipe_service.get_recipes).toHaveBeenCalled();
        expect(mock_calendar_service.get_calendars).toHaveBeenCalled();
        expect($scope.recipe_list).toEqual(['recipes']);
    });
});

describe('planner_controller testing retrieve_recipes function', function () {
    var $scope, mock_calendar_service, mock_recipe_service, httpBackend;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, calendar_service, recipe_service, $httpBackend, $q) {
        $scope = $rootScope.$new();
        mock_calendar_service = calendar_service;
        mock_recipe_service = recipe_service;
        httpBackend = $httpBackend;
        $scope.$q = $q;
        $controller('planner_controller', {
            $scope: $scope,
            calendar_service: mock_calendar_service,
            recipe_service: mock_recipe_service
        });
    }));

    it('should get recipes through the recipe API service', function () {
        spyOn(mock_recipe_service, 'get_recipes').and.returnValue($scope.$q.when(['recipes']));
        $scope.retrieve_recipes();
        $scope.$digest();
        expect(mock_recipe_service.get_recipes).toHaveBeenCalled();
        expect($scope.recipe_list).toEqual(['recipes']);
    });
});

describe('planner_controller testing get_month_data function', function () {
    var $scope, mock_calendar_service, mock_recipe_service, httpBackend;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, calendar_service, recipe_service, $httpBackend, $q) {
        $scope = $rootScope.$new();
        mock_calendar_service = calendar_service;
        mock_recipe_service = recipe_service;
        httpBackend = $httpBackend;
        $scope.$q = $q;
        $controller('planner_controller', {
            $scope: $scope,
            calendar_service: mock_calendar_service,
            recipe_service: mock_recipe_service
        });
    }));

    it('should get month data when there isn\'t a currently selected calendar', function () {
        $scope.selected_calendar = undefined;
        $scope.get_month_data();
        // nothing should happen, this process should just complete successfully
    });

    it('should get month data for the current calendar through the calendar API service', function () {
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'num_weeks': 5}));
        $scope.selected_calendar = {'id': 1};
        $scope.get_month_data();
        $scope.$digest();
        expect(mock_calendar_service.get_calendar_monthly_data).toHaveBeenCalled();
        expect($scope.month).toEqual({'num_weeks': 5});
        expect($scope.num_weeks).toEqual(5);
    });
});

describe('planner_controller testing retrieve_calendars function', function () {
    var $scope, mock_calendar_service, mock_recipe_service, httpBackend;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, calendar_service, recipe_service, $httpBackend, $q) {
        $scope = $rootScope.$new();
        mock_calendar_service = calendar_service;
        mock_recipe_service = recipe_service;
        httpBackend = $httpBackend;
        $scope.$q = $q;
        $controller('planner_controller', {
            $scope: $scope,
            calendar_service: mock_calendar_service,
            recipe_service: mock_recipe_service
        });
    }));

    it('should get calendars through the calendar API service without a target id', function () {
        spyOn(mock_calendar_service, 'get_calendars').and.returnValue($scope.$q.when([{'id': 1}, {'id': 2}]));
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'num_weeks': 5}));
        $scope.initialize_to_calendar = undefined;
        $scope.retrieve_calendars();
        $scope.$digest();
        expect(mock_calendar_service.get_calendars).toHaveBeenCalled();
        expect($scope.selected_calendar.id).toEqual(2);
    });

    it('should get calendars through the calendar API service with a target id', function () {
        spyOn(mock_calendar_service, 'get_calendars').and.returnValue($scope.$q.when([{'id': 1}, {'id': 2}]));
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'num_weeks': 5}));
        $scope.initialize_to_calendar = 1;
        $scope.retrieve_calendars();
        $scope.$digest();
        expect(mock_calendar_service.get_calendars).toHaveBeenCalled();
        expect($scope.selected_calendar.id).toEqual(1);
    });
});

describe('planner_controller testing select_recipe_id function', function () {
    var $scope, mock_calendar_service, mock_recipe_service, httpBackend;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, calendar_service, recipe_service, $httpBackend, $q) {
        $scope = $rootScope.$new();
        mock_calendar_service = calendar_service;
        mock_recipe_service = recipe_service;
        httpBackend = $httpBackend;
        $scope.$q = $q;
        $controller('planner_controller', {
            $scope: $scope,
            calendar_service: mock_calendar_service,
            recipe_service: mock_recipe_service
        });
    }));

    it('should update the recipe id as if a drop-down was selected', function () {
        spyOn(mock_calendar_service, 'update_calendar_recipe_id').and.returnValue($scope.$q.when({}));
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'num_weeks': 5}));
        $scope.selected_calendar = {'id': 1};
        $scope.month = {'data': [[{recipe0: {id: 0}, recipe1: {id: 1}, date_number: 1}], [{recipe0: {id: 2}, recipe1: {id: 3}, date_number: 2}]]};
        $scope.select_recipe_id(0, 0, 0, 1);
        $scope.$digest();
        expect(mock_calendar_service.update_calendar_recipe_id).toHaveBeenCalled();
        expect(mock_calendar_service.update_calendar_recipe_id).toHaveBeenCalledWith(1, 1, 0, 0);
    });
});

describe('planner_controller testing clear_recipe_id function', function () {
    var $scope, mock_calendar_service, mock_recipe_service, httpBackend;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, calendar_service, recipe_service, $httpBackend, $q) {
        $scope = $rootScope.$new();
        mock_calendar_service = calendar_service;
        mock_recipe_service = recipe_service;
        httpBackend = $httpBackend;
        $scope.$q = $q;
        $controller('planner_controller', {
            $scope: $scope,
            calendar_service: mock_calendar_service,
            recipe_service: mock_recipe_service
        });
    }));

    it('should clear the recipe id as if a clear button was pressed', function () {
        spyOn(mock_calendar_service, 'update_calendar_recipe_id').and.returnValue($scope.$q.when({}));
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'data': {'num_weeks': 5}}));
        $scope.selected_calendar = {'id': 1};
        $scope.month = {'data': [[{recipe0: {id: 0}, recipe1: {id: 1}, date_number: 1}], [{recipe0: {id: 2}, recipe1: {id: 3}, date_number: 2}]]};
        $scope.clear_recipe_id(0, 1, 0, 2);
        $scope.$digest();
        expect(mock_calendar_service.update_calendar_recipe_id).toHaveBeenCalled();
        expect(mock_calendar_service.update_calendar_recipe_id).toHaveBeenCalledWith(1, 2, 0, 0);
        // we aren't actually updating anything on the database, so the best we can do is to verify that it tried to call the right service method
        expect(mock_calendar_service.get_calendar_monthly_data).toHaveBeenCalled();
    });
});

describe('planner_controller testing add_calendar function', function () {
    var $scope, mock_calendar_service, mock_recipe_service, httpBackend;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, calendar_service, recipe_service, $httpBackend, $q) {
        $scope = $rootScope.$new();
        mock_calendar_service = calendar_service;
        mock_recipe_service = recipe_service;
        httpBackend = $httpBackend;
        $scope.$q = $q;
        $controller('planner_controller', {
            $scope: $scope,
            calendar_service: mock_calendar_service,
            recipe_service: mock_recipe_service
        });
    }));

    it('should add a new calendar based on $scope variables which are usually models on user inputs', function () {
        spyOn(mock_calendar_service, 'post_calendar').and.returnValue($scope.$q.when({}));
        spyOn(mock_calendar_service, 'get_calendars').and.returnValue($scope.$q.when([]));
        spyOn(mock_calendar_service, 'get_current_user').and.returnValue($scope.$q.when({id: 1}));
        $scope.calendar_year = 2018;
        $scope.calendar_month = 5;
        $scope.calendar_name = 'Hey';
        $scope.add_calendar();
        $scope.$digest();
        expect(mock_calendar_service.post_calendar).toHaveBeenCalled();
        expect(mock_calendar_service.post_calendar).toHaveBeenCalledWith(2018, 5, 'Hey', 1);
    });

    it('should fail to add a calendar for bad years', function () {
        // null year
        $scope.clear_cal_error();
        $scope.calendar_year = null;
        $scope.calendar_month = 5;
        $scope.calendar_name = 'name';
        $scope.add_calendar();
        expect($scope.calendar_error_message).toBeTruthy();
        // year too low
        $scope.clear_cal_error();
        $scope.calendar_year = 2015;
        $scope.calendar_month = 5;
        $scope.calendar_name = 'name';
        $scope.add_calendar();
        expect($scope.calendar_error_message).toBeTruthy();
        // year too high
        $scope.clear_cal_error();
        $scope.calendar_year = 2032;
        $scope.calendar_month = 5;
        $scope.calendar_name = 'name';
        $scope.add_calendar();
        expect($scope.calendar_error_message).toBeTruthy();
    });

    it('should fail to add a calendar for bad months', function () {
        // null month
        $scope.clear_cal_error();
        $scope.calendar_year = 2019;
        $scope.calendar_month = null;
        $scope.calendar_name = 'name';
        $scope.add_calendar();
        expect($scope.calendar_error_message).toBeTruthy();
        // month too low
        $scope.clear_cal_error();
        $scope.calendar_year = 2019;
        $scope.calendar_month = 0;
        $scope.calendar_name = 'name';
        $scope.add_calendar();
        expect($scope.calendar_error_message).toBeTruthy();
        // month too high
        $scope.clear_cal_error();
        $scope.calendar_year = 2019;
        $scope.calendar_month = 13;
        $scope.calendar_name = 'name';
        $scope.add_calendar();
        expect($scope.calendar_error_message).toBeTruthy();
    });

    it('should fail to add a calendar for missing name', function () {
        // blank name
        $scope.clear_cal_error();
        $scope.calendar_year = 2019;
        $scope.calendar_month = 1;
        $scope.calendar_name = '';
        $scope.add_calendar();
        expect($scope.calendar_error_message).toBeTruthy();
        // null name
        $scope.clear_cal_error();
        $scope.calendar_year = 2019;
        $scope.calendar_month = 1;
        $scope.calendar_name = null;
        $scope.add_calendar();
        expect($scope.calendar_error_message).toBeTruthy();
        // undefined name
        $scope.clear_cal_error();
        $scope.calendar_year = 2019;
        $scope.calendar_month = 1;
        $scope.calendar_name = undefined;
        $scope.add_calendar();
        expect($scope.calendar_error_message).toBeTruthy();
    });
});

describe('planner_controller testing remove_calendar function', function () {
    var $scope, mock_calendar_service, mock_recipe_service, httpBackend;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, calendar_service, recipe_service, $httpBackend, $q) {
        $scope = $rootScope.$new();
        mock_calendar_service = calendar_service;
        mock_recipe_service = recipe_service;
        httpBackend = $httpBackend;
        $scope.$q = $q;
        $controller('planner_controller', {
            $scope: $scope,
            calendar_service: mock_calendar_service,
            recipe_service: mock_recipe_service
        });
    }));

    it('should try to delete the current calendar but it doesn\'t exist', function () {
        $scope.selected_calendar = null;
        $scope.remove_calendar();
        $scope.$digest();
        expect($scope.selected_calendar).toBeNull();
    });

    it('should try to delete the current calendar but get negative confirmation', function () {
        spyOn(mock_calendar_service, 'confirm_calendar_delete').and.returnValue(false);
        $scope.selected_calendar = {id: 1, nickname: 'Jo month', year: 2017, month: 3};
        $scope.remove_calendar();
        expect(mock_calendar_service.confirm_calendar_delete).toHaveBeenCalled();
    });

    it('should delete the current calendar', function () {
        spyOn(mock_calendar_service, 'confirm_calendar_delete').and.returnValue(true);
        spyOn(mock_calendar_service, 'delete_calendar').and.returnValue($scope.$q.when({}));
        spyOn(mock_calendar_service, 'get_calendars').and.returnValue($scope.$q.when({'data': []}));
        $scope.selected_calendar = {id: 1, nickname: 'Jo month', year: 2017, month: 3};
        $scope.remove_calendar();
        $scope.$digest();
        expect(mock_calendar_service.confirm_calendar_delete).toHaveBeenCalled();
        expect(mock_calendar_service.delete_calendar).toHaveBeenCalled();
        expect(mock_calendar_service.delete_calendar).toHaveBeenCalledWith(1);
    });
});

describe('planner_controller testing set_models_to_today function', function () {
    var $scope, mock_calendar_service, mock_recipe_service, httpBackend;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, calendar_service, recipe_service, $httpBackend, $q) {
        $scope = $rootScope.$new();
        mock_calendar_service = calendar_service;
        mock_recipe_service = recipe_service;
        httpBackend = $httpBackend;
        $scope.$q = $q;
        $controller('planner_controller', {
            $scope: $scope,
            calendar_service: mock_calendar_service,
            recipe_service: mock_recipe_service
        });
    }));

    it('should set models for today', function () {
        $scope.calendar_month = undefined;
        $scope.calendar_year = undefined;
        $scope.calendar_date = undefined;
        $scope.set_models_to_today();
        expect($scope.calendar_month).toBeTruthy();
        expect($scope.calendar_year).toBeTruthy();
        expect($scope.calendar_date).toBeTruthy();
    });
});

describe('planner_controller testing clear_cal_error function', function () {
    var $scope, mock_calendar_service, mock_recipe_service, httpBackend;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, calendar_service, recipe_service, $httpBackend, $q) {
        $scope = $rootScope.$new();
        mock_calendar_service = calendar_service;
        mock_recipe_service = recipe_service;
        httpBackend = $httpBackend;
        $scope.$q = $q;
        $controller('planner_controller', {
            $scope: $scope,
            calendar_service: mock_calendar_service,
            recipe_service: mock_recipe_service
        });
    }));

    it('should clear the calendar error', function () {
        $scope.calendar_error_message = 'Hey there was an error!';
        $scope.clear_cal_error();
        expect($scope.calendar_error_message).toEqual(false);
    });
});

// clear_filter and filter_table_rows function tests are just making sure the planner controller has these functions
// The implementation of these functions has been moved to a service...for now...it should be a directive I think
// The major testing of the underlying functionality is in the recipe_list controller test

describe('planner_controller testing clear_filter function', function () {
    var $scope, mock_calendar_service, mock_recipe_service, httpBackend;

    beforeEach(module('cait_rocks_app'));

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
        document.body.insertAdjacentHTML('afterbegin', recipeTable);

        var datasetBasedItem = '<div id="someSpecialID" data-weeknum="0" data-daynum="0" data-recipenum="0"></div>';
        document.body.insertAdjacentHTML('afterbegin', datasetBasedItem);
    });

    afterEach(function () {
        document.body.removeChild(document.getElementById('recipeListTable'));
    });

    beforeEach(inject(function ($controller, $rootScope, calendar_service, recipe_service, $httpBackend, $q) {
        $scope = $rootScope.$new();
        mock_calendar_service = calendar_service;
        mock_recipe_service = recipe_service;
        httpBackend = $httpBackend;
        $scope.$q = $q;
        $controller('planner_controller', {
            $scope: $scope,
            calendar_service: mock_calendar_service,
            recipe_service: mock_recipe_service
        });
    }));

    it('should clear the filter variable', function () {
        $scope.filterText = 'abc';
        $scope.clear_filter();
        expect($scope.filterText).toEqual('');
    });
});

describe('planner_controller testing filter_table_rows function', function () {
    var $scope, mock_calendar_service, mock_recipe_service, httpBackend;

    beforeEach(module('cait_rocks_app'));

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
        document.body.insertAdjacentHTML('afterbegin', recipeTable);

        var datasetBasedItem = '<div id="someSpecialID" data-weeknum="0" data-daynum="0" data-recipenum="0"></div>';
        document.body.insertAdjacentHTML('afterbegin', datasetBasedItem);
    });

    afterEach(function () {
        document.body.removeChild(document.getElementById('recipeListTable'));
    });

    beforeEach(inject(function ($controller, $rootScope, calendar_service, recipe_service, $httpBackend, $q) {
        $scope = $rootScope.$new();
        mock_calendar_service = calendar_service;
        mock_recipe_service = recipe_service;
        httpBackend = $httpBackend;
        $scope.$q = $q;
        $controller('planner_controller', {
            $scope: $scope,
            calendar_service: mock_calendar_service,
            recipe_service: mock_recipe_service
        });
    }));

    it('should ignore if the filter text is too short', function () {
        $scope.filterText = '';
        $scope.filter_table_rows();
        // literally shouldn't do anything, just wait until possibly more text is entered before filtering
    });
});
