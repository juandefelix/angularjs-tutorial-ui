(function() {
"use strict";

angular
    .module('angularjsTutorial.sessions')
    .factory('SessionsService', SessionsService);

SessionsService.$inject = ['$location', '$q', '$resource', '$rootScope', 'environment', 'flash'];

function SessionsService($location, $q, $resource, $rootScope, environment, flash) {
    var svc = this;

    svc.LOGGING_EVENT = 'LoggingEvent';

    svc.initAuthPromise = null;
    svc.currentUser = null;

    /** String for holding the attempt to access a unauthorized page. */
    svc.beforeLoginAttempt = null;

    svc.authenticate = authenticate;
    svc.login = login;
    svc.logout = logout;
    svc.initialize = initialize;
    svc.requireLogin = requireLogin;
    svc.requireCorrectUser = requireCorrectUser;

    var Sessions = $resource(environment.SERVER_URL + '/api/sessions', {}, {
        authenticate: { method: 'POST' },
        authenticated: { method: 'GET', url: environment.SERVER_URL + '/api/sessions/authenticated' },
        logout: { method: 'DELETE', url: environment.SERVER_URL + '/api/sessions/logout'}
    });

    return svc;

    function authenticate(user) {
        var defer = $q.defer()
        Sessions.authenticate(user, function(user) {
            if (user.id) {
                svc.currentUser = user;
                $rootScope.$broadcast(svc.LOGGING_EVENT);
                defer.resolve(svc.currentUser);
            }
        }, function(httpResponse) {
            if (httpResponse.status === 403 || httpResponse.status === 401) {
                defer.reject(httpResponse.data);
            }
        });
        return defer.promise;
    }

    function login(user) {
        svc.currentUser = user;
        $rootScope.$broadcast(svc.LOGGING_EVENT);
    }

    function logout() {
        Sessions.logout();
        
        svc.currentUser = null;
        $rootScope.$broadcast(svc.LOGGING_EVENT);
        $location.path('/home').replace();
    }

    function requireLogin() {
        if (svc.currentUser === null) {
            svc.beforeLoginAttempt = $location.path();
            flash.error = 'You need to be logged in to access this page';
            $location.path('/login').replace();
        }
    }

    function requireCorrectUser(id) {
        requireLogin();
        if (svc.currentUser.id !== id) {
            flash.error = 'You don\'t have permissions to access this page.';
            $location.path('/users/' + svc.currentUser.id);
        }
    }

    function initialize() {
        var defer = $q.defer();
        Sessions.authenticated(function(user) {
            if (user && user.id) {
                svc.currentUser = user;
                $rootScope.$broadcast(svc.LOGGING_EVENT);
            }

            defer.resolve();
        });

        svc.initAuthPromise = defer.promise;
    }
}

})();
