var express = require('express');
var router = express.Router();

const prac = require('./prac/index.js');
router.use('/prac', prac);

module.exports = router;