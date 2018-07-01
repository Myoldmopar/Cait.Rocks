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
        spyOn(mock_calendar_service, 'get_my_calendars').and.returnValue($scope.$q.when([]));
        spyOn(mock_recipe_service, 'get_recipes').and.returnValue($scope.$q.when(['recipes']));
        $scope.init();
        $scope.$digest();
        expect(mock_recipe_service.get_recipes).toHaveBeenCalled();
        expect(mock_calendar_service.get_my_calendars).toHaveBeenCalled();
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

    it('should fail to get recipes through the recipe API service', function () {
        spyOn(mock_recipe_service, 'get_recipes').and.returnValue($scope.$q.reject('recipes'));
        $scope.retrieve_recipes();
        $scope.$digest();
        expect(mock_recipe_service.get_recipes).toHaveBeenCalled();
        expect($scope.recipe_list).toEqual([]);
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

    it('should fail to get month data for the current calendar through the calendar API service', function () {
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.reject('reasons'));
        $scope.selected_calendar = {'id': 1};
        $scope.get_month_data();
        $scope.$digest();
        expect(mock_calendar_service.get_calendar_monthly_data).toHaveBeenCalled();
        expect($scope.calendar_error_message).toBeTruthy();
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

    it('should get calendars through the calendar API service', function () {
        spyOn(mock_calendar_service, 'get_my_calendars').and.returnValue($scope.$q.when([{'id': 1}, {'id': 2}]));
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'num_weeks': 5}));
        $scope.initialize_to_calendar = undefined;
        $scope.retrieve_calendars();
        $scope.$digest();
        expect(mock_calendar_service.get_my_calendars).toHaveBeenCalled();
        expect($scope.selected_calendar.id).toEqual(2);
    });

    it('should fail to get calendars through the calendar API service', function () {
        spyOn(mock_calendar_service, 'get_my_calendars').and.returnValue($scope.$q.reject('reasons'));
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'num_weeks': 5}));
        $scope.initialize_to_calendar = undefined;
        $scope.calendar_error_message = '';
        $scope.retrieve_calendars();
        $scope.$digest();
        expect(mock_calendar_service.get_my_calendars).toHaveBeenCalled();
        expect($scope.calendar_error_message).toBeTruthy();
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
        $scope.month = {
            'data': [[{recipe0: {id: 0}, recipe1: {id: 1}, date_number: 1}], [{
                recipe0: {id: 2},
                recipe1: {id: 3},
                date_number: 2
            }]]
        };
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
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(mock_calendar_service, 'update_calendar_recipe_id').and.returnValue($scope.$q.when({}));
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'data': {'num_weeks': 5}}));
        $scope.selected_calendar = {'id': 1};
        $scope.month = {
            'data': [[{recipe0: {id: 0}, recipe1: {id: 1}, date_number: 1}], [{
                recipe0: {id: 2},
                recipe1: {id: 3},
                date_number: 2
            }]]
        };
        $scope.clear_recipe_id(0, 1, 0, 2);
        $scope.$digest();
        expect(mock_calendar_service.update_calendar_recipe_id).toHaveBeenCalled();
        expect(mock_calendar_service.update_calendar_recipe_id).toHaveBeenCalledWith(1, 2, 0, 0);
        // we aren't actually updating anything on the database, so the best we can do is to verify that it tried to call the right service method
        expect(mock_calendar_service.get_calendar_monthly_data).toHaveBeenCalled();
    });

    it('should fail to clear the recipe id when a clear button was pressed', function () {
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(mock_calendar_service, 'update_calendar_recipe_id').and.returnValue($scope.$q.reject('reasons'));
        $scope.selected_calendar = {'id': 1};
        $scope.month = {
            'data': [[{recipe0: {id: 0}, recipe1: {id: 1}, date_number: 1}], [{
                recipe0: {id: 2},
                recipe1: {id: 3},
                date_number: 2
            }]]
        };
        $scope.clear_recipe_id(0, 1, 0, 2);
        $scope.$digest();
        expect(mock_calendar_service.update_calendar_recipe_id).toHaveBeenCalled();
        expect(mock_calendar_service.update_calendar_recipe_id).toHaveBeenCalledWith(1, 2, 0, 0);
        expect($scope.calendar_error_message).toBeTruthy();
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
        spyOn(mock_calendar_service, 'get_my_calendars').and.returnValue($scope.$q.when([]));
        $scope.calendar_year = 2018;
        $scope.calendar_month = 5;
        $scope.calendar_name = 'Hey';
        $scope.add_calendar();
        $scope.$digest();
        expect(mock_calendar_service.post_calendar).toHaveBeenCalled();
        expect(mock_calendar_service.post_calendar).toHaveBeenCalledWith(2018, 5, 'Hey');
    });

    it('should fail to add a new calendar because the POST failed', function () {
        spyOn(mock_calendar_service, 'post_calendar').and.returnValue($scope.$q.reject('reasons'));
        spyOn(mock_calendar_service, 'get_my_calendars').and.returnValue($scope.$q.when([]));
        $scope.calendar_year = 2018;
        $scope.calendar_month = 5;
        $scope.calendar_name = 'Hey';
        $scope.calendar_error_message = '';
        $scope.add_calendar();
        $scope.$digest();
        expect(mock_calendar_service.post_calendar).toHaveBeenCalled();
        expect(mock_calendar_service.post_calendar).toHaveBeenCalledWith(2018, 5, 'Hey');
        expect($scope.calendar_error_message).toBeTruthy();
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
        spyOn(window, 'confirm').and.returnValue(false);
        $scope.selected_calendar = {id: 1, nickname: 'Jo month', year: 2017, month: 3};
        $scope.remove_calendar();
        expect($scope.selected_calendar.id).toEqual(1);
    });

    it('should delete the current calendar', function () {
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(mock_calendar_service, 'delete_calendar').and.returnValue($scope.$q.when({}));
        spyOn(mock_calendar_service, 'get_my_calendars').and.returnValue($scope.$q.when({'data': []}));
        $scope.selected_calendar = {id: 1, nickname: 'Jo month', year: 2017, month: 3};
        $scope.remove_calendar();
        $scope.$digest();
        expect(mock_calendar_service.delete_calendar).toHaveBeenCalled();
        expect(mock_calendar_service.delete_calendar).toHaveBeenCalledWith(1);
    });

    it('should fail to delete the current calendar', function () {
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(mock_calendar_service, 'delete_calendar').and.returnValue($scope.$q.reject('reasons'));
        $scope.selected_calendar = {id: 1, nickname: 'Jo month', year: 2017, month: 3};
        $scope.calendar_error_message = '';
        $scope.remove_calendar();
        $scope.$digest();
        expect(mock_calendar_service.delete_calendar).toHaveBeenCalled();
        expect(mock_calendar_service.delete_calendar).toHaveBeenCalledWith(1);
        expect($scope.calendar_error_message).toBeTruthy();
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

describe('planner_controller testing clear_filter function', function () {
    var $scope, mock_recipe_service, httpBackend;

    beforeEach(module('cait_rocks_app'));

    beforeEach(function () {
        var recipeTable =
            '<table id="recipe_list_table">' +
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
        document.body.removeChild(document.getElementById('recipe_list_table'));
    });

    beforeEach(inject(function ($controller, $rootScope, recipe_service, $httpBackend, $q) {
        $scope = $rootScope.$new();
        mock_recipe_service = recipe_service;
        httpBackend = $httpBackend;
        $scope.$q = $q;
        $controller('planner_controller', {
            $scope: $scope,
            recipe_service: mock_recipe_service
        });
    }));

    it('should clear the filter variable', function () {
        $scope.filter_text = 'abc';
        $scope.clear_filter();
        expect($scope.filter_text).toEqual('');
    });
});

describe('planner_controller testing delete calendar confirmation function', function () {
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

    it('should get positive delete confirmation from the user', function () {
        spyOn(window, 'confirm').and.returnValue(true);
        expect($scope.confirm_calendar_delete()).toEqual(true);
    });

    it('should get negative delete confirmation from the user', function () {
        spyOn(window, 'confirm').and.returnValue(false);
        expect($scope.confirm_calendar_delete()).toEqual(false);
    });
});

describe('planner_controller testing delete recipe confirmation function', function () {
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

    it('should get positive delete confirmation from the user', function () {
        spyOn(window, 'confirm').and.returnValue(true);
        expect($scope.confirm_recipe_delete()).toEqual(true);
    });

    it('should get negative delete confirmation from the user', function () {
        spyOn(window, 'confirm').and.returnValue(false);
        expect($scope.confirm_recipe_delete()).toEqual(false);
    });
});

describe('planner_controller testing add_blank_recipe function', function () {
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

    it('should create a new blank recipe using scope variables', function () {
        spyOn(mock_recipe_service, 'post_blank_recipe').and.returnValue($scope.$q.when({}));
        spyOn(mock_recipe_service, 'get_recipes').and.returnValue($scope.$q.when(['recipes']));
        $scope.blank_recipe_title = 'Recipe Title';
        $scope.add_blank_recipe();
        $scope.$digest();
        expect(mock_recipe_service.post_blank_recipe).toHaveBeenCalled();
        expect(mock_recipe_service.post_blank_recipe).toHaveBeenCalledWith('Recipe Title');
        expect($scope.blank_recipe_title).toEqual('');
    });

    it('should fail to create a new blank recipe because the POST failed', function () {
        spyOn(mock_recipe_service, 'post_blank_recipe').and.returnValue($scope.$q.reject('reasons'));
        $scope.blank_recipe_title = 'Recipe Title';
        $scope.add_blank_recipe();
        $scope.$digest();
        expect(mock_recipe_service.post_blank_recipe).toHaveBeenCalled();
        expect(mock_recipe_service.post_blank_recipe).toHaveBeenCalledWith('Recipe Title');
        expect($scope.calendar_error_message).toBeTruthy();
    });

    it('should fail to create a new blank recipe because the title is blank', function () {
        spyOn(mock_recipe_service, 'post_blank_recipe').and.returnValue($scope.$q.when({}));
        $scope.blank_recipe_title = '';
        $scope.add_blank_recipe();
        $scope.$digest();
        expect($scope.calendar_error_message).toBeTruthy();
    });
});

describe('planner loading spinner function responds to underlying flags', function () {
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

   it('should turn on whenever the anything is loading', function () {
       $scope.loading_calendars = false;
       $scope.loading_recipes = false;
       $scope.loading_month_data = true;
       expect($scope.show_loading_spinner()).toBeTruthy();
       $scope.loading_calendars = false;
       $scope.loading_recipes = true;
       $scope.loading_month_data = false;
       expect($scope.show_loading_spinner()).toBeTruthy();
       $scope.loading_calendars = true;
       $scope.loading_recipes = false;
       $scope.loading_month_data = false;
       expect($scope.show_loading_spinner()).toBeTruthy();
       $scope.loading_calendars = false;
       $scope.loading_recipes = true;
       $scope.loading_month_data = true;
       expect($scope.show_loading_spinner()).toBeTruthy();
       $scope.loading_calendars = true;
       $scope.loading_recipes = false;
       $scope.loading_month_data = true;
       expect($scope.show_loading_spinner()).toBeTruthy();
       $scope.loading_calendars = true;
       $scope.loading_recipes = true;
       $scope.loading_month_data = false;
       expect($scope.show_loading_spinner()).toBeTruthy();
       $scope.loading_calendars = true;
       $scope.loading_recipes = true;
       $scope.loading_month_data = true;
       expect($scope.show_loading_spinner()).toBeTruthy();
   });

   it('should turn off when all flags are off', function () {
       $scope.loading_calendars = false;
       $scope.loading_recipes = false;
       $scope.loading_month_data = false;
       expect($scope.show_loading_spinner()).toBeFalsy();
   })
});
