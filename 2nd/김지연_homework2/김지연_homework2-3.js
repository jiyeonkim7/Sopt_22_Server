const http = require('http');
const request = require('request');
const fs = require('fs');
const json2csv = require('json2csv');


const server = http.createServer(function(req, res) {
	let option = {
		uri : 'http://13.125.118.111:3000/homework/2nd',
		method : 'POST',
		form : {
			name : '김지연',
			phone : '010-8506-2033'
		}
	};
	
	request(option, function(err, response, body) {
		if (err)
		{
			console.log("Request module error : " + err);
			res.writeHead(500, {"Content-Type" : "text/plain"});
			res.end("Request module error!");
		}
		else
		{
			let bodyParsed = JSON.parse(body);
			var field;
			var msg;

			console.log("Successfully get response");
			console.log("my infomation : ", bodyParsed); 

			field = Object.keys(bodyParsed.data);

			let object = json2csv.parse(bodyParsed.data, {field});

			fs.writeFile('./info.csv', object, function(err) {
				if (err) {
					msg = "write csv error : "+ err;
					console.log(msg);
					
				} else {
					msg = "successful write csv";
					console.log(msg);
				}

				res.writeHead(200, {"Content-Type" : "text/plain"});
				res.end(msg);
			}); // fs.writeFile

		}
	}); // request

}).listen(3000, function() {
	console.log('connected 3000 port!!');
});
