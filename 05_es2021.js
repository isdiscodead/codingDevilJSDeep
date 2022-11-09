// String.replaceAll -> 모든 문자열에 적용 
const str1 = "Hello World";
console.log(str1.repalceAll('l', '~'));
console.log(str1.replace(/l/g, "~")); // g -> 전역 검색


// Promise.any -> race()와 거의 동일 
const resPromise = new Promise((res, rej) => {
    setTimeout(() => {
        rej("fail")
    }, 1000)
});

const resPromise2 = new Promise((res, rej) => {
    setTimeout(() => {
        res("success")
    }, 2000)
});

// race -> 가장 먼저 완료된 결과값으로 이행/거부 
Promise.race([])
    .then(() => console.log("성공"))
    .catch(e => console.log(e));

// any -> 가장 먼저 이행된 객체 반환 
Promise.any([])
    .then(() => console.log("성공"))
    .catch(e => console.log(e));


// Logical Assignment Operators
function add(num1, num2) {
    num1 = num1 || 0; // undefined일 경우 0
    num2 ||= 0; // 위와 동일하게 작동
    console.log(num1 + num2);
}

name = name && `Hello ${name}`;
name &&= `Hello ${name}`;

// ??는 null 병합 연산자로, null이나 undefined일 때 뒤의 값
// ||는 falsy일 때 ... 
name = name ?? 'Mike';
name ??= 'Mike';


// numeric separator
let billion = '1,000,000,000'; // 10억
let billion2 = 1_000_000_000; // 10억... 실제 값에는 영향 x


// WeakRef 약한 참조자
// 가비지 컬렉터는 참조된 객체를 지우지 않음
// WeakRef는 가비지 컬렉터의 대상으로 인정되므로 신중히 사용 !! 
let user = { name: 'Mike', age: 30 };
const weakUser = new WeakRef(user);

user = null; // 참조 끊어주기 

const timer = setInterval(() => {
    const wUser = weakUser.deref();

    if ( wUser ) {
        console.log(wUser.name);
    } else {
        console.log('제거되었습니다');
        clearInterval(timer);
    }
}, 1000);

// 일정 시간만 사용할 수 있도록 캐시하는 데 사용됨 
class MyCache {
    constructor() {
        this.cache = {}
    }

    add(key, obj) {
        this.cache[key] = new WeakRef(obj);
    }

    get(key) {
        
    }

}