'use strict';

angular.module('eventx')
	.config(function($stateProvider) {
		$stateProvider
			.state('physician', {
				url: '/physician',
				templateUrl: 'app/physician/physician.html',
				controller: 'PhysicianCtrl'
			});
	});