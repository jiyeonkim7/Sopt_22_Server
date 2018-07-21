
/** localhost:3000/comment **/

const express = require('express');
const request = require('request');
const router = express.Router();


// 게시판 댓글 조회
// localhost:3000/comment/481
router.get('/:board_idx', function(req, res){

	var board_idx = req.params.board_idx;

	request('http://13.125.118.111:3009/comment/' + board_idx, function(err, response, body) {

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
				// comment_pw는 제외 해야 해
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


// 게시판 댓글 등록
router.post('/', function(req, res){

	let option = {

		uri : 'http://13.125.118.111:3009/comment',
		method : 'POST',
		form : {
			'user_id' : req.body.user_id, 
			'board_idx' : req.body.board_idx,
			'comment_content' : req.body.comment_content,
			'comment_pw' : req.body.comment_pw
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

