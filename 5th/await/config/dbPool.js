
const mysql = require('promise-mysql');

const dbConfig = {
	host : 'myinstance2.ceuhngw0tvun.ap-northeast-2.rds.amazonaws.com',
	port : 3306,
	user : 'root',
	password : 'asdfzxcv',
	database : 'board',
	connectionLimit : 20
};

module.exports = mysql.createPool(dbConfig);

