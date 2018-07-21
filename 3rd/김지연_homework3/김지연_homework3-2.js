const crypto = require('crypto-promise');
const async = require('async');
const fs = require('fs');
const http = require('http');

let str = 'password';
let msg;

const server = http.createServer(function(req, res) {

	/** 1st : Hash **/
	return new Promise((resolve, reject) => {
		var hashedpwd;

		crypto.randomBytes(32, function(err, buffer) {
			if (err) {
				console.log(err);
			}
			else {
				crypto.pbkdf2(str, buffer.toString('base64'), 100000, 64, 'sha512', function(err, hashed) {
					if (err) {
						reject(err);
					}
					else {
						hashedpwd = hashed.toString('base64');

						resolve(hashedpwd);
					}
				}); // crypto.pbkdf2
			}
		}); // crypto.randomBytes
	})
	
	.catch(err => {
		msg = "Hash error";
		console.log(msg, err);
	})
	.then(param => {
		msg = "success";
		console.log("Hash " + msg);

		/** 2nd : Write File **/
		return new Promise((resolve, reject) => {

			file = fs.writeFile('./hashedpwd2.txt', param, 'utf8', function(err) {
				if (err) {
					reject(err);
				}
				else {
					resolve(param);
				}
			}); // fs.writeFile
		})
	})
	
	.catch(err => {
		msg = "Write File error";
		console.log(msg, err);
	})
	.then(param => {
		msg = "success"
		console.log("Write File " + msg);

		/** 3rd : Create Json **/
		return new Promise((resolve, reject) => {

			let jsonObj = JSON.stringify({
				msg: msg,
				hashed: param
			});

			resolve(jsonObj); 
		})
	})

	.catch(err => {
		msg = "Create Json error";
		console.log(msg, err);
	})
	.then(param => {
		msg = "success"
		console.log("Create Json " + msg);
		console.log("* RESULT : " + param);

		/** 4th : Respond **/
		return new Promise((resolve, reject) => {
			res.writeHead(200, {
				"Content-Type" : "text/plain"
			});
			res.end(param);
		})
	});

}).listen(3000, function() {
	console.log('connected 3000 port!!');
}); // http.createServer

