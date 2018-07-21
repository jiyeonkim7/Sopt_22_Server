var express = require('express');
var router = express.Router();


router.get('/', function(req, res){

	let id = req.query.id; //test

	console.log(id);

	res.status(200).send({
		message : "my success"
	});
});


router.post('/', function(req, res){
	let id = req.body.id;
	let pwd = req.body.pwd;

	res.status(201).send({
		"id":id,
		"pwd":pwd
	});
});




module.exports = router;

// localhost:3000/practice/prac?id=test
