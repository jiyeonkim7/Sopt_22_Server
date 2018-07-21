var express = require('express');
var router = express.Router();


router.use('/signup', require('./signup.js'));


module.exports = router;
