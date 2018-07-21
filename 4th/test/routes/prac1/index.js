var express = require('express');
var router = express.Router();

const prac1 = require('./prac1.js');
router.use('/', prac1);

module.exports = router;
