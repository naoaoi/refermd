'use strict';

angular.module('eventx')
  .config(function ($stateProvider) {
    $stateProvider
      .state('appointment', {
        url: '/appointment',
        templateUrl: 'app/appointment/appointment.html',
        controller: 'AppointmentCtrl',
        controllerAs: 'app',
        authenticate: true
      });
  });
