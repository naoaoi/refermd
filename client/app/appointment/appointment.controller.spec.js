'use strict';

describe('Controller: AppointmentCtrl', function () {

  // load the controller's module
  beforeEach(module('eventx'));

  var AppointmentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppointmentCtrl = $controller('AppointmentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
