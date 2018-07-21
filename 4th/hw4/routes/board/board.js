
/** localhost:3000/board **/

const express = require('express');
const request = require('request');
const router = express.Router();


// 게시판 글 조회
router.get('/', function(req, res){

	request('http://13.125.118.111:3009/board', function(err, response, body) {

		if (err) {
			console.log("jy Internal Server Error : " + err);	
			res.status(500).send({
				'message' : "jy Internal Server Error"
			});

		} else {
			let bodyParsed = JSON.parse(body);

			var result = {
				'message' : "jy " + bodyParsed.message,
				'data' : bodyParsed.data
				// board_pw는 제외 해야 해
			}

			if (!result) {
				res.status(400).send({
					'message' : "jy Null Value"
				});

			} else {
				res.status(200).send(result);
				console.log(result);
			}
		}

	}); // request

});


// 게시판 글 등록
router.post('/', function(req, res){

	let option = {

		uri : 'http://13.125.118.111:3009/board',
		method : 'POST',
		form : {
			'user_id' : req.body.user_id, 
			'board_title' : req.body.board_title,
			'board_content' :req.body.board_content,
			'board_pw' : req.body.board_pw
		}
	}

	request(option, function(err, response, body){

		if (err) {
			console.log("jy Internal Server Error : " + err);
			res.status(500).send({
				'message' : "Internal Server Error"
			});

		} else {
			let bodyParsed = JSON.parse(body);

			var result = {
				'message' : "jy " + bodyParsed.message
			}

			if (!result) {
				res.status(400).send({
					'message' : "jy Null Value"
				});

			} else {
				res.status(201).send(result);
				console.log(result);
			}
		}

	}); // request

});


module.exports = router;

