const http = require('http');
const request = require('request');
const url = require('url');
const querystring = require('querystring');
const crypto = require('crypto');


const server = http.createServer(function(req, res) {

	let urlPath = 'localhost:3000/test?str=asdf1234';

	let option = {
		uri : 'http://13.125.118.111:3000/test',
		method : 'GET'
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
			let urlParsed = url.parse(urlPath);
			let queryParsed = querystring.parse(urlParsed.query);
			var str = queryParsed.str;
			var msg;

			crypto.randomBytes(32, function(err, buffer) {
				if (err)
				{
					console.log(err);
				}
				else
				{
					crypto.pbkdf2(str, buffer.toString('base64'), 100000, 64, 'sha512', function(err, hashed) {
						if (err)
						{
							console.log(err);
							msg = "fail";
						}
						else
						{
							console.log("Successfully get response");
							msg = "success";
						}

						var jsonObj = JSON.stringify({
							msg: msg,
							hashed: hashed.toString('base64')
						});

						res.writeHead(200, {"Content-Type" : "text/plain"});
						res.end(jsonObj);

					}); // crypto.pbkdf2
				}

			}); // crypto.randomBytes
		} 

	}); // request
}).listen(3000, function() {
	console.log('connected 3000 port!!');
});

