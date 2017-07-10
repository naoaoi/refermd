'use strict';

angular.module('eventx', [
  'eventx.auth',
  'eventx.admin',
  'eventx.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'btford.socket-io',
  'ui.router',
  'validation.match',
  'ui.calendar',
  'ui.materialize',
  'perfect_scrollbar',
  'chart.js'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
