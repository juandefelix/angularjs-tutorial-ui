(function() {
'use strict';

angular
    .module('angularjsTutorial')
    .run(Run)
    .config(Config);

Run.$inject = ['SessionsService'];
Config.$inject = ['$httpProvider', '$routeProvider'];

function Run(sessionsService) {
    sessionsService.initialize();
}

function Config($httpProvider, $routeProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    var initAuth = {
        auth: authFn
    };

    authFn.$inject = ['SessionsService'];

    function authFn(sessionsService) {
        return sessionsService.initAuthPromise;
    }

    $routeProvider
        .when('/home', {
            templateUrl: 'components/page/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'ctrl',
            resolve: initAuth
        })
        .when('/help', {
            templateUrl: 'components/page/help.html',
            controller: 'HelpCtrl',
            resolve: initAuth
        })
        .when('/about', {
            templateUrl: 'components/page/about.html',
            controller: 'AboutCtrl',
            resolve: initAuth
        })
        .when('/contact', {
            templateUrl: 'components/page/contact.html',
            controller: 'ContactCtrl',
            resolve: initAuth
        })
        .when('/sign-up', {
            templateUrl: 'components/users/users-new.html',
            controller: 'UsersNewCtrl',
            controllerAs: 'ctrl',
            resolve: initAuth
        })
        .when('/users', {
            templateUrl: 'components/users/users-index.html',
            controller: 'UsersIndexCtrl',
            controllerAs: 'ctrl',
            resolve: initAuth
        })
        .when('/users/:id', {
            templateUrl: 'components/users/users-show.html',
            controller: 'UsersShowCtrl',
            controllerAs: 'ctrl',
            resolve: initAuth
        })
        .when('/users/:id/edit', {
            templateUrl: 'components/users/users-edit.html',
            controller: 'UsersEditCtrl',
            controllerAs: 'ctrl',
            resolve: initAuth
        })
        .when('/users/activate/:id/:token', {
            template: ' ',
            controller: 'UsersActivationCtrl',
            resolve: initAuth
        })
        .when('/login', {
            templateUrl: 'components/sessions/sessions-new.html',
            controller: 'SessionsNewCtrl',
            controllerAs: 'ctrl',
            resolve: initAuth
        })
        .when('/logout', {
            template: ' ',
            controller: 'SessionsDeleteCtrl',
            resolve: initAuth
        })
        .when('/password_resets', {
            templateUrl: 'components/password-resets/password-resets-new.html',
            controller: 'PasswordResetsNewCtrl',
            controllerAs: 'ctrl',
            resolve: initAuth
        })
        .when('/password_resets/:id/:token', {
            templateUrl: 'components/password-resets/password-resets-edit.html',
            controller: 'PasswordResetsEditCtrl',
            controllerAs: 'ctrl',
            resolve: initAuth
        })
        .otherwise({
            redirectTo: '/home'
        });
}

})();
