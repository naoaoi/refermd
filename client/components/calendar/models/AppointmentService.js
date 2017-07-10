"use strict";
angular.module('eventx').factory('AppointmentService', function($resource) {

	var appointment = {};

	appointment = $resource('/api/appointments/:id', null, {
		'update': {
			method: 'PUT'
		},
		query: {
			method: 'GET',
			isArray: true
		}
	});

	appointment.byDocId = $resource('/api/appointments/docs/:docId', null, {
		query: {
			method: 'GET',
			params: {
				docId: '@docId'
			},
			isArray: true
		}
	});

appointment.byPatientID = $resource('/api/appointments/patients/:patientId', null, {
		query: {
			method: 'GET',
			params: {
				patientId: '@patientId'
			},
			isArray: true
		}
	});
	return appointment;
});