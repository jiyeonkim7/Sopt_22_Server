const crypto = require('crypto');

var str = 'asdf1234';

// 1. 단순 해싱으로 비밀번호 해싱
let hashAlgorithm = crypto.createHash('sha512');
// 2. 선택된 알고리즘으로 해싱
let hashing = hashAlgorithm.update(str);
// 3. 표시할 인코딩 설정
let hashedString = hashing.digest('base64');

// let hashedString = crypto.createHash('sha512').update(str).digest('base64');

console.log('hashAlgorithm : ' + hashAlgorithm);
console.log('hashing : ' + hashing);
console.log('hashedString : ' + hashedString);

// 랜덤 salt 생성
crypto.randomBytes(32, function(err, buffer) {
	if (err) {
		console.log(err);
	} else {
		console.log(buffer);
		console.log('buffer : ' + buffer.toString('base64'));

		// 해싱하기 (string, salt, iterations, length, algorithm, callback)
		crypto.pbkdf2(str, buffer.toString('base64'), 100000, 64, 'sha512', function(err, hashed) {
			if (err) {
				console.log(err);
			} else {
				console.log(hashed);
				                          // 생성된 값은 인코딩해줘야 함
				console.log('hashed : ' + hashed.toString('base64')); 
			}
		});
	}
});