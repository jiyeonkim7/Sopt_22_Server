const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require('../module/pool.js');

router.post('/', async function(req, res){
	let user_id = req.body.user_id;
	let user_pw = req.body.user_pw;

	let selectQuery = "SELECT * FROM user WHERE user_id = ?";
	let selectResult = await db.queryParam_Arr(selectQuery, [user_id]);  // [{},{}]

	if(selectResult.length === 1) {
		res.status(400).send({
			'message' : "Already Exist"
		});
	} else {
		let salt = await crypto.randomBytes(32);
		let hashedpw = await crypto.pbkdf2(user_pw, salt.toString('base64'), 100000, 32, 'sha512');

		let insertQuery = "INSERT INTO user (user_id, user_pw, user_salt) VALUES (?, ?, ?)";
		let insertResult = await db.queryParam_Arr(insertQuery,
			[user_id, hashedpw.toString('base64'), salt.toString('base64')]);

		if(!insertResult) {
			res.status(500).send({
				'message' : "Internal Server Error"
			});
		} else {
			res.status(201).send({
				'message' : "Successfully Register"
			});	
		}
	}
});


module.exports = router;