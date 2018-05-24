describe('calendar_service testing', function () {
    var calendar_service, httpBackend;
    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function (_calendar_service_, $httpBackend) {
        calendar_service = _calendar_service_;
        httpBackend = $httpBackend;
    }));

    it('should get calendars and return exactly what comes back from api on data member', function () {
        httpBackend.when('GET', '/planner/api/calendars/').respond('stuff');
        calendar_service.get_calendars().then(function (response) {
            expect(response).toEqual('stuff');
        });
        httpBackend.flush();
    });

    it('should get one calendar and return exactly what comes back from api on data member', function () {
        httpBackend.when('GET', '/planner/api/calendars/1/monthly_data/').respond('stuff1');
        calendar_service.get_calendar_monthly_data(1).then(function (response) {
            expect(response).toEqual('stuff1');
        });
        httpBackend.flush();
    });

    it('should create a new calendar and return exactly what comes back from api on data member', function () {
        httpBackend.when('POST', '/planner/api/calendars/').respond('whatever_server_responds');
        calendar_service.post_calendar(2018, 1, 'name').then(function (response) {
            expect(response).toEqual('whatever_server_responds');
        });
        httpBackend.flush();
    });

    it('should update calendar recipe id and return exactly what comes back from api on data member', function () {
        httpBackend.when('PUT', '/planner/api/calendars/1/recipe_id/').respond('updated');
        calendar_service.update_calendar_recipe_id(1, 25, 0, 1).then(function (response) {
            expect(response).toEqual('updated');
        });
        httpBackend.flush();
    });

    it('should get positive delete confirmation from the user', function () {
        spyOn(window, 'confirm').and.returnValue(true);
        expect(calendar_service.confirm_calendar_delete()).toEqual(true);
    });

    it('should get negative delete confirmation from the user', function () {
        spyOn(window, 'confirm').and.returnValue(false);
        expect(calendar_service.confirm_calendar_delete()).toEqual(false);
    });

    it('should delete one calendar and return exactly what comes back from api on data member', function () {
        spyOn(window, 'confirm').and.returnValue(true);
        httpBackend.when('DELETE', '/planner/api/calendars/1/').respond('deleted');
        calendar_service.delete_calendar(1).then(function (response) {
            expect(response).toEqual('deleted');
        });
        httpBackend.flush();
    });
});
