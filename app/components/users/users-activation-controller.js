(function() {
'use strict';

angular
    .module('angularjsTutorial.users')
    .controller('UsersActivationCtrl', UsersActivationCtrl);

UsersActivationCtrl.$inject = ['$location', '$routeParams', 'flash', 'PageSvc', 'SessionsService', 'UsersService'];

function UsersActivationCtrl($location, $routeParams, flash, pageSvc, sessionsService, usersService) {
    var ctrl = this;

    var userId = null;
    var token = null;

    initializeController();

    function initializeController() {
        pageSvc.setPageTitle('Activate user');
        userId = $routeParams.id;
        token = $routeParams.token;

        usersService.activateUser(userId, token)
            .then(function(response) {
                sessionsService.login(response.user);
                flash.success = response.message;
                $location.path('/users/' + userId).replace();
            }).catch(function(err) {
                flash.error = err;
                $location.path('/').replace();
            })
    }
}

})();
