﻿//http://www.slideshare.net/iquark/tdd-basics-with-angular-and-jasmine?related=2
//http://jsfiddle.net/kFLuV/1/

angular.module('app', [])
 .filter('encode', function () {
     return function (input) {
         return encodeURI(input);
     };

 });

describe('Testing', function () {
    var encodeFilter;

    beforeEach(module('app'));

    beforeEach(inject(function ($filter) {
        encodeFilter = $filter('encode');
    }));

    it('should encode a URL with unusual characters', function () {
        var url = 'http://www.foo.com/234234/Build & Jones éí%';
        var urlExpected = 'http://www.foo.com/234234/Build%20&%20Jones%20%C3%A9%C3%AD%25';

        expect(encodeFilter(url)).toBe(urlExpected);
    });
});
