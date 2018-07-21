var express = require('express');
var router = express.Router();

const prac = require('./prac.js');

router.use('/', prac);

module.exports = router;