describe('month_detail_controller testing get_month_data function', function () {
    var $scope, mock_calendar_service;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, calendar_service, $q) {
        $scope = $rootScope.$new();
        mock_calendar_service = calendar_service;
        $scope.$q = $q;
        $controller('month_detail_controller', {
            $scope: $scope,
            calendar_service: mock_calendar_service
        });
    }));

    it('should try to get month data when there isn\'t a currently selected calendar', function () {
        $scope.selected_calendar = undefined;
        $scope.get_month_data();
        $scope.$digest();
        expect($scope.selected_calendar).toBeFalsy();
    });

    it('should get month data successfully', function () {
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'num_weeks': 5}));
        $scope.selected_calendar = {id: 1};
        $scope.get_month_data();
        $scope.$digest();
        expect($scope.num_weeks).toEqual(5);
    });

    it('should fail to get month data due to bad api response', function () {
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.reject('reasons'));
        $scope.selected_calendar = {id: 1};
        $scope.get_month_data();
        $scope.$digest();
        expect($scope.calendar_error_message).toBeTruthy();
    });

});

describe('month_detail_controller testing retrieve_calendar function', function () {
    var $scope, mock_calendar_service;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, calendar_service, $q) {
        $scope = $rootScope.$new();
        mock_calendar_service = calendar_service;
        $scope.$q = $q;
        $controller('month_detail_controller', {
            $scope: $scope,
            calendar_service: mock_calendar_service
        });
    }));

    it('should get calendar through the calendar API service', function () {
        spyOn(mock_calendar_service, 'get_calendar').and.returnValue($scope.$q.when({'id': 1}));
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'num_weeks': 5}));
        $scope.initialize_to_calendar = 1;
        $scope.retrieve_calendar();
        $scope.$digest();
        expect(mock_calendar_service.get_calendar).toHaveBeenCalled();
        expect($scope.selected_calendar.id).toEqual(1);
    });

    it('should fail to get a calendar through the calendar API service', function () {
        spyOn(mock_calendar_service, 'get_calendar').and.returnValue($scope.$q.reject('reasons'));
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'num_weeks': 5}));
        $scope.selected_calendar = undefined;
        $scope.retrieve_calendar();
        $scope.$digest();
        expect(mock_calendar_service.get_calendar).toHaveBeenCalled();
        expect($scope.selected_calendar).toBeFalsy();
    });

});