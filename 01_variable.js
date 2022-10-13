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