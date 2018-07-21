var express = require('express');
var router = express.Router();

const practice = require('./practice/index.js');
router.use('/practice', practice);


// 실습
const prac1 = require('./prac1/index.js');
router.use('/prac1', prac1);

const prac2 = require('./prac2/index.js');
router.use('/prac2', prac2);


module.exports = router;
