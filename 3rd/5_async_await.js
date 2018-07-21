const crypto = require('crypto-promise');

const fsmod = require('./fsmod.js');

var create = async function() {
	let pwd = 'password';

	const salt = await crypto.randomBytes(32); // 성공이든 실패든 수행 완료할 때까지 기다림
	const hashedpwd = await crypto.pbkdf2(pwd, salt.toString('base64'), 100000, 32, 'sha512');
	  
	console.log('salt : ' + salt.toString('base64'));
	console.log('hashedpwd : '+ hashedpwd.toString('base64'));
	  
	  								   // path.     // data                       // opts
	let result = await fsmod.writeFile('./pwd.txt', hashedpwd.toString('base64'), 'utf8');
	console.log(result); 

	let result2 = await fsmod.readFile('./pwd.txt', 'utf8');
	console.log(result2); 

	console.log(fsmod);
}

create();


// await의 문제점 : 에러(undefined) 처리 불가능
// 그래서 if문 또는 try-catch문 사용
