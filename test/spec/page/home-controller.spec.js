describe('Page home controller', function() {

    beforeEach(module('angularjsTutorial.page'));

    var HomeCtrl;
    var rootScope;

    beforeEach(angular.mock.module(function($provide) {
        $provide.service('SessionsService', function() {
            return { currentUser: null };
        });
    }));

    beforeEach(inject(function($controller, $rootScope) {
        HomeCtrl = $controller('HomeCtrl', {});
        rootScope = $rootScope.$new();
    }));

    it('should be initialized', function() {
        expect(rootScope.title).toBe('Home - AngularJS Tutorial');
        expect(HomeCtrl.userLoggedIn).toBe(false);
    });
});
