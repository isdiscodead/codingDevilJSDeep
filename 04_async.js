/*
Promise 프로미스
어떤 작업이 끝났을 때 알려주는 역할 ! → `비동기 처리` 시에 사용 

`new Promise`를 통해 생성된 객체는 `state`와 `result`를 가짐 …

**state** = `pending( 대기 )` → `fulfilled( 이행됨 )` or `rejected( 거부됨 )`

**result** = `undefined` → `value` or `error`
*/

// resolve는 성공, reject는 실패 ... 
const pr = new Promise((resolve, reject) => {
	/*
	// 3초 후 rejected, result는 error
	setTimeout(() => {
		reject(new Error('error..'));
	}, 3000);
	*/

	// 3초 후 resolve, value는 'OK'
	setTimeout(() => {
		resolve('OK');
	}, 3000);
});

// Promise.then()으로 실행 후 resolve, reject를 처리할 콜백 함수를 지정할 수 있음 
pr.then(
	function( result ){
		console.log(result + '가지러 가자.');
	}, 
	function(err){
		console.log('다시 시작해주세요.');
	}
);

// .catch()는 에러가 났을 때만 실행
// finally()는 마지막에 무조건 실행
// 아래 코드는 위의 코드와 동일함 + 더 높은 가독성 
pr.then(
	function( result ){
		console.log(result + '가지러 가자.');

    }
    ).catch(
	function(err){
		console.log('다시 시작해주세요.');
	}
    ).finally({
        // console.log("-- 주문 끝 --");
    }
);

// 아래처럼 depth를 늘려가며 실행하는 것은 callback hell… 
f1( function() {
	f2( function() {
		f3( function() {
			console.log("끝");
		});
	});
});

// promise를 통해 처리하면 아래처럼 깔끔하게 promise chain으로 구현 가능 !! 
f1()
.then( res => f2(res))
.then( res => f3(res))
.then( res => console.log(res))
.catch(console.log)
.finally(() => {
	console.log("끝")
});

// Promise.all -> 배열로 프로미스를 넘겨 모든 작업이 완료되었을 때를 기준으로 처리 -> 시간 절약 가능
// 중간에 프로미스가 reject 될 경우 오류 발생 !! → 하나라도 누락되면 보여주면 안 될 때 사용 … 
Promise.all([f1(), f2(), f3()])
.then( res => {
	console.log(res)
});
a
// Promise.race -> 배열로 프로미스를 넘겨 하나라도 완료되면 종료 후 반환
Promise.race([f1(), f2(), f3()])
.then( res => {
	console.log(res)
});


/*
async, await 
*/

// 함수 앞에 async 키워드를 붙이면 반환 값이 항상 Promise가 됨 → then() 사용 가능 
async function getName() {
	return Promise.resolve("Tom");
	// 함수 내부에서 에러 발생 시 rejected 상태의 프로미스 반환
	// throw new Error("error...");
} 

getName().then((name) => {
	console.log(name);
})

// await 키워드는 async 함수 내부에서만 사용 가능 !! 