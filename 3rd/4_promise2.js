const http = require('http');

http.createServer(function(req, res) {
	let status = "ok"

	/** 1st **/
	return new Promise((resolve, reject) => {
			if (status === "ok") resolve("ok"); // 1st, then문으로 (param:"ok")
			else reject("no"); // 1st, catch문 갔다가 then문으로 (err:"no")
		})
		
		.catch(err => {
			console.log("1st 실패 : ", err);
		})
		.then(param => {
			console.log("1st 성공 : ", param);
			let status = "ok";

			/** 2nd **/
			return new Promise((resolve, reject) => {
				if (status === "ok") resolve("ok"); // 2nd, then문으로 (param:"ok")
				else reject("no"); // 2nd, catch문 갔다가 then문으로 (err:"no")
			})
		})
		
		.catch(err => {
			console.log("2nd 실패 : ", err);
		})
		.then(param => {
			console.log("2nd 성공 : ", param);
			return new Promise((resolve, reject) => {
				res.writeHead(200, {
					"Content-Type" : "text/plain"
				});
				res.write("Successful Check Promise " + param);
				res.end();
			})
		});
}).listen(3000, function() {
	console.log("Connected 3000 port");
});


