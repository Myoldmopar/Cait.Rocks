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

    it('should fail to get calendars due to http 400', function () {
        httpBackend.when('GET', '/planner/api/calendars/').respond(400, 'bad stuff');
        calendar_service.get_calendars().catch(
            function (response) {
                expect(response.data).toEqual('bad stuff');
            }
        );
        httpBackend.flush();
    });

    it('should get my calendars and return exactly what comes back from api on data member', function () {
        httpBackend.when('GET', '/planner/api/calendars/mine/').respond('stuff');
        calendar_service.get_my_calendars().then(function (response) {
            expect(response).toEqual('stuff');
        });
        httpBackend.flush();
    });

    it('should fail to get my calendars due to http 400', function () {
        httpBackend.when('GET', '/planner/api/calendars/mine/').respond(400, 'bad stuff');
        calendar_service.get_my_calendars().catch(
            function (response) {
                expect(response.data).toEqual('bad stuff');
            }
        );
        httpBackend.flush();
    });

    it('should get one calendar and return exactly what comes back from api on data member', function () {
        httpBackend.when('GET', '/planner/api/calendars/1/').respond('stuff');
        calendar_service.get_calendar(1).then(function (response) {
            expect(response).toEqual('stuff');
        });
        httpBackend.flush();
    });

    it('should fail to get one calendar due to http 400', function () {
        httpBackend.when('GET', '/planner/api/calendars/1/').respond(400, 'bad stuff');
        calendar_service.get_calendar(1).catch(
            function (response) {
                expect(response.data).toEqual('bad stuff');
            }
        );
        httpBackend.flush();
    });

    it('should get one calendar worth of data and return exactly what comes back from api on data member', function () {
        httpBackend.when('GET', '/planner/api/calendars/1/monthly_data/').respond('stuff1');
        calendar_service.get_calendar_monthly_data(1).then(function (response) {
            expect(response).toEqual('stuff1');
        });
        httpBackend.flush();
    });

    it('should fail to get one calendar due to http 400', function () {
        httpBackend.when('GET', '/planner/api/calendars/1/monthly_data/').respond(400, 'bad stuff1');
        calendar_service.get_calendar_monthly_data(1).catch(
            function (response) {
                expect(response.data).toEqual('bad stuff1');
            }
        );
        httpBackend.flush();
    });

    it('should create a new calendar and return exactly what comes back from api on data member', function () {
        httpBackend.when('POST', '/planner/api/calendars/').respond('whatever_server_responds');
        calendar_service.post_calendar(2018, 1, 'name').then(function (response) {
            expect(response).toEqual('whatever_server_responds');
        });
        httpBackend.flush();
    });

    it('should fail to create a new calendar due to http 400', function () {
        httpBackend.when('POST', '/planner/api/calendars/').respond(400, 'stupid_server_responds');
        calendar_service.post_calendar(2018, 1, 'name').catch(
            function (response) {
                expect(response.data).toEqual('stupid_server_responds');
            }
        );
        httpBackend.flush();
    });

    it('should update calendar recipe id and return exactly what comes back from api on data member', function () {
        httpBackend.when('PUT', '/planner/api/calendars/1/recipe_id/').respond('updated');
        calendar_service.update_calendar_recipe_id(1, 25, 0, 1).then(function (response) {
            expect(response).toEqual('updated');
        });
        httpBackend.flush();
    });

    it('should fail to update calendar due to http 400', function () {
        httpBackend.when('PUT', '/planner/api/calendars/1/recipe_id/').respond(400, 'NOT updated');
        calendar_service.update_calendar_recipe_id(1, 25, 0, 1).catch(
            function (response) {
                expect(response.data).toEqual('NOT updated');
            }
        );
        httpBackend.flush();
    });

    it('should delete one calendar and return exactly what comes back from api on data member', function () {
        httpBackend.when('DELETE', '/planner/api/calendars/1/').respond('deleted');
        calendar_service.delete_calendar(1).then(function (response) {
            expect(response).toEqual('deleted');
        });
        httpBackend.flush();
    });

    it('should fail to delete one calendar due to http 400', function () {
        httpBackend.when('DELETE', '/planner/api/calendars/1/').respond(400, 'un-deleted');
        calendar_service.delete_calendar(1).catch(
            function (response) {
                expect(response.data).toEqual('un-deleted');
            }
        );
        httpBackend.flush();
    });
});
