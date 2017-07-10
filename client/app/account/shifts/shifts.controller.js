'use strict';

class ShiftsController {
  constructor(Auth, Shifts, $cookies, $location, $state, $scope, $timeout, socket) {
    var vm = this;
    this.errors = {};
    this.submitted = false;
    this.Auth = Auth;
    this.Shifts = Shifts;
    this.$timeout = $timeout;
    vm.slots = [];
    this.getCurrentUser = this.Auth.getCurrentUser;
    if ($cookies.get('token') && $location.path() !== '/logout') {
      if (this.getCurrentUser().role != 'physician' && this.getCurrentUser().role != 'admin') {
        $state.go('login');
      }
    }
    $(".sidebar-collapse").sideNav('hide');
    Shifts.byDocId({
      docId: this.getCurrentUser()._id
				}).$promise.then(function (shifts) {
      vm.slots = shifts;
      socket.syncUpdates('shifts', vm.slots);
				});

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates("shifts");
    });

    this.weekday = new Array(5);
    this.weekday[1] = "M";
    this.weekday[2] = "T";
    this.weekday[3] = "W";
    this.weekday[4] = "T";
    this.weekday[5] = "F";

  }

  parseDays(days) {
    var weekdays = this.weekday;
    var shiftdays = angular.copy(days);
    if (days) {
      var result = {};
      try {
        result = JSON.parse(shiftdays).map(Number);
      } catch (error) {
        result = shiftdays.map(Number);
      }
      var dayString = "";
      angular.forEach(result, function (day) {
        dayString += weekdays[day];
      });
      return dayString;
    }
  }


  deleteSlot(slot) {
    if (!slot._id) return;
    this.editSlot({});
    this.Shifts.delete({ id: slot._id })
      .$promise.then(function (response) {
        Materialize.toast('Shift deleted.', 2000, '', function () { });
        this.$timeout(function () {
          $("#se").select2("val", "");
        });
      }, function (error) {
        Materialize.toast('Sorry, Something went wrong.', 2000, '', function () { });
        if (error.data.errors) {
          var err = error.data.errors;
          console.log(err[Object.keys(err)].message, err[Object.keys(err)].name);
        } else {
          var msg = error.data.message;
          console.log(msg);
        }
      });
  }

  editSlot(slot) {
    console.log(slot);
    this.slot = slot;
  }

  reset() {
    console.log(this.slot);
    this.slot = {};
    // $("select").select2("destroy").select2();
    this.$timeout(function () {
      $("#se").select2("val", "");
    });

  }

  setBusinessHours(form) {
    if (form.$valid) {

      this.submitted = true;
      this.slot.UserId = this.getCurrentUser()._id;
      this.slot.dow = JSON.stringify(this.slot.dow);

      this.slot.start = moment(this.slot.start.toString(), "h:mm a").format("HH:mm");
      this.slot.end = moment(this.slot.end.toString(), "h:mm a").format("HH:mm");


      if (this.slot._id) {
        this.Shifts.update({ id: this.slot._id }, this.slot).$promise
          .then(() => {
            Materialize.toast('Shifts saved successfully.', 2000, '', function () { });
            this.slot = {};
            this.$timeout(function () {
              $("#se").select2("val", "");
            });
          })
          .catch(() => {
            form.slot.start.$setValidity('mongoose', false);
            Materialize.toast('Sorry, Something went wrong.', 2000, '', function () { });
          });
      }
      else {
        this.Shifts.save(this.slot)
          .$promise.then(() => {
            Materialize.toast('Shifts saved successfully.', 2000, '', function () { });
            this.slot = {};
            this.$timeout(function () {
              $("#se").select2("val", "");
            });
          })
          .catch(() => {
            form.slot.start.$setValidity('mongoose', false);
            Materialize.toast('Sorry, Something went wrong.', 2000, '', function () { });
          });
      }
    }
  }
}

angular.module('eventx')
  .controller('ShiftsController', ShiftsController);
