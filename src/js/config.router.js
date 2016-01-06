'use strict';

/**
 * Config for the router
 */
angular.module('app')
        .run(run)
        .config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG'];
function config($stateProvider, $urlRouterProvider, JQ_CONFIG) {
    $urlRouterProvider
            .otherwise('/access/signin');

    $stateProvider
            .state('access', {
                url: '/access',
                template: '<div ui-view class="fade-in-right-big smooth"></div>'
            })
            .state('access.signin', {
                url: '/signin',
                templateUrl: 'tpl/page_signin.html',
                resolve: {
                    deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['js/controllers/signin.js']);
                        }]
                }
            })
            .state('access.forgotpwd', {
                url: '/forgotpwd',
                templateUrl: 'tpl/page_forgotpwd.html',
                resolve: {
                    deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['js/controllers/signin.js']);
                        }]
                }
            })
            .state('access.resetpwd', {
                url: '/resetpwd?token=',
                templateUrl: 'tpl/page_resetpwd.html',
                resolve: {
                    deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['js/controllers/signin.js']);
                        }]
                }
            })
            .state('access.logout', {
                url: '/forgotpwd',
                templateUrl: 'tpl/page_forgotpwd.html'
            })
            .state('access.404', {
                url: '/404',
                templateUrl: 'tpl/page_404.html'
            })
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'tpl/app.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load('toaster');
                        }]
                }
            })
            .state('app.org_list', {
                url: '/org_list',
                templateUrl: 'tpl/organization/index.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load('smart-table').then(
                                    function () {
                                        return $ocLazyLoad.load('tpl/organization/org.js');
                                    }
                            );
                        }]
                }
            })
            .state('app.org_new', {
                url: '/org_new',
                templateUrl: 'tpl/organization/create.html',
                resolve: {
                    deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['tpl/organization/org.js']);
                        }]
                }
            })
            .state('app.org_edit', {
                url: '/org_edit/{id}',
                templateUrl: 'tpl/organization/update.html',
                resolve: {
                    deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['tpl/organization/org.js']);
                        }]
                }
            })
            .state('app.dashboard-v1', {
                url: '/dashboard-v1',
                templateUrl: 'tpl/app_dashboard_v1.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/controllers/chart.js']);
                        }]
                }
            })
            .state('app.inpatient', {
                url: '/inpatient',
                templateUrl: 'tpl/inpatient.html',
                controller: 'XeditableCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load('xeditable').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/xeditable.js');
                                    }
                            );
                        }]
                }
            })
            .state('app.outpatient', {
                url: '/outpatient',
                templateUrl: 'tpl/outpatient.html',
                controller: 'XeditableCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load('xeditable').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/xeditable.js');
                                    }
                            );
                        }]
                }
            })
            
            .state('app.roles', {
                url: '/roles',
                templateUrl: 'tpl/roles/index.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load('smart-table').then(
                                    function () {
                                        return $ocLazyLoad.load('tpl/roles/roles.js');
                                    }
                            );
                        }]
                }
            })
            .state('app.role_create', {
                url: '/role_create',
                templateUrl: 'tpl/roles/create.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load('smart-table').then(
                                    function () {
                                        return $ocLazyLoad.load('tpl/roles/roles.js');
                                    }
                            );
                        }]
                }
            })
            .state('app.role_update', {
                url: '/role_update',
                templateUrl: 'tpl/roles/update.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load('smart-table').then(
                                    function () {
                                        return $ocLazyLoad.load('tpl/roles/roles.js');
                                    }
                            );
                        }]
                }
            })
}
run.$inject = ['$rootScope', '$state', '$stateParams', '$location', '$cookieStore', '$http', '$window', 'CommonService'];
function run($rootScope, $state, $stateParams, $location, $cookieStore, $http, $window, CommonService) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    var serviceUrl = '';
    if ($location.host() == 'ahana.local' || $location.host() == 'localhost') {
        serviceUrl = 'http://ahana.local/IRIS-service/IRISORG/web/v1'
    } else if ($location.host() == 'demo.arkinfotec.in') {
        serviceUrl = 'http://demo.arkinfotec.in/ahana/demo/IRIS-service/IRISORG/web/v1'
    }
    $rootScope.IRISOrgServiceUrl = serviceUrl;
    $rootScope.commonService = CommonService;

    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($window.sessionStorage.access_token) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.sessionStorage.access_token; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        if ($location.path() == '/access/resetpwd') {
            var token = $location.search().token;
            $rootScope.commonService.GetPasswordResetAccess(token, function (response) {
                if(response.success === false){
//                    $scope.authError = response.message;
                    $location.path('/access/signin');
                }
            });
        } else {
            var restrictedPage = $.inArray($location.path(), ['/access/signin', '/access/forgotpwd', '/access/resetpwd']) === -1;
            var loggedIn = $window.sessionStorage.access_token || false;
            if (restrictedPage && !loggedIn) {
                $location.path('/access/signin');
            } else if (!restrictedPage && loggedIn) {
                $location.path('/app/org_list');
            }
        }
    });
}