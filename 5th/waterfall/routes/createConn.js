const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const dbConfig = {
	host : 'myinstance2.ceuhngw0tvun.ap-northeast-2.rds.amazonaws.com',
	port : 3306,
	user : 'root',
	password : 'asdfzxcv',
	database : 'board'  // schema name "board"
};

// localhost:3000/conn
router.get('/', function(req, res) {
	let connection = mysql.createConnection(dbConfig);  // connection 생성
	let selectQuery = 'SELECT * FROM board'; // table name "board"

	connection.query(selectQuery, function(err, result) {
		if (err) {
			res.status(500).send({
				message : "Internal Server Error"
			});
			console.log("Internal Server Error");
		} else {
			res.status(200).send({
				message : "Successfully Get Board Data",
				data : result
			});
			console.log("Successfully Get Board Data");
		}
		connection.end();	// connection이 끝나면 연결을 끊어줘야 함
	});
});

// localhost:3000/conn
router.post('/', function(req, res) {
	let user_idx = req.body.user_idx;
	let board_title = req.body.board_title;
	let board_content = req.body.board_content;

	if (!user_idx || !board_title || !board_content) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		let connection = mysql.createConnection(dbConfig);  // connection 생성
		let insertQuery = 'INSERT INTO board (user_idx, board_title, board_content) VALUES (?, ?, ?)';

									   // 넘겨줄 값이 여러개 일때 배열로 보낸다
		connection.query(insertQuery, [user_idx, board_title, board_content], function(err, result) {
			if (err) {
				res.status(500).send({
					message : "Internal Server Error"
				});
			} else {
				res.status(201).send({
					message : "Successfully Register Board Data"
				});
			}
			// 한 번만 작성하여 연결 끊는 것 가능
			connection.end();	// connection이 끝나면 연결을 끊어줘야 함
		});
		// connection.end();	// 안됨! => connection.query() 내에 작성해야 함.
	}
});

module.exports = router;
