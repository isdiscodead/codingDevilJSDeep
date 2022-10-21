/*
호이스팅 Hoisting

스코프 내부 어디서든 변수 선언부의 코드가 최상단에 있는 것처럼 작동하는 것
var를 사용한 변수의 경우 호이스팅됨 ! let, const도 호이스팅은 되지만 `TDZ`의 영향으로 오류 발생 
초기화, 할당은 호이스팅 되지 않아 undefined로 표시됨

*/

console.log(nameVar)
var nameVar = "Jane";



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
let id = Symbol(); // new 없이 사용 ... 
let id1 = Symbol('id'); // 매개변수로 들어가는 것은 설명 ! 
let id2 = Symbol('id'); // id2와 다름
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
isNaN(1) // false

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



/*
String 
*/

// ", ', ` 사용 
// `( 백틱 )은 변수, 표현식, 여러 줄을 포함한 문자열 사용 시 사용
let name = "지언";
let result = `My name is ${name}.`;

const str = "Hi guys. Nice to meet you.";

str.length // 문자열 길이
str[2] // 특정 위치에 접근 … 변경은 불가
str.toUpperCase() // 모두 대문자로 변경
str.toLowerCase() // 모두 소문자로 변경
str.indexOf('is'); // 특정 문자 인덱스 찾기

if ( str.indexOf('Hi') > -1 ) {
	console.log('Hi가 포함된 문장');
}

// 부분 문자열 -> slice()와 substring()
let desc = "abcdefg";
desc.slice(2); // "cdefg"
desc.slice(0, 5); // "abcde"
desc.slice(2, -2); // "cde"

desc.substring(2, 5); // "cde"
desc.substring(5, 2); // "cde"

// substr(n, m) -> n부터 시작해서 m개 가져옴 
desc.substr(2, 4); // "cdef"
desc.substr(-4, 2); // "de"


// 문자열의 비교는 ASCII 코드를 기준으로 진행됨 
"a".codePointAt(0); // 97
String.fromCharCode(97); // "a"


/*
array
*/

let arr1 = [1,2,3,4,5];

// find()는 함수로 복잡한 연산을 통한 검색 가능 ! 
const resultArr = arr.find((item) => {
	return item % 2 === 0;
})

console.log(resultArr);

let userList = [
	{ name : "Mike", age: 30 },
	{ name : "Jane", age: 27 },
	{ name : "Tom", age: 10 },
];

let newUserList = userList.map((user, index) => {
	return Object.assign({}, user, { id : index, isAdult : user.age > 19 });
});

console.log(newUserList);

// arr.sort() -> 문자열 혹은 전달된 함수를 기준으로 정렬 
let testArr = [27, 8, 4, 13];

function sortFn(a, b) {
	return a - b; // a가 크면 양수, 같으면 0, a가 작으면 음수 
	// 작은 수를 앞으로 보내는 내부 로직 
}

arr.sort(sortFn);

console.log(arr);

// 보통은 Lodash 같은 라이브러리 사용해서 _.sortBy(arr); 처럼 사용 

// arr.reduce() -> arr.reduce(fnc) : ( 누적 계산값, 현재 값 ) ⇒ { return 계산값 }; 으로 사용 ... 누적 합산 등
let reduceResult = arr.reduce((prev, cur)=> {
	return prev + cur;
}, 0); // 초기값은 optional ... 

console.log(reduceResult);

reduceResult = userList.reduce((prev, cur) => {
	if ( cur.age > 19 ) {
		prev.push(cur.name); // 19살 이상인 사람의 이름만 배열에 추가 
	}
	return prev; 
}, []);

// arr.reduceRight()는 동일하게 작동하지만 우측부터 연산 시작됨 ~~ 


/*
구조 분해 할당 ( Destructuring Assignment ) 
*/
// 배열 구조 분해 
let users = ['Mike', 'Tom', 'Jane'];
let [userA, userB, userC] = users;
console.log(user2);

// 배열 구조 분해 ... 기본값 설정 및 건너뛰기 
let [x=1, , y=5] = [1, 2];
console.log(x);
console.log(y);

// 바꿔치기
[x, y] = [y, x];

// 객체 구조 분해 
let {age, name2} = user; // key값 사용 시 순서 상관 X
console.log(name2);
let {name: userName, age: userAge} = user;
console.log(userAge);


/*
나머지 매개변수와 전개 구문
 */
// Rest Parameters ... : 개수가 정해지지 않은 인수를 배열처럼 사용
// arguments와 달리 화살표 함수에서도 사용 가능, 배열 method 사용 가능 
function showName(...names) {
	console.log(names);
}

showName(); // [] 빈 배열 
showName('Mike'); // ['Mike']
showName('Mike', 'Tom'); // ['Mike', 'Tom']

// 전개 구문 Spread Syntax
// 배열, 객체를 풀어서 사용할 수 있음 
let arrA = [1, 2, 3];
let arrB = [4, 5, 6];
arrA = [...arrA, ...arrB];
console.log(arrA);

let programmer = { name : "Ggongchi" };
let info = { age : 30 };
let fe = ["JS", "React"];
let lang = ["Korean", "English"];

programmer = {
	...user,
	...info,
	skills : [...fe, ...lang]
};

console.log(programmer);