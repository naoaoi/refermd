'use strict';

describe('Component: PatientComponent', function () {

  // load the controller's module
  beforeEach(module('eventx'));

  var PatientComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PatientComponent = $componentController('PatientComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
