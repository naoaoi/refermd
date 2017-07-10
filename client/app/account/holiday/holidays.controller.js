'use strict';

class HolidaysController {
  constructor(Auth, Holidays, $cookies, $location, $state, $scope, socket) {
    var vm = this;
    vm.holiday = {};
    vm.holiday.className = 'red'
    this.errors = {};
    this.submitted = false;
    this.Auth = Auth;
    this.Holidays = Holidays;
    vm.slots = [];
    this.getCurrentUser = this.Auth.getCurrentUser;
    if ($cookies.get('token') && $location.path() !== '/logout') {
      if (this.getCurrentUser().role != 'physician' && this.getCurrentUser().role != 'admin') {
        $state.go('login');
      }
    }
    $(".sidebar-collapse").sideNav('hide');
    Holidays.holidayByDocId({
      docId: this.getCurrentUser()._id
				}).$promise.then(function (holidays) {
      vm.holidays = holidays;
      socket.syncUpdates('appointment', vm.holidays);
				});

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates("appointment");
    });
  }
  reset() {
    console.log(this.holiday);
    this.holiday = {};
  }

  save(form) {
    this.submitted = true;
    if (form.$valid) {

      var fromDate = moment(this.holiday.fromdate.toString(), "D, MMM yyyy").format("YYYY-MM-DD");
      var toDate = moment(this.holiday.todate.toString(), "D, MMM yyyy").format("YYYY-MM-DD");
      var startTime = moment(this.holiday.fromtime.toString(), "h:mm a").format("HH:mm");
      var endTime = moment(this.holiday.totime.toString(), "h:mm a").format("HH:mm");

      this.holiday.start = moment(fromDate.toString() + ' ' + startTime.toString() + ' +0000', "YYYY-MM-DD HH:mm Z")
      this.holiday.end = moment(toDate.toString() + ' ' + endTime.toString() + ' +0000', "YYYY-MM-DD HH:mm Z")



      this.holiday.allDay = false;
      this.holiday.isHoliday = true;
      this.holiday.UserId = this.getCurrentUser()._id;
      this.holiday.PhysicianId = this.getCurrentUser()._id;

      if (this.holiday._id) {
        this.Holidays.update({ id: this.holiday._id }, this.holiday).$promise.then(() => {
          Materialize.toast('Holiday updated successfully.', 2000, '', function () { });
          this.slot = {};
        })
          .catch(() => {
            form.holiday.start.$setValidity('mongoose', false);
            Materialize.toast('Sorry, Something went wrong.', 2000, '', function () { });
          });
      }
      else {
        this.Holidays.save(this.holiday).$promise.then(() => {
          Materialize.toast('Holiday added successfully.', 2000, '', function () { });
          this.slot = {};
        })
          .catch(() => {
            form.holiday.start.$setValidity('mongoose', false);
            Materialize.toast('Sorry, Something went wrong.', 2000, '', function () { });
          });
      }
    }
  }

  deleteHoliday(holiday) {
    console.log(holiday)
    if (!holiday._id) return;
    this.editHoliday({});
    this.Holidays.delete({ id: holiday._id })
      .$promise.then(function (response) {
        Materialize.toast('Holiday deleted.', 2000, '', function () { });
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

  editHoliday(holiday) {
    this.holiday = holiday;
    if (!angular.equals({}, this.holiday)) {
      this.holiday.fromdate = moment(this.holiday.start.toString(), "YYYY-MM-DD").format("D, MMM YYYY");
      this.holiday.todate = moment(this.holiday.end.toString(), "YYYY-MM-DD").format("D, MMM YYYY");
      this.holiday.fromtime = moment(this.holiday.start.toString(), "YYYY-MM-DD HH:mm").format("h:mm a");
      this.holiday.totime = moment(this.holiday.end.toString(), "YYYY-MM-DD HH:mm").format("h:mm a");

      this.holiday.allDay = false;
    }
  }
}

angular.module('eventx')
  .controller('HolidaysController', HolidaysController);
angular.module('eventx').filter('UTCToNow', function () {
  return function (input, format) {
    return moment.utc(input).format('dddd, MMMM Do YYYY, h:mmA');
  }
});
