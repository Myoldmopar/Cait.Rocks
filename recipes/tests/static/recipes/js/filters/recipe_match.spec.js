describe('recipe_match filter testing', function () {
    var recipe_match_filter, this_filter;

    beforeEach(module('cait_rocks_app'));

    beforeEach(inject(function ($filter) {
        recipe_match_filter = function () {
            return $filter('recipe_match');
        };
        this_filter = recipe_match_filter();
    }));

    var inputs = [
        {title: "beef", creator: "person", ingredients: ['foodA', 'foodB'], directions: 'Make first stuff'},
        {title: "chicken", creator: "other", ingredients: ['foodA', 'foodC'], directions: 'Make second stuff'}
    ];

    it('should return input on blank filter', function () {
        expect(this_filter(undefined, '')).toEqual(undefined);
        expect(this_filter([1, 2], '')).toEqual([1, 2]);
    });

    it('should return empty for a non-matching filter', function () {
        expect(this_filter(inputs, 'abc').length).toEqual(0);
    });

    it('should match based on title case insensitively', function () {
        expect(this_filter(inputs, 'NoOne')).toEqual([]);
        expect(this_filter(inputs, 'bee')).toEqual([inputs[0]]);
        expect(this_filter(inputs, 'chi')).toEqual([inputs[1]]);
        expect(this_filter(inputs, 'E')).toEqual([inputs[0], inputs[1]]);
    });

    it('should match based on creator case insensitively', function () {
        expect(this_filter(inputs, 'Me')).toEqual([]);
        expect(this_filter(inputs, 'pers')).toEqual([inputs[0]]);
        expect(this_filter(inputs, 'oth')).toEqual([inputs[1]]);
        expect(this_filter(inputs, 'E')).toEqual([inputs[0], inputs[1]]);
    });

    it('should match based on ingredients case insensitively', function () {
        expect(this_filter(inputs, 'foodE')).toEqual([]);
        expect(this_filter(inputs, 'foodB')).toEqual([inputs[0]]);
        expect(this_filter(inputs, 'FOODC')).toEqual([inputs[1]]);
        expect(this_filter(inputs, 'FooD')).toEqual([inputs[0], inputs[1]]);
    });

    it('should match based on directions case insensitively', function () {
        expect(this_filter(inputs, 'Making')).toEqual([]);
        expect(this_filter(inputs, 'first')).toEqual([inputs[0]]);
        expect(this_filter(inputs, 'second')).toEqual([inputs[1]]);
        expect(this_filter(inputs, 'stuFF')).toEqual([inputs[0], inputs[1]]);
    });

    it('should match based on multiple-token case insensitively', function () {
        expect(this_filter(inputs, 'Make everything')).toEqual([]);
        expect(this_filter(inputs, 'person MAKE')).toEqual([inputs[0]]);
        expect(this_filter(inputs, 'chickeN FOOd')).toEqual([inputs[1]]);
        expect(this_filter(inputs, 'MAKE food other')).toEqual([inputs[1]]);
        expect(this_filter(inputs, 'MAKE food')).toEqual([inputs[0], inputs[1]]);
        expect(this_filter(inputs, 'MAKE food stuff')).toEqual([inputs[0], inputs[1]]);
    });
});
