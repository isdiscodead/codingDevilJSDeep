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
function getName2(name) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(name);
		}, 1000);
	});
}

async function showName() {
	const result = await getName2('Mike'); // Promise의 값을 기다림 
	console.log(result); // 1초 후 출력됨 
}

// rejected는 try-catch문으로 감싸주면 됨 ! 
const f1 = () => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res("1번 주문 완료");
		}, 1000);
	})
}

const f2 = () => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res("2번 주문 완료");
		}, 3000);
	})
}

const f3 = () => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res("3번 주문 완료");
		}, 2000);
	})
}

// Promise.then()보다 높은 가독성 ! 
console.log("시작");
async function order() {
	// const result = await Promise.all([f1(), f2(), f3()]); 
	const result1 = await f1();
	const result2 = await f2(result1);
	const result3 = await f3(result2);
	console.log(result3);
	console.log("종료");
}


/*
Generator -> 함수의 기능을 중간에 멈췄다가 다시 실행 가능
*과 yield 키워드 사용 !! Generator 함수 사용시 Generator 객체 반환됨 
.next()로 yield문을 기점으로 실행 가능 
*/
function* fn() {
	console.log(1);
	yield 1; // value:1 , done: false
	console.log(2);
	yield 2; // value:2 , done: false
	console.log(3);
	console.log(4);
	yield 3;
	return "finish"; // value: "finish", done: true
}

const a = fn();
a.next(); 
a.next(); 
a.next(); 

// 즉시 종료
a.return('END');
a.throw(); // catch 블록에 있는 내용 실행, done을 true로 

// generator는 iterable ( 반복 가능 )이면서 iterator ...
// 배열도 iterable하며, 아래와 같은 특징을 가지지만 사용하지 않을 뿐 ! 
// 1. Symbol.iterator 메서드 존재
// 2. Symbol.iterator는 iterator 반환 

// iterator
// 1. value와 done 속성을 가지는 객체를 반환하는 next()를 가짐 
// 2. 작업이 끝나면 done은 true가 됨 

// 인수를 입력 받을 수도 있음
function* fn2() {
	const num1 = yield "첫번째 숫자를 입력해주세요";
	console.log(num1);

	const num2 = yield "두번째 숫자를 입력해주세요";
	console.log(num2);

	return num1 + num2;
}

const b = fn();

b.next(); // value: 첫번째 숫자를 입력해주세요 
b.next(2); // num1: 2
b.next(); // value: 두번째 숫자를 입력해주세요
b.next(4); // num2: 4
b.next(); // value: 6, done: true

// generator는 값을 미리 만들어두지 않음 !! 따라서 무한 반복도 가능 
function* infinite() {
	let index = 0;
	while ( true ) {
		yield index ++;
	}
}

const c = fn();
// 원하는 만큼 c.next() 사용 가능
c.next(); // 1
c.next(); // 2

// yield* 로 다른 제네레이터 호출 가능
function* gen1() {
	yield "w";
	yield "o";
	yield "r";
	yield "l";
	yield "d";
}

function* gen2() {
	yield "Hello, ";
	yield* gen1(); // 반복 가능한 모든 객체가 올 수 있음 
	yield "!"; 
}