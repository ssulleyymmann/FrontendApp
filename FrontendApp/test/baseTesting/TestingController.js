//http://jsfiddle.net/ntFKL/
var app = angular.module('app', []);

app.controller('NewUserCtrl', function ($scope) {
    $scope.user = {
        name: null,
        lastname: null,
        username: null
    };

    // generates the username whether both the name, or the lastname changes
    // always in lowercase
    $scope.$watch('user.name', function () {
        updateUserName();
    });

    $scope.$watch('user.lastname', function () {
        updateUserName();
    });

    var updateUserName = function () {
        var name = $scope.user.name;
        var lastname = $scope.user.lastname;

        $scope.user.username = (name !== null) ? name : '';
        $scope.user.username += (lastname !== null) ? lastname : '';

        $scope.user.username = $scope.user.username.toLowerCase();
    }

});

describe('testing directive password', function () {
    var scope, newUserCtrl, name = 'John', lastname = 'Doe';

    beforeEach(module('app'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope;

        newUserCtrl = $controller('NewUserCtrl', {
            $scope: scope
        });
    }));

    it("should initially have a user with all fields empty", function () {
        expect(scope.user.name).toBeNull();
    });

    it("should have the same name as user name in lowercase when the lastname is null", function () {
        scope.user.name = name;
        scope.$apply();
        expect(scope.user.username).toBe(name.toLowerCase());
    });

    it("should have the same name as user name in lowercase when the lastname is null", function () {
        scope.user.name = name;
        scope.user.lastname = lastname;
        scope.$apply();
        expect(scope.user.username).toBe((name + lastname).toLowerCase());
    });
});