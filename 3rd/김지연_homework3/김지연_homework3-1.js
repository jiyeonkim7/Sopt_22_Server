const async = require('async');
const fs = require('fs')
const http = require('http');
const crypto = require('crypto');


let str = 'password';
let msg;

let taskArray = [
	firstFunction,  /** Hash **/
	secondFunction, /** Write File **/
	thirdFunction   /** Create Json **/
];

function firstFunction (callback) {

	var hashedpwd;

	crypto.randomBytes(32, function(err, buffer) {
		if (err) {
			console.log(err);
		}
		else {
			crypto.pbkdf2(str, buffer.toString('base64'), 100000, 64, 'sha512', function(err, hashed) {
				if (err) {
					msg = "Hash error";
					console.log(msg);
				}
				else {
					msg = "success";
					console.log("Hash " + msg);

					hashedpwd = hashed.toString('base64');
					callback(null, hashedpwd);
				}
			}); // crypto.pbkdf2
		}
	}); // crypto.randomBytes

} // func1


function secondFunction (hashedpwd, callback) {

	file = fs.writeFile('./hashedpwd1.txt', hashedpwd, 'utf8', function(err) {
		if (err) {
			msg = "Write File error";
			console.log(msg);
		}
		else {
			msg = "success";
			console.log("Write File " + msg);

			callback(null, hashedpwd); 
		}
	}); // fs.writeFile

} // func2

function thirdFunction (hashedpwd, callback) {

	let jsonObj = JSON.stringify({
		msg: msg,
		hashed: hashedpwd
	});

	callback(null, jsonObj); 

} // func3



const server = http.createServer(function(req, res) {

	/** Respond **/
	async.waterfall(taskArray, function(err, result) {
		if (err) {
			msg = "Create Json error";
			console.log(msg);
		}
		else {
			msg = "success";
			console.log("Create Json : " + msg);
			console.log("* RESULT : " + result);

			res.writeHead(200, { "Content-Type" : "text/plain" });
			res.end(result);
		}
	}); // async.waterfall

}).listen(3000, function() {
	console.log('connected 3000 port!!');
}); // http.createServer


