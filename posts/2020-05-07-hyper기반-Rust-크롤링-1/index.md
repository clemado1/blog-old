---
title: hyper 기반 Rust 크롤링 1
path: /2020-05-07-hyper기반-Rust-크롤링-1
type: post
category: Dev
date: 2020-05-07
---

Rust 에서 빠질 수 없는 `tokio` 와 비동기의 개념을 먼저 기술 한다.

## Tokio

`Tokio` 는 개발자들이 러스트로 비동기 프로그래밍을 할 수 있도록 해주는 비동기 런타임이다. `Tokio`를 사용하면 파일 읽기나 타이머와 같은 기나긴 시간을 동기식으로 기다리지 않고 바로 다른 프로그램을 실행할 수 있는 프로그램을 만들 수 있다.

좀 더 설명하자면 `Tokio`는 러스트로 비동기 어플리케이션을 제작할 수 있는 event-driven, non-bloking I/O 플랫폼이며 주로 다음과 같은 우수한 기능을 제공한다.

-   동기화 기본 요소와 channel, timeout, delay, interval를 포함한 비동기 작업
-   TCP/UPD 소켓, 파일 시스템 관리, 프로세스와 signal 관리를 포함한 비동기 I/0 용 API
-   작업 스케쥴러나 운영 체제의 이벤트 Queue가 지원하는 I/0 드라이버 및 고성능 타이머와 같은 비동기 코드를 실행하기 위한 런타임

...(후략)

[Tokio](https://tokio.rs/docs/overview/)

### futures

#### async fn

`Rust` 의 `async fn` 를 사용하면 `Tokio`가 `futures` crate를 사용하면서 다른 라이브러리와 상호작용할 수 있다.
`futures`는 비동기 작업의 최종 값이라고 보면 되는데, `js`의 `Promise`와 동일한 개념이다.

##### 동기 모델

```rust
let mut socket = TcpStream::connect("127.0.0.1:8080").unwrap();
let mut buf = [0; 1024];
let n = socket.read(&mut buf).unwrap();

// Do something with &buf[..n];
```

위 코드에서 `socket.read` 를 호출할 때, 소켓에 데이터가 주어져 있다면 바로 결과가 떨어지지만 소켓에 데이터가 없다면 `read` 함수는 데이터를 받을 수 있을 때 까지 현재 스레드를 `block` 한다.

각 소켓으로부터 한 번에 데이터를 읽어오려면 소켓 당 스레드를 만들어 주어야 한다. 이런 방식을 사용할 경우 많은 소켓으로 확장하기 어려운 [c10k](https://en.wikipedia.org/wiki/C10k_problem) 문제가 생긴다.

##### Non-blocking sockets

위와 같은 문제를 피하려면 스레드를 block하지 않는 Non-blocking 소켓을 사용하면 된다. 버퍼에 데이터가 없다면 `read` 함수는 데이터를 기다리는 대신, 아직 읽을 수 없다는 신호를 즉시 내보낼 것이다.

뿐만 아니라 데이터가 도착하기를 기다리는 동안 다른 작업을 할 수도 있다. 도중에 데이터가 도착한다면 OS가 프로세스에 알릴 것이고 프로세스는 그 때 다시 데이터를 읽어 온다.

이러한 I/O 모델은 [mio](https://github.com/tokio-rs/mio)를 사용한다. mio는 Rust의 low level non-blocking I/O 라이브러리다.
mio의 문제는 mio를 사용하는 어플리케이션이 높은 복잡성을 요구한다는 점이다. 어플리케이션은 반드시 자신의 현재 상태를 추적하는 대규모 상태 기계를 유지해야한다. 어플리케이션은 OS에게 알림을 받을 때 읽기 등의 수행을 하고 그에 따른 상태를 업데이트 한다.

##### async fn

Rust 의 `async fn` 은 프로그래머들이 동기 로직 흐름으로 개발을 할 수 있도록 해준다. 즉 코드의 흐름을 실제 처리 흐름과 동일하게 작성 할 수 있다. 컴파일러가 코드를 변형시켜 non-blocking 소켓을 사용하는데 필요한 상태 기계를 생성해 줄 것이다.

...(후략)

[async fn](https://tokio.rs/docs/getting-started/futures/)
