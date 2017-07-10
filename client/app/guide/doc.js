'use strict';

angular.module('eventx')
  .config(function ($stateProvider) {
    $stateProvider
      .state('guide', {
        url: '/guide',
        templateUrl: 'app/guide/doc.html',
        controller: 'DocCtrl'
      });
  });
