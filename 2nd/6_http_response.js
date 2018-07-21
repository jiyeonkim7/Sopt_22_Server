const http = require('http');

const server = http.createServer(function(req, res) {

	console.log(req.url);

	res.statusCode = 200; // 성공
	res.setHeader('Content-Type', 'text/plain');
	res.write('Hello World\n');
	res.end();
}).listen(3000, function() {
	console.log('connected 3000 port!!');
});