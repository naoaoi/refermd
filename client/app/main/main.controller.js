'use strict';

(function () {

	class MainController {

		constructor($http, $scope, $compile, $timeout, socket, Auth, AppointmentService, User, Shifts, Holidays) {
			var vm = this;
			this.$http = $http;
			this.awesomeThings = [];
			this.appointments = [];

			this.isLoggedIn = Auth.isLoggedIn;
			this.isAdmin = Auth.isAdmin;
			this.getCurrentUser = Auth.getCurrentUser;
			this.currentRole = this.getCurrentUser().role;
			this.view = this.currentRole === 'patient' ? "month,agendaDay" : "month,agendaWeek,agendaDay"
			this.defaultView = "agendaDay"
			this.currentDate = moment().format("dddd, MMMM Do YYYY");
			this.onChange = function () {
				this.physician = this.physician;
				this.filter_Calendar();
			}

			vm.weekday = new Array(5);
			vm.weekday[1] = "Monday";
			vm.weekday[2] = "Tuesday";
			vm.weekday[3] = "Wednesday";
			vm.weekday[4] = "Thursday";
			vm.weekday[5] = "Friday";


			this.filter_Calendar = function () {
				getPhysician(this.physician);
				getShifts(this.physician);
				getHolidays(this.physician);
			}

			if (this.currentRole === 'physician' )
			{
				getPhysician(this.getCurrentUser()._id);
				getShifts(this.getCurrentUser()._id);
				getHolidays(this.getCurrentUser()._id);
			}
			else {
				User.getPhysicians().$promise.then(response => {
					this.physicians = response;
					this.physician = response[0]._id;
					getPhysician(this.physician);
					getShifts(this.physician);
					getHolidays(this.physician);
				});
			}



			function getPhysician(physicianId) {
				AppointmentService.byDocId.query({
					docId: physicianId
				}).$promise.then(function (response) {
					$scope.appointments = response;
					socket.syncUpdates('appointment', $scope.appointments);
				});
			}

			function getShifts(physicianId, cb) {
				Shifts.byDocId({
					docId: physicianId
				}).$promise.then(function (shifts) {
					// give pure json object instead of $resource
					var newArr = JSON.parse(angular.toJson(shifts));
					vm.slots = _.map(newArr, function (o) { return _.omit(o, '_id'); });
					setShifts();
					socket.syncUpdates('shifts', vm.slots);
				});
			}

			function getHolidays(physicianId, cb) {
				Holidays.holidayByDocId({
					docId: physicianId
				}).$promise.then(function (holidays) {
					var newArr = JSON.parse(angular.toJson(holidays));
					vm.holidays = _.map(newArr, function (o) { return _.omit(o, '_id'); });
					//socket.syncUpdates('appointment', vm.holidays);
				});
			}
			
			

			function setShifts() {
				var cnt = 1;
				$scope.shift = {};
				$scope.shift.data = new Array();

				vm.displayShift = angular.copy(vm.slots);
				angular.forEach(vm.displayShift, function (o) {
					var result = JSON.parse(o.dow).map(Number);
					var jsonData = {};
					angular.forEach(result, function (item) {
						if ($scope.shift.data.length > 0 && $scope.shift.data[0].hasOwnProperty(vm.weekday[item])) {

							$scope.shift.data[0][vm.weekday[item]][('Start' + cnt)] = o.start;
							$scope.shift.data[0][vm.weekday[item]][('End' + cnt)] = o.end;
						}
						else {
							jsonData[vm.weekday[item]] = {}
							//$scope.shift.data[vm.weekday[item]] = {};
							jsonData[vm.weekday[item]][('Start' + cnt)] = o.start;
							jsonData[vm.weekday[item]][('End' + cnt)] = o.end;
						}
					});
					if (!angular.equals({}, jsonData)) {
						$scope.shift.data.push(jsonData);
					}
					cnt++;
				});

				console.log($scope.shift.data);
			}

			this.exportCSV = function () {
				var dataToExport = [];
				var dataX = [];
				var columns = ['title', 'description', 'start', 'end',
					'Patient.first_name',
					'Patient.last_name',
					'Patient.email',
					'Patient.gender',
					'Patient.mobile',
					'Physician.first_name',
					'Physician.last_name',
					'Physician.email',
					'Physician.gender',
					'Physician.mobile',
				];
				dataToExport.push(columns);
				angular.copy($scope.appointments, dataX)

				for (var index in dataX) {

					var newData = {};
					for (var key in columns) {
						if (columns[key].indexOf('.') !== -1) {

							var parent = columns[key].toString().split('.')[0];
							var subName = columns[key].toString().split('.')[1];
							newData[columns[key]] = dataX[index][parent] && dataX[index][parent][subName] ? dataX[index][parent][subName] : ''
						} else {
							newData[columns[key]] = dataX[index][columns[key]];
						}
					}
					dataToExport.push(_.values(newData))
				}

				var d = new Date();
				var datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
				var exportURL = '/api/export/appointments_' + datestring;
				angular.element('#frmSubmit').attr('action', exportURL);
				angular.element('#data').val(JSON.stringify(dataToExport));
				angular.element('#frmSubmit').submit();
			}

		}

	}

	angular.module('eventx')
		.controller('MainController', MainController);
})();