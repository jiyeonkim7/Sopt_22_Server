var express = require('express');
var router = express.Router();

const prac2 = require('./prac2.js');
router.use('/', prac2);

module.exports = router;
