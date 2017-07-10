'use strict';

(function () {

	class DashboardController {

		constructor($http, $scope, $rootScope, $state, $compile, $timeout, socket, Auth, AppointmentService, User, Shifts) {
			var vm = this;
			this.$http = $http;
			this.awesomeThings = [];
			this.appointments = [];
			this.slots = [];
			this.isLoggedIn = Auth.isLoggedIn;
			this.isAdmin = Auth.isAdmin;
			this.getCurrentUser = Auth.getCurrentUser;
			$rootScope.$state = $state;

			$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
			$scope.series = ['Patients', 'Month'];
			$scope.chartOptions = {scaleFontColor: "#fff", animation: true,responsive:true};
			$scope.colours = [
				{ // grey
					fillColor: 'rgba(148,159,177,0.2)',
					strokeColor: 'rgba(148,159,177,1)',
					pointColor: 'rgba(148,159,177,1)',
					pointStrokeColor: '#fff',
					pointHighlightFill: '#fff',
					pointHighlightStroke: 'rgba(148,159,177,0.8)'
				},
				{ // dark grey
					fillColor: 'rgba(77,83,96,0.2)',
					strokeColor: 'rgba(77,83,96,1)',
					pointColor: 'rgba(77,83,96,1)',
					pointStrokeColor: '#fff',
					pointHighlightFill: '#fff',
					pointHighlightStroke: 'rgba(77,83,96,1)'
				}
			];
			$scope.data = [
				[65, 59, 80, 81, 56, 55, 40]
			];
		}
	}

	angular.module('eventx')
		.controller('DashboardController', DashboardController);
})();