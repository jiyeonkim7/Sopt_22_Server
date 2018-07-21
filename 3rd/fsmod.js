const fs = require('fs')

const readFile = (path, opts) => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, opts, (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
}
                   // path, data, opts
const writeFile = (...args) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(args[0], args[1], args[2], (err) => {
			if (err) reject(err);
			else resolve(args[1]);
		});
	});
}

// json 객체로 만들어 줌
module.exports = {
	readFile,
	writeFile
}



// exports.readFile = (path, opts) => {
// 	new Promise((resolve, reject) => {
// 		fs.readFile(path, opts, (err, data) => {
// 			if (err) reject(err);
// 			else resolve(data);
// 		});
// 	});
// }

// exports.writeFile = (path, data, opts) => {
// 	new Promise((resolve, reject) => {
// 		fs.writeFile(path, data, opts, (err) => {
// 			if (err) reject(err);
// 			else resolve();
// 		});
// 	});
// }