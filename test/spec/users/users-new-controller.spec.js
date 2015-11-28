describe('Users users new controller', function() {

    beforeEach(module('angularjsTutorial.users'));

    var usersNewCtrl;
    var rootScope;

    beforeEach(angular.mock.module(function($provide) {
        $provide.service('SessionsService', function() {
            return { currentUser: null };
        });
    }));

    beforeEach(inject(function($controller, $rootScope) {
        usersNewCtrl = $controller('UsersNewCtrl', {});
        rootScope = $rootScope.$new();
    }));

    it('should be initialized', function() {
        expect(rootScope.title).toBe('Sign up - AngularJS Tutorial');
    });
});
