describe('months_controller testing init function', function () {
    var $scope, mock_calendar_service;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, calendar_service, $q) {
        $scope = $rootScope.$new();
        mock_calendar_service = calendar_service;
        $scope.$q = $q;
        $controller('months_controller', {
            $scope: $scope,
            calendar_service: mock_calendar_service
        });
    }));

    it('should get month data successfully', function () {
        spyOn(mock_calendar_service, 'get_calendars').and.returnValue($scope.$q.when([{id: 1}, {id: 5}]));
        $scope.init();
        $scope.$digest();
        expect($scope.all_months.length).toEqual(2);
        expect($scope.calendar_error_message).toBeFalsy();
    });

    it('should fail to get month data due to bad api response', function () {
        spyOn(mock_calendar_service, 'get_calendars').and.returnValue($scope.$q.reject('reasons'));
        $scope.init();
        $scope.$digest();
        expect($scope.all_months.length).toEqual(0);
        expect($scope.calendar_error_message).toBeTruthy();
    });

});

describe('months_controller testing select_a_month function', function () {
    var $scope, mock_calendar_service;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($controller, $rootScope, calendar_service, $q) {
        $scope = $rootScope.$new();
        mock_calendar_service = calendar_service;
        $scope.$q = $q;
        $controller('months_controller', {
            $scope: $scope,
            calendar_service: mock_calendar_service
        });
    }));

    it('should get calendar through the calendar API service', function () {
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'num_weeks': 5}));
        $scope.selected_month = undefined;
        $scope.select_a_month(1);
        $scope.$digest();
        expect(mock_calendar_service.get_calendar_monthly_data).toHaveBeenCalled();
        expect($scope.selected_month.num_weeks).toEqual(5);
    });

    it('should fail to get a calendar through the calendar API service', function () {
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.reject('reasons'));
        $scope.selected_month = undefined;
        $scope.select_a_month(1);
        $scope.$digest();
        expect(mock_calendar_service.get_calendar_monthly_data).toHaveBeenCalled();
        expect($scope.selected_month).toBeFalsy();
    });

});
