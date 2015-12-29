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
    ctrl.currentUser = {};
    ctrl.currentUserCount = 0;
    ctrl.micropostContent = null;
    ctrl.microposts = [];
    ctrl.pagination = { page: 1, pageItems: 7, total: 0 };

    ctrl.pluralize = pluralize;
    ctrl.createMicropost = createMicropost;
    ctrl.getMicropostFeedPage = getMicropostFeedPage;

    initializeController();

    function initializeController() {
        ctrl.currentUser = sessionsService.currentUser;
        ctrl.userLoggedIn = ctrl.currentUser !== null;
        pageSvc.setPageTitle('Home');

        if (ctrl.userLoggedIn) {
            getMicropostFeedPage(ctrl.pagination.pageNumber);
        }
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
                    getMicropostFeedPage(ctrl.pagination.pageNumber);
                });
        }
    }

    function getMicropostFeedPage(pageNumber) {
        ctrl.pagination.page = pageNumber;

        micropostsService.getMicropostsFeedPageForUser(ctrl.currentUser.id, pageNumber, ctrl.pagination.pageItems)
            .then(function(res) {
                ctrl.microposts = res.microposts;
                ctrl.pagination.total = res.count;
            });
    }
}

})();
