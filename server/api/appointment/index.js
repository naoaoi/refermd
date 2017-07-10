'use strict';

var express = require('express');
var controller = require('./appointment.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/docs/:docId', controller.byDocID);
router.get('/patients/:patientId', controller.byPatientID);
router.get('/docs/:docId/holidays', controller.holidays);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;