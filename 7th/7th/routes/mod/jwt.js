const express = require('express');
const router = express.Router();

const jwt = require('../../module/jwt.js');

router.post('/sign', function(req, res) {
	let string = req.body.string;

	let token = jwt.sign(string);   // 모듈 메소드 호출

	res.status(201).send({
		message : "success",
		token : token
	});
});

router.post('/verify', function(req, res) {
	let token = req.headers.token;

	let decoded = jwt.verify(token);   // 모듈 메소드 호출
	console.log(decoded);

	if (decoded == -1) {
		res.status(500).send({
			message : "token err"
		});
	} else {
		res.status(201).send({
			message : "success",
			data : decoded.string
		});
	}
});

module.exports = router;