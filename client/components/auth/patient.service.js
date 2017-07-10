'use strict';

(function() {

	function PatientResource($resource) {
		return $resource('/api/patients/:id/:controller', {
			id: '@_id'
		}, {
			getPatients: {
				method: 'GET',
				isArray: true
			},
			
		});
	}

	angular.module('eventx.auth')
		.factory('Patient', PatientResource);

})();