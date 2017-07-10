'use strict';

angular.module('eventx.auth', [
  'eventx.constants',
  'eventx.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
