'use strict';

(function () {

  class AppointmentCtrl {

    constructor($timeout, $rootScope, $state, $filter, socket, AppointmentService, Auth) {
      var vm = this;
      this.appointments = [];
      this.isAdmin = Auth.isAdmin;
      this.AppointmentService = AppointmentService;
      $rootScope.$state = $state;
      this.getCurrentUser = Auth.getCurrentUser;
      this.defaultMode = 'card'
      this.curPage = 0;
      this.pageSize = 12;
      vm.noRecords=false;


      this.numberOfPages = function () {
        var myFilteredData = $filter('daterange')(vm.appointments, vm.startDate, vm.endDate)
        if (myFilteredData) {
          return Math.ceil(myFilteredData.length / vm.pageSize);
        } else {
          return Math.ceil(vm.appointments.length / vm.pageSize);
        }
        //return Math.ceil(vm.appointments.length / vm.pageSize);
      };

      vm.getCurrentUser(function (user) {
        vm.currentUser = user;
        vm.appointmentStatus = ['Awaiting', 'Cancel', 'Done'];
        // get app the appointments of logged users - physician/patient        
        if (vm.currentUser.role === 'patient') {
          AppointmentService.byPatientID.query({
            patientId: vm.currentUser._id
          }).$promise.then(function (response) {
            console.log(response)
            vm.appointments = response;
            vm.noRecords=response.length===0;
            socket.syncUpdates('appointment', vm.appointments);
          });
        }
        else if (vm.currentUser.role === 'physician') {
          AppointmentService.byDocId.query({
            docId: vm.currentUser._id
          }).$promise.then(function (response) {
            console.log(response)
            vm.appointments = response;
            socket.syncUpdates('appointment', vm.appointments);
          });
        }
        else {
          AppointmentService.query().$promise.then(function (response) {
            console.log(response)
            vm.appointments = response;
            socket.syncUpdates('appointment', vm.appointments);
          });
        }

      });
    }


    clearFilter() {
      this.curPage = 0;
      this.pageSize = 12;
      this.startDate = null;
      this.endDate = null;
    }

    setAppointmentStatus(app) {

      if (app) {
        delete app.patient;
        delete app.physician;

        this.AppointmentService.update({
          id: app._id
        }, app).$promise.then(function () {
          Materialize.toast('Appointment updated.', 2000, '', function () { });
        }, function (error) { // error handler
          if (error.data.errors) {
            var err = error.data.errors;
            console.log(err[Object.keys(err)].message, err[Object.keys(err)].name);
          } else {
            var msg = error.data.message;
            console.log(msg);
            Materialize.toast(msg, 2000, '', function () { });
          }
        });


      }
      console.log(app);
    }
  }

  angular.module('eventx')
    .controller('AppointmentCtrl', AppointmentCtrl)
    .filter('UTCToNow', function () {
      return function (input, format) {
        return moment.utc(input).format('dddd, MMMM Do YYYY, h:mmA');
      };
    }).filter('pagination', function () {
      return function (input, start) {
        if (input) {
          start = +start;
          return input.slice(start);
        }
        return [];
      };
    }).filter('daterange', function () {
      return function (items, startDate, endDate) {
        var filteredResult = [];
        // Take action if the filter elements are filled
        if (startDate && endDate) {

          items.forEach(function (item) {

            var appStart = moment(new Date(item.start)).format("MM-DD-YYYY");
            var appEnd = moment(new Date(item.end)).format("MM-DD-YYYY");
            var s = moment(new Date(startDate)).format("MM-DD-YYYY");
            var e = moment(new Date(endDate)).format("MM-DD-YYYY");

            console.log(appStart, s, appEnd, e);
            console.log(appStart >= s);
            console.log(appEnd <= e);
            if (appStart >= s && appEnd <= e) {
              filteredResult.push(item);
            }
          });

        } else {
          return items; // By default, show the regular table data
        }

        return filteredResult;
      }
    });
  
})();