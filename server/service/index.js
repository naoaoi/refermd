'use strict';

var express = require('express');
var service = require('./export.service');

var router = express.Router();

router.post('/:title', service.exportToFile);
module.exports = router;