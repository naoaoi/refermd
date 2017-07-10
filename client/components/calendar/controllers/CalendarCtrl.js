'use strict';

angular.module('eventx').controller('CalendarCtrl', function ($scope, $log, $timeout, socket, AppointmentService, Auth, User) {

	$scope.userInfo = {}
	$scope.getCurrentUser = Auth.getCurrentUser;
	$scope.submitted = false;



	$scope.getCurrentUser(function (user) {
		$scope.currentUser = user;
		$scope.userInfo.user = $scope.currentUser.name;
		$scope.userInfo.createdDate = new Date();
	});

	$scope.newEvent = {};

	$timeout(function () {
		console.log($scope.$parent.main.physician);
		$scope.selected_Physician = $scope.$parent.main.physician;
	});

	User.getPatients().$promise.then(response => {
		console.log(_.map(response,
			_.partialRight(_.pick, "_id", "first_name")));
		$scope.patients = response;
	});

	$scope.$watch("$parent.main.physician", function (newValue, oldValue) {
		$scope.selected_Physician = $scope.$parent.main.physician;
	}, true);



	$scope.onChange = function () {
		var selectedPatient = _.find($scope.patients, function (p) {
			return p._id.toString() == $scope.newEvent.PatientId
		});
		if (selectedPatient) {
			$scope.newEvent.title = selectedPatient.first_name + " " + selectedPatient.last_name;
			$scope.newEvent.PatientId = selectedPatient._id.toString();
		}
	}

	$scope.addAppointment = function (form) {
		$scope.submitted = true;
		if (form.$valid) {
			saveAppointment();
		}
	};

	$scope.draggedAppointment = function (form) {
		saveAppointment();
	};

	function saveAppointment() {
		var newEventDefaults = {
			title: "Patient Name",
			PhysicianId: $scope.selected_Physician,
			className: "pink",
			icon: "",
			allDay: false,
			PatientId: $scope.currentUser._id,
			UserId: $scope.currentUser._id
		};


		if ($scope.getCurrentUser().role === 'patient') {
			newEventDefaults.title = $scope.getCurrentUser().first_name + " " + $scope.getCurrentUser().last_name;
		}

		$scope.newEvent = angular.extend(newEventDefaults, $scope.newEvent);
		if ($scope.newEvent._id) {

			AppointmentService.update({
				id: $scope.newEvent._id
			}, $scope.newEvent).$promise.then(function () {
				$scope.submitted = false;
				Materialize.toast('Appointment updated.', 2000, '', function () { });
			}, function (error) { // error handler
				if (error.data.errors) {
					var err = error.data.errors;
					console.log(err[Object.keys(err)].message, err[Object.keys(err)].name);
				} else {
					var msg = error.data.message;
					console.log(msg);
				}
			});
		} else {
			AppointmentService.save($scope.newEvent).$promise.then(function () {
				$scope.submitted = false;
				Materialize.toast('Appointment added.', 2000, '', function () { });
			}, function (error) { // error handler
				if (error.data.errors) {
					var err = error.data.errors;
					console.log(err[Object.keys(err)].message, err[Object.keys(err)].name);
				} else {
					var msg = error.data.message;
					console.log(msg);
				}
			});
		}

		$timeout(function () {
			$scope.newEvent = {};
			$('.event-collapse').sideNav('hide');
		});
	}

	$scope.deleteEvent = function () {
		if (!$scope.newEvent._id) return;
		AppointmentService.delete({ id: $scope.newEvent._id })
			.$promise.then(function (response) {
				Materialize.toast('Appointment deleted.', 2000, '', function () { });
				$('.event-collapse').sideNav('hide');
			}, function (error) { // error handler
				if (error.data.errors) {
					var err = error.data.errors;
					console.log(err[Object.keys(err)].message, err[Object.keys(err)].name);
				} else {
					var msg = error.data.message;
					console.log(msg);
				}
			});
	}
	$scope.$on('$destroy', function () {
		socket.unsyncUpdates("appointment");
	});
});