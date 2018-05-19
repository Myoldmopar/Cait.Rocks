describe('planner_controller testing', function () {
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

    // it('should initialize the controller using a specific list of method calls', function () {
    //     spyOn(mock_calendar_service, 'get_calendars').and.returnValue($scope.$q.when({'data': []}));
    //     spyOn(mock_recipe_service, 'get_recipes').and.returnValue($scope.$q.when({'data': ['recipes']}));
    //     $scope.init();
    //     $scope.$digest();
    //     expect(mock_recipe_service.get_recipes).toHaveBeenCalled();
    //     expect(mock_calendar_service.get_calendars).toHaveBeenCalled();
    //     expect($scope.recipe_list).toEqual(['recipes']);
    // });
    //
    // it('should initialize the controller using a specific list of method calls', function () {
    //     spyOn(mock_calendar_service, 'get_calendars').and.returnValue($scope.$q.when({'data': []}));
    //     $scope.init_calendar_only();
    //     $scope.$digest();
    //     expect(mock_calendar_service.get_calendars).toHaveBeenCalled();
    // });

    it('should get recipes through the recipe API service', function () {
        spyOn(mock_recipe_service, 'get_recipes').and.returnValue($scope.$q.when({'data': ['recipes']}));
        $scope.retrieve_recipes();
        $scope.$digest();
        expect(mock_recipe_service.get_recipes).toHaveBeenCalled();
        expect($scope.recipe_list).toEqual(['recipes']);
    });

    it('should get month data when there isn\'t a currently selected calendar', function () {
        $scope.selected_calendar = undefined;
        $scope.get_month_data();
        // nothing should happen, this process should just complete successfully
    });

    it('should get month data for the current calendar through the calendar API service', function () {
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'data': {'num_weeks': 5}}));
        $scope.selected_calendar = {'id': 1};
        $scope.get_month_data();
        $scope.$digest();
        expect(mock_calendar_service.get_calendar_monthly_data).toHaveBeenCalled();
        expect($scope.month).toEqual({'num_weeks': 5});
        expect($scope.num_weeks).toEqual(5);
    });

    it('should get calendars through the calendar API service without a target id', function () {
        spyOn(mock_calendar_service, 'get_calendars').and.returnValue($scope.$q.when({'data': [{'id': 1}, {'id': 2}]}));
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'data': {'num_weeks': 5}}));
        $scope.initialize_to_calendar = undefined;
        $scope.get_calendars();
        $scope.$digest();
        expect(mock_calendar_service.get_calendars).toHaveBeenCalled();
        expect($scope.selected_calendar.id).toEqual(2);
    });

    it('should get calendars through the calendar API service with a target id', function () {
        spyOn(mock_calendar_service, 'get_calendars').and.returnValue($scope.$q.when({'data': [{'id': 1}, {'id': 2}]}));
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'data': {'num_weeks': 5}}));
        $scope.initialize_to_calendar = 1;
        $scope.get_calendars();
        $scope.$digest();
        expect(mock_calendar_service.get_calendars).toHaveBeenCalled();
        expect($scope.selected_calendar.id).toEqual(1);
    });

    it('should update the recipe id as if a drop-down was selected', function () {
        spyOn(mock_calendar_service, 'update_calendar_recipe_id').and.returnValue($scope.$q.when({}));
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'data': {'num_weeks': 5}}));
        $scope.selected_calendar = {'id': 1};
        $scope.month = {'data': [[{recipe0: {id: 0}, recipe1: {id: 1}, date_number: 1}], [{recipe0: {id: 2}, recipe1: {id: 3}, date_number: 2}]]};
        $scope.select_recipe_id(0, 0, 0, 1);
        $scope.$digest();
        expect(mock_calendar_service.update_calendar_recipe_id).toHaveBeenCalled();
        expect(mock_calendar_service.update_calendar_recipe_id).toHaveBeenCalledWith(1, 1, 0, 0);
    });

    it('should clear the recipe id as if a clear button was pressed', function () {
        spyOn(mock_calendar_service, 'update_calendar_recipe_id').and.returnValue($scope.$q.when({}));
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'data': {'num_weeks': 5}}));
        $scope.selected_calendar = {'id': 1};
        $scope.month = {'data': [[{recipe0: {id: 0}, recipe1: {id: 1}, date_number: 1}], [{recipe0: {id: 2}, recipe1: {id: 3}, date_number: 2}]]};
        $scope.clear_recipe_id(0, 1, 0, 2);
        $scope.$digest();
        expect(mock_calendar_service.update_calendar_recipe_id).toHaveBeenCalled();
        expect(mock_calendar_service.update_calendar_recipe_id).toHaveBeenCalledWith(1, 2, 0, 0);
        // console.log($scope.month.data);
        // expect($scope.month.data[0][1].recipe0).toBeNull();  // TODO: Better testing here; also test actual DOM events like dropdown selections
    });

    it('should add a new calendar based on $scope variables which are usually models on user inputs', function () {
        spyOn(mock_calendar_service, 'post_calendar').and.returnValue($scope.$q.when({}));
        spyOn(mock_calendar_service, 'get_calendars').and.returnValue($scope.$q.when({data: []}));
        spyOn(mock_calendar_service, 'get_current_user').and.returnValue($scope.$q.when({data: {id: 1}}));
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
        expect($scope.add_calendar_error_message).toBeTruthy();
        // year too low
        $scope.clear_cal_error();
        $scope.calendar_year = 2015;
        $scope.calendar_month = 5;
        $scope.calendar_name = 'name';
        $scope.add_calendar();
        expect($scope.add_calendar_error_message).toBeTruthy();
        // year too high
        $scope.clear_cal_error();
        $scope.calendar_year = 2032;
        $scope.calendar_month = 5;
        $scope.calendar_name = 'name';
        $scope.add_calendar();
        expect($scope.add_calendar_error_message).toBeTruthy();
    });

    it('should fail to add a calendar for bad months', function () {
        // null month
        $scope.clear_cal_error();
        $scope.calendar_year = 2019;
        $scope.calendar_month = null;
        $scope.calendar_name = 'name';
        $scope.add_calendar();
        expect($scope.add_calendar_error_message).toBeTruthy();
        // month too low
        $scope.clear_cal_error();
        $scope.calendar_year = 2019;
        $scope.calendar_month = 0;
        $scope.calendar_name = 'name';
        $scope.add_calendar();
        expect($scope.add_calendar_error_message).toBeTruthy();
        // month too high
        $scope.clear_cal_error();
        $scope.calendar_year = 2019;
        $scope.calendar_month = 13;
        $scope.calendar_name = 'name';
        $scope.add_calendar();
        expect($scope.add_calendar_error_message).toBeTruthy();
    });

    it('should fail to add a calendar for missing name', function () {
        // blank name
        $scope.clear_cal_error();
        $scope.calendar_year = 2019;
        $scope.calendar_month = 1;
        $scope.calendar_name = '';
        $scope.add_calendar();
        expect($scope.add_calendar_error_message).toBeTruthy();
        // null name
        $scope.clear_cal_error();
        $scope.calendar_year = 2019;
        $scope.calendar_month = 1;
        $scope.calendar_name = null;
        $scope.add_calendar();
        expect($scope.add_calendar_error_message).toBeTruthy();
        // undefined name
        $scope.clear_cal_error();
        $scope.calendar_year = 2019;
        $scope.calendar_month = 1;
        $scope.calendar_name = undefined;
        $scope.add_calendar();
        expect($scope.add_calendar_error_message).toBeTruthy();
    });

    it('should try to delete the current calendar but it doesn\'t exist', function () {
        $scope.selected_calendar = null;
        $scope.remove_calendar();
        $scope.$digest();
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

    // recipe list filter tests went here

    it('should clear the calendar error', function () {
        $scope.add_calendar_error_message = 'Hey there was an error!';
        $scope.clear_cal_error();
        expect($scope.add_calendar_error_message).toEqual(false);
    });

});