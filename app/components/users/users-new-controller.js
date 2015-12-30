(function() {
'use strict';

angular
    .module('angularjsTutorial.users')
    .controller('UsersNewCtrl', UsersNewCtrl);

UsersNewCtrl.$inject = ['$location', 'PageSvc', 'SessionsService', 'UsersService', 'flash'];

function UsersNewCtrl($location, pageSvc, sessionsService, usersService, flash) {
    var ctrl = this;

    ctrl.newUser = {};
    ctrl.confirmation = null;

    ctrl.createUser = createUser;
    ctrl.isNameUnique = isNameUnique;
    ctrl.isEmailUnique = isEmailUnique;

    var requestSent = false;

    initializeController();

    function createUser() {
        if (!requestSent) {
            requestSent = true;
            usersService.createUser(ctrl.newUser)
                .then(function(res) {
                    requestSent = false;
                    flash.success = res.message;
                    $location.path('/').replace();
                });
        }
    }

    function isNameUnique(value) {
        return usersService.isNameUnique(value);
    }

    function isEmailUnique(value) {
        return usersService.isEmailUnique(value);
    }

    function initializeController() {
        pageSvc.setPageTitle('Sign up');
        if (sessionsService.currentUser) {
            $location.path(usersService.userPath(sessionsService.currentUser)).replace();
        }
    }
}

})();
