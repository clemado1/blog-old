---
title: "[스터디] 비동기"
path: /2021-01-18-async
type: post
category: Study
date: 2021-01-18
---

입출력(I/0) 시스템을 구현한다면 소켓에서 데이터를 읽어오는 작업이 있을 것이다. 만약 단순히 동기 방식으로 데이터를 읽어온다면 소켓에서 데이터를 읽을 수 있을 때 까지 자원을 유휴 상태로 만들면서 기다릴 것이다. 만약 여러 소켓으로부터 한 번에 데이터를 읽으려면 소켓 수 만큼이나 스레드가 필요하고 이는 결국 치명적인 문제를 유발한다. [The C10K Problem](http://www.kegel.com/c10k.html) 이를 해결하기 위한 방법으로 NonBlocking과 비동기 호출이 있다. NonBlocking과 비동기는 개념의 유사성때문에 주로 같이 사용하기도 하지만 나누어보면 아래와 같다.

<br/>

| 구분            | 개념                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| **비동기**      | 입출력이나 연산, 조회 등 작업을 시작한 다음 기다리지 않고 있다가 약속한 시점에 데이터를 받거나 행위를 수행하는 방식 |
| **NonBlocking** | 입출력이나 연산, 조회 등 작업을 시작한 다음 스레드를 Block하지 않고 다른 작업을 수행하는 방식                       |

<br/>
<br/>

# 비동기 (Asynchrony)

비동기 프로그래밍은 코드의 흐름과 상관없이 이벤트를 처리한다. 냄비에 올려두고 잠깐 설거지를 하듯이 작업을 실행하고 다른 일을 하거나 쉬고 있다가 특정 시간에 확인할 수 있다. 보통은 `javascript`가 그러하듯이 `completion` 방식으로, 작업이 완료되면 미리 보낸 `callback` 함수를 호출한다. 드물게 `Rust`는 `pull` 방식을 사용하는데 따로 `callback` 함수를 두지 않고 필요한 시점에 자료를 요청하는 방식이다. `pull` 방식은 비동기 프로그램도 동기 프로그램과 비슷하게 코딩할 수 있다는 장점이 있다.

### javascript

`javascript`의 내장 비동기 함수인 `setTimeout(callback, time)`를 사용한다. `setTimeout`은 `callback`함수와 대기할 시간(ms)을 인자로 받는다.

#### callback

```javascript
function sayHello(name, func) {
	setTimeout(() => {
		func(`Hello ${name}!`);
	}, 3000);
}

console.log("calling..");
sayHello("Do", hi => console.log(hi));
console.log("waiting..");
```

```
calling..
waiting..
Hello Do!
```

`javascript`의 전통적인 `callback`방식이다. `callback` 함수를 받아 실행하는 구조로 되어 있기 때문에 복잡한 프로그램에서는 아래와 같은 [Callback Hell](http://callbackhell.com/)를 만날 수도 있다.

```javascript
fs.readdir(source, function(err, files) {
	if (err) {
		console.log("Error finding files: " + err);
	} else {
		files.forEach(function(filename, fileIndex) {
			console.log(filename);
			gm(source + filename).size(function(err, values) {
				if (err) {
					console.log("Error identifying file size: " + err);
				} else {
					console.log(filename + " : " + values);
					aspect = values.width / values.height;
					widths.forEach(
						function(width, widthIndex) {
							height = Math.round(width / aspect);
							console.log(
								"resizing " +
									filename +
									"to " +
									height +
									"x" +
									height,
							);
							this.resize(width, height).write(
								dest + "w" + width + "_" + filename,
								function(err) {
									if (err)
										console.log(
											"Error writing file: " + err,
										);
								},
							);
						}.bind(this),
					);
				}
			});
		});
	}
});
```

#### Promise

```javascript
function sayHello(name) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(`Hello ${name}!`);
		}, 3000);
	});
}

console.log("calling..");
sayHello("Do").then(hi => console.log(hi));
console.log("waiting..");
```

```
calling..
waiting..
Hello Do!
```

ES6에서 추가된 `Promise`

#### Promise + await/async

```javascript
function sayHello(name) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(`Hello ${name}!`);
		}, 3000);
	});
}

async function getHelloStr(name) {
	console.log("calling..");
	const hello = await sayHello(name);
	console.log(hello);
	console.log("waiting..");
}

getHelloStr("Do");
```

```
calling..
Hello Do!
waiting..
```

ES7에서는 `Promise`와 함께 쓸 수 있는 `await`와 `async` 키워드가 추가되었다. `await`는 `Promise`가 완료될 때까지 `async` 함수의 실행을 일시 중지한다. `async` 함수 내에서만 사용 가능하다.

### Rust

```rust
async fn say_hello(name: &str) {
    println!("Hello {}!", name);
}

#[tokio::main]
async fn main() {
    let hello = say_hello("Do");
    println!("Hi");
    hello.await;
}
```

```
Hi
Hello Do!
```
