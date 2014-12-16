'use strict';

angular
  .module('2048GridApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    '2048GridApp.services.socket',
    '2048GridApp.services.game',
    '2048GridApp.services.tile',
    '2048GridApp.services.keyboard',
    '2048GridApp.services.utils',
    '2048GridApp.directives'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
