
function create() { 
	/** 첫번째 pending 상태 **/
	return new Promise(function(resolve, reject) { // executer 실행
		resolve(); // 첫번째 핸들러 함수 바인딩
		console.log("1. resolve");
	});
};




create()
/** 첫번째 pending 대기 상태 _맨 밑으로! **/

/** 두번째 settled 상태 **/
.then(function() { // 첫번째 꺼 resolve
	console.log("3. 성공");
	/** 두번째 pending 상태 **/
	return new Promise(function(resolve, reject) {
		resolve(); // 두번째 핸들러 함수 바인딩
		console.log("4. Second resolve");
	});
}, function() {    // 첫번째 꺼 reject 
	console.log("3. 실패");
})

.then(function() {  // 두번째 꺼 resolve
	console.log("5. 성공");
}, function() {    // 두번째 꺼 reject
	console.log("5. 실패");
});
/** 첫번째 pending 상태 끝 **/
console.log("2. 끝");
/** 두번째 settled 상태 시작 **/