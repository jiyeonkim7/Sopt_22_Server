var express = require('express');
var router = express.Router();
const crypto = require('crypto-promise');

// params 방식
router.get('/:str', async function(req, res) {

	let str = req.params.str;

	let salt = await crypto.randomBytes(32);
	let hashed = await crypto.pbkdf2(str, salt.toString('base64'), 100000, 32);

	if (!salt || !hashed) {

		res.status(500).send({
			message : "Internal Server Error"
		});

	} else {

		res.status(200).send({
			message : "Success",
			hashed : hashed.toString('base64')
		});
		
	}

});

module.exports = router;
