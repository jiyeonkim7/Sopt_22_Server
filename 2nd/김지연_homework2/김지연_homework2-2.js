const http = require('http');
const request = require('request');
const fs = require('fs');
const json2csv = require('json2csv');
const Converter = require('csvtojson').Converter;


const server = http.createServer(function(req, res) {
	let option = {
		uri : 'http://13.125.118.111:3000/homework/2nd',
		method : 'GET'
	};
	
	let field;

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

			field = Object.keys(bodyParsed);

			let object = json2csv.parse(bodyParsed, {field});

			fs.writeFile('./res.csv', object, function(err) {
				if (err)
				{
					console.log("write csv error : "+ err);
				}
				else
				{
					console.log("successful write csv");
				}
			});

			console.log("Successfully get response");
			
			res.writeHead(200, {"Content-Type" : "text/plain"});
			res.end(bodyParsed.data);
		}
	}); // request



	let converter = new Converter({});

	converter.fromFile('./res.csv', function(err, result) {
		if (err)
		{
			console.log("read csv file error : " + err);
		}
		else
		{
			console.log("successful read csv file");

			jsonObj = JSON.stringify(result);

			res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
			res.end(jsonObj);
		}
	}); // converter.fromFile

}).listen(3000, function() {
	console.log('connected 3000 port!!');
});

