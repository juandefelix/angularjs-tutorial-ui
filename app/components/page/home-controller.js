(function() {
'use strict';

angular
    .module('angularjsTutorial.page')
    .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['PageSvc', 'SessionsService', 'MicropostsService', 'UsersService'];

function HomeCtrl(pageSvc, sessionsService, micropostsService, usersService) {
    var ctrl = this;
    var requestSent;

    ctrl.userLoggedIn = false;
    ctrl.currentUser;
    ctrl.currentUserCount;
    ctrl.micropostContent;

    ctrl.pluralize = pluralize;
    ctrl.createMicropost = createMicropost;

    initializeController();

    function initializeController() {
        ctrl.currentUser = sessionsService.currentUser;
        ctrl.userLoggedIn = ctrl.currentUser !== null;
        pageSvc.setPageTitle('Home');
    }

    function pluralize(count, item) {
        if (count === 1) {
            return '1 ' + item;
        } else if (count < 1) {
            return '0 ' + item + 's';
        } else {
            return count + ' ' + item + 's';
        }
    }

    function createMicropost() {
        if (!requestSent) {
            requestSent = true;
            usersService.createMicropost(ctrl.currentUser.id, {content: ctrl.micropostContent})
                .then(function(user) {
                    requestSent = false;
                    sessionsService.login(user);
                    ctrl.currentUser = user;
                    ctrl.micropostContent = null;
                });
        }
    }
}

})();
