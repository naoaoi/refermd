'use strict';

angular.module('eventx')
	.controller('PhysicianCtrl', function($scope, $timeout, socket, User, Auth) {
		$scope.userInfo = {}
		$scope.newEvent = {};
		$scope.getCurrentUser = Auth.getCurrentUser;

		$scope.getCurrentUser(function(user) {
			$scope.currentUser = user;
			$scope.userInfo.user = $scope.currentUser.name;
			$scope.userInfo.createdDate = new Date();
			//newEventDefaults.creator = $scope.currentUser._id;
		});

		User.getPhysiciansData().$promise.then(function(response) {
			$scope.physicians = response;
			socket.syncUpdates('physicians', $scope.physicians);
		});

		$scope.$on('$destroy', function() {
			socket.unsyncUpdates("physicians");
		});
	});