'use strict';

(function () {

    function HolidaysResource($resource) {
        return $resource('/api/appointments/:id/:controller',
            {
                id: '@_id'
            },
            {
                'update': { method: 'PUT' },
                'holidayByDocId': {
                    url: "/api/appointments/docs/:docId/holidays",
                    method: 'GET',
                    params: {
                        docId: '@docId'
                    },
                    isArray: true
                },
                query: {
                    method: 'GET',
                    isArray: true
                }
            });
    }

    angular.module('eventx')
        .factory('Holidays', HolidaysResource);

})();