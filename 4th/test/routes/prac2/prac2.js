var express = require('express');
var router = express.Router();
const request = require('async-request');


// post -> body로 받는다
router.post('/', async function(req, res) {

	let name = req.body.name;
	let phone = req.body.phone;

	let option = {
		method : 'POST',
		data : {
			"name" : name,
			"phone" : phone
		}
	}
	let result = await request('http://13.125.118.111:3000/homework/2nd', option);
	let data = JSON.parse(result.body).data;
	console.log(data);

	if (!result) {

		res.status(500).send({
			'message' : 'Server Error'
		});

	} else {

		res.status(201).send({
			'message' : 'Success',
			'data' : data
		});
	}

});

module.exports = router;
