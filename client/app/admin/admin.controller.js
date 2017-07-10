'use strict';

(function() {

class AdminController {
  constructor(User, AppointmentService, Auth,socket) {
    var vm = this;
    vm.getCurrentUser = Auth.getCurrentUser;
    vm.appointments = [];
    vm.user = vm.getCurrentUser();
    console.log(vm.getCurrentUser())
    AppointmentService.byDocId.query({
      docId: vm.getCurrentUser()._id
    }).$promise.then(function(response) {
      vm.appointments = response;
      socket.syncUpdates('appointment', vm.appointments);
    });
    
  }

  delete(user) {
    user.$remove();
    //this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('eventx.admin')
  .controller('AdminController', AdminController);

})();
