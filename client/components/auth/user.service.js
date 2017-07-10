'use strict';

(function() {

	function UserResource($resource) {
		return $resource('/api/users/:id/:controller', {
			id: '@_id'
		}, {
			changePassword: {
				method: 'PUT',
				params: {
					controller: 'password'
				}
			},
			 update: {method:'PUT', params: {id: '@_id'},isArray: false},
			forgotPassword: {
				url: 'api/users/forgot',
				method: 'PUT'
			},
			resetPassword: {
				url: 'api/users/reset/:token',
				method: 'PUT',
				params: {
					token: 'token'
				}
			},
			get: {
				method: 'GET',
				params: {
					id: 'me'
				}
			},
			getPhysicians: {
				method: 'GET',
				params: {
					id: 'physicians'
				},
				isArray: true
			},
			getPhysiciansData: {
				url: '/api/users/physicians/all',
				method: 'GET',
				// params: {
				// 	id: 'physicians',
				// 	controller: 'all'
				// },
				isArray: true
			},
			setBusinesshours: {
				url: 'api/settings/',
				method: 'POST'
			},
			getPatients: {
				method: 'GET',
				params: {
					id: 'patients'
				},
				isArray: true
			},
			
		});
	}

	angular.module('eventx.auth')
		.factory('User', UserResource);

})();