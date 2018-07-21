const async = require('async');

console.log('Program Start!');

let taskArray = [
	function (callback) {
		console.log('First step --> ');
			callback(null, '1', '2');  // error, arg1, arg2 (func2)
	},
	function (arg1, arg2, callback) {
		console.log('Second step --> ' + arg1 + ' ' + arg2);
		callback(null, '3', arg1);  // error, arg1 (func3)
		
	},
	function (arg1, arg2, callback) {
		console.log('Third step --> ' + arg1 + ' ' + arg2);

		let jsonObj = JSON.stringify({
			arg1: arg1,
			arg2: arg2
		});
		callback(null, jsonObj); // error, result (waterfall 함수의 callback func)
	}
];

async.waterfall(taskArray, function(err, result) {
		if (err) {
			console.log('* Error : ' + err);
		} else {
			console.log('* Result : ' + result);
		}
	});
console.log('Program End!');


// console.log('Program Start!');

// let taskArray = [
// 	firstFunction,
// 	secondFunction,
// 	thirdFunction
// ];
// function firstFunction(callback) {
// 	console.log('First step --> ');
// 	callback(null, '1', '2');
// };
// function secondFunction(arg1, arg2, callback) {
// 	console.log('Second step --> ' + arg1 + ' ' + arg2);
// 	callback(null, '3');
// };
// function thirdFunction(arg1, callback) {
// 	console.log('Third step --> ' + arg1);
// 	callback(null, 'Finish');
// };
// async.waterfall(taskArray, function(err, result) {
// 	if (err) {
// 		console.log('Error : ' + err);
// 	} else {
// 		console.log('Result : ' + result);
// 	}
// });
// console.log('Program End!');