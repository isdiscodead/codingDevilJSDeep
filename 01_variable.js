/*
호이스팅 Hoisting

스코프 내부 어디서든 변수 선언부의 코드가 최상단에 있는 것처럼 작동하는 것
var를 사용한 변수의 경우 호이스팅됨 ! let, const도 호이스팅은 되지만 `TDZ`의 영향으로 오류 발생 
초기화, 할당은 호이스팅 되지 않아 undefined로 표시됨

*/

console.log(name)
var name = "Jane";


/*
생성자 함수
*/
function User(name, age) {
	// this = {}; ... 내부적인 동작 
	this.name = name;
  this.age = age;
	this.sayName = function() {
		console.log(name);
	}
	// return this;
}

// new 연산자를 사용해서 호출 -> 생성 
let user1 = new User('Mike', 30);
let user2 = new User('Jane', 22);
let user3 = new User('Tom', 17);
user3.sayName();


/*
Object 객체 
*/
// computed property
let a = 'age';
let user = {
	name : 'Mike',
	[a] : 30 // age : 30 
}

// 식 자체를 넣는 것도 가능 ! 
user = {
	[1 + 4] : 5, // 5 : 5 
	["안녕"+"하세요"] : "Hello"
}

// Object.assign(초기값, 소스1, 소스2 ... ) -> 객체 복제 / 병합 
let cloneUser = user; // 객체에 대한 참조값 복사
cloneUser = Object.assign({}, user);
console.log(cloneUser != user); // true

// Object.keys() -> 키 배열 반환
console.log(Object.keys(user));

// Object.values() -> 값 배열 반환
console.log(Object.values(user));

// Object.entries() : 키 / 값 배열 반환 
console.log(Object.entries(user));

// Object.fromEntries() : 키 / 값 배열을 객체로
const arr = [
	["name", "Mike"],
	["age", 30],
	["gender", "male"]
];
const newUser = Object.fromEntries(arr);
console.log(newUser);


/*
Symbol 심볼 -> 유일한 식별자를 만들 때 사용함 ! log 직으면 다 Symbol()로 뜨지만 내용물은 다름
*/
const id = Symbol(); // new 없이 사용 ... 
const id1 = Symbol('id'); // 매개변수로 들어가는 것은 설명 ! 
const id2 = Symbol('id'); // id2와 다름
console.log(id1.description);

const symbolUser = { // 프로퍼티 키로 사용
	name : "Mike",
	age : 30,
	[id] : 'myId'
} 

Object.keys(symbolUser); // name과 age만 출력됨 -> 원본 객체 수정 없이 새로운 속성 추가 가능
Object.getOwnPropertySymbols(symbolUser); // 존재하는 symbol 키 리스트
Reflect.ownKeys(symbolUser); // symbol 키를 포함한 모든 key 리스트 

// 전역 심볼 
id1 = Symbol.for('id'); // 하나를 생성한 뒤 키를 통해 같은 Symbol 공유
id2 = Symbol.for('id'); // id1 === id2
console.log(Symbol.keyFor(id1)); 


/*
Number, Math
*/
// 진법 변환 -> toString() 
let num1 = 10;
let num2 = 255;

num1.toString(); // "10"
num1.toString(2); // 이진수 .. "1010"
num2.toString(16); // 16진수 .. "ff"

// Math : 수학과 관련된 property, method를 가진 내장 객체
console.log(Math.PI); // 원주율 
num1 = 5.1;
num2 = 5.7;

// Math.ceil(num) -> 올림 
console.log(Math.ceil(num1)); // 6
console.log(Math.ceil(num2)); // 6

// Math.floor(num) -> 내림
console.log(Math.floor(num1)); // 5
console.log(Math.floor(num2)); // 5

// Math.round(num) → 반올림
console.log(Math.round(num1)); // 5
console.log(Math.round(num2)); // 6

// 소수점 자릿수 표현 -> Math.round(값 * 10^자릿수)/10^자릿수 공식 사용 or toFixed()
// ex. 소수점 둘째자리 표현 
let userRate = 30.1234;
console.log( Math.round(userRate * 100)/100 ); // 30.12
console.log( userRate.toFixed(2) ); // "30.12"

// isNaN() -> NaN인지 확인하는 유일한 방법 !! 
NaN === NaN // false
isNaN(x) // false

// parseInt()와 Number()
let margin = '10px';
parseInt(margin); // 10
Number(margin); // NaN

let redColor = 'f3';
parseInt(redColor); // NaN
// 진법 설정 가능 !! 
parseInt(redColor, 16); // 243
parseInt('11', 2); // 3

// parseFloat()도 parseInt()와 동일하게 동작, 부동소수점 반환
let padding = '18.5%';
parseFloat(padding); // 18.5
parseInt(padding); // 18 -> 소수점 이하 무시 

// 1 ~ 100 사이의 랜덤 숫자 뽑기
Math.floor( Math.random() * 100 ) + 1;