const user = {
    name : "Mike"
}

console.log(user.hasOwnProperty('name')); // true
// __proto__ -> prototype 객체 
// 만약 hasOwnProperty를 재정의할 경우 재정의된 내용이 나옴 !! 

// 상속 
// 공통된 부분을 처리 ... 
const car = {
    wheels : 4, 
    drive() {
        console.log("drive...");
    },
};

const bmw = {
    color : "red",
    navigation : 1,
}

const benz = {
    color : "black",
}

// __proto__ 재정의를 통해 car를 bmw, benz의 Prototype으로 사용 = car를 상속 받음 
bmw.__proto__ = car; // 출력 시에나 hasOwnProperty, Object.keys()에는 나오지 않음 
benz.__proto__ = car;

// 상속은 계속 이어질 수 있음
const x5 = {
    color : "white",
    name : "x5", 
};

x5.__proto__ = bmw;
console.log(x5.color); // 원래의 property를 우선적으로 ! -> prototype chain
console.log(x5.navigation);

// 생성자 함수를 이용
const BMW = function (color) {
    this.color = color;
}

BMW.prototype.wheels = car.wheels;
BMW.prototype.drive = car.drive;

const x5 = new BMW("pink");


/*
Class -> ES6에 추가된 스펙
*/
class User2 {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	showName() {
		console.log(this.name);
	}
}

// new 키워드로 constructor 호출, 객체 생성
const tom = new User2("Tom", 19); // User2의 프로토타입 가짐


// 상속 extends
// extends 키워드를 통해 상속 가능
class Car {
    constructor(color) {
        this.color = color;
        this.wheels = 4;
    }

    drive() {
        console.log("drive..");
    }
    stop() {
        console.log("STOP!");
    }
}

class Bmw extends Car {
    park() {
        console.log("PARK");
    }
}

const z4 = new Bmw("Blue"); 


// 오버라이딩 ( overriding )
class Bmw2 extends Car {
    park() {
        console.log("PARK");
    }
    stop() {
        super.stop(); // 부모의 기능도 사용
        console.log("OFF"); 
    }
}

z4 = new Bmw2("Blue"); 