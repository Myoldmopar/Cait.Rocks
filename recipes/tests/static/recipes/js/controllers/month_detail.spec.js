describe('month_detail_controller testing init function', function () {
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

    it('should initialize the controller for month detail', function () {
        spyOn(mock_calendar_service, 'get_calendars').and.returnValue($scope.$q.when({'data': [{'id': 1}, {'id': 2}]}));
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'data': {'num_weeks': 5}}));
        $scope.init();
        $scope.$digest();
        expect(mock_calendar_service.get_calendars).toHaveBeenCalled();
    });

});

describe('month_detail_controller testing retrieve_calendars function', function () {
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

    it('should get calendars through the calendar API service with a target id', function () {
        spyOn(mock_calendar_service, 'get_calendars').and.returnValue($scope.$q.when([{'id': 1}, {'id': 2}]));
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'num_weeks': 5}));
        $scope.initialize_to_calendar = 1;
        $scope.retrieve_calendars();
        $scope.$digest();
        expect(mock_calendar_service.get_calendars).toHaveBeenCalled();
        expect($scope.selected_calendar.id).toEqual(1);
    });

    it('should get calendars through the calendar API service without a target id', function () {
        // this isn't really useful on the page, but I would like to verify what happens
        // this will also go away once we remove the angular stuff from the month detail view
        spyOn(mock_calendar_service, 'get_calendars').and.returnValue($scope.$q.when([{'id': 1}, {'id': 2}]));
        spyOn(mock_calendar_service, 'get_calendar_monthly_data').and.returnValue($scope.$q.when({'num_weeks': 5}));
        $scope.retrieve_calendars();
        $scope.$digest();
        expect(mock_calendar_service.get_calendars).toHaveBeenCalled();
        expect($scope.selected_calendar.id).toEqual(2);
    });

});

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

    it('should get month data when there isn\'t a currently selected calendar', function () {
        $scope.selected_calendar = undefined;
        $scope.get_month_data();
        // nothing should happen, this process should just complete successfully
    });

});