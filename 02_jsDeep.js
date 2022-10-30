/*
클로저 Closure 
*/

// 어휘적 환경( Lexical Environment ) → 선언 여부에 따라 Lexical 환경에 저장된 내용 달라짐 … 함수나 코드 블록마다 각각의 Lexical 환경이 생성됨
// - `전역 Lexical 환경` : 스크립트 → 최상위 외부 렉시컬 환경
// - `내부 Lexical 환경` : 전역 Lexical 환경을 참조, 지역 변수나 매개변수 저장

// `클로저( Closure )` → 함수와 렉시컬 환경의 조합 ; 함수가 생성될 당시의 외부 변수를 기억 → 생성 이후에도 계속 접근 가능

function makeAdder(x) {
	return function(y) {
        return x + y;
	}
}

const add3 = makeAdder(3);
// add3 함수가 생성된 이후에도 상위 함수인 makeAdder의 x에 접근 가능해짐 
console.log(add3(2)); // makeAdder(3) -> function(2) { return 3 + 2 } ... 5

// add10과 add3은 서로 다른 렉시컬 환경을 가짐 
const add10 = makeAdder(10);
console.log(add10(5)); // 15
console.log(add3(1)) // 4

// 카운터 예제 -> 은닉화 가능 
function makeCounter() {
    let num = 0; // 생성 후 계속 사용될 외부 변수 
    
    return function() {
        return num++;
    };
}

let counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2


/*
콜백 함수 ... setTimeout(), setInterval()
*/
function fn(name) {
    console.log(name);
}

// setTimeout() -> 3초 후 log
setTimeout(fn, 3000, "Mike");
// 익명 함수로 사용해도 동일함 
setTimeout(function() {
    console.log("Jane")
}, 3000)

// setInterval() -> 3초 마다 실행
const tId = setInterval(fn, 3000, "Tom");
// clearInterval(tId);


/*
call, apply, bind
*/
