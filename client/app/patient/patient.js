'use strict';

angular.module('eventx')
  .config(function ($stateProvider) {
    $stateProvider
      .state('patient', {
        url: '/patient',
        templateUrl: 'app/patient/patient.html',
         controller: 'PatientComponent',
          authenticate: true
      });
  });
