---
title: Rust hyper 사용해보기 1
path: /2020-05-07-Rust-hyper-사용해보기-1
type: post
category: Dev
date: 2020-05-07
---

Rust에서 빠질 수 없는 `tokio` 와 비동기의 개념을 먼저 기술한다. `hyper` 사이트에서 링크해둔 `tokio` 공식 사이트 페이지를 일부 번역하는 것으로 대신한다.

## Tokio

`Tokio`는 개발자들이 러스트로 비동기 프로그래밍을 할 수 있도록 해주는 비동기 런타임이다. `Tokio`를 사용하면 파일 읽기나 타이머와 같은 기나긴 시간을 가진 작업을 동기식으로 기다리지 않고도 바로 다른 프로그램을 실행할 수 있는 프로그램을 만들 수 있다.

좀 더 설명하자면 `Tokio`는 러스트로 비동기 어플리케이션을 제작할 수 있는 event-driven, non-bloking I/O 플랫폼이며 주로 다음과 같은 우수한 기능을 제공한다.

-   동기화 기본 요소와 channel, timeout, delay, interval를 포함한 비동기 작업
-   TCP/UPD 소켓, 파일 시스템 관리, 프로세스와 signal 관리를 포함한 비동기 I/0 용 API
-   작업 스케쥴러나 운영 체제의 이벤트 Queue가 지원하는 I/0 드라이버 및 고성능 타이머와 같은 비동기 코드를 실행하기 위한 런타임

...(후략)

> [What is Tokio?](https://tokio.rs/docs/overview/)

### futures

#### async fn

`Rust`의 `async fn`를 사용하면 `Tokio`가 `futures crate`를 사용하면서 다른 라이브러리와 상호작용할 수 있다.
`futures`는 비동기 작업의 최종 값이라고 보면 되는데, `js`의 `Promise`와 동일한 개념이다.

##### 동기 모델

```rust
let mut socket = TcpStream::connect("127.0.0.1:8080").unwrap();
let mut buf = [0; 1024];
let n = socket.read(&mut buf).unwrap();

// Do something with &buf[..n];
```

위 코드에서 `socket.read`를 호출할 때, 소켓에 데이터가 주어져 있다면 바로 결과가 떨어지지만 소켓에 데이터가 없다면 `read` 함수는 데이터를 받을 수 있을 때까지 현재 스레드를 `block` 한다.

각 소켓으로부터 한 번에 데이터를 읽어오려면 소켓 당 스레드를 만들어 주어야 한다. 이런 방식을 사용할 경우 많은 소켓으로 확장하기 어려운 [c10k](https://en.wikipedia.org/wiki/C10k_problem) 문제가 생긴다.

##### Non-blocking sockets

위와 같은 문제를 피하려면 스레드를 block 하지 않는 Non-blocking 소켓을 사용하면 된다. 버퍼에 데이터가 없다면 `read` 함수는 데이터를 기다리는 대신, 아직 읽을 수 없다는 신호를 즉시 내보낼 것이다.

뿐만 아니라 데이터가 도착하기를 기다리는 동안 다른 작업을 할 수도 있다. 도중에 데이터가 도착한다면 OS가 프로세스에 알릴 것이고 프로세스는 그때 다시 데이터를 읽어 온다.

이러한 I/O 모델은 [mio](https://github.com/tokio-rs/mio)를 사용한다. mio는 Rust의 low level non-blocking I/O 라이브러리다.
mio의 문제는 mio를 사용하는 어플리케이션이 높은 복잡성을 요구한다는 점이다. 어플리케이션은 반드시 자신의 현재 상태를 추적하는 대규모 상태 기계를 유지해야 한다. 어플리케이션은 OS에게 알림을 받을 때 읽기 등의 수행을 하고 그에 따른 상태를 업데이트한다.

##### async fn

Rust의 `async fn` 은 프로그래머들이 비동기를 동기 논리 흐름으로 개발을 할 수 있도록 해준다. 즉 코드 진행을 실제 처리 흐름과 동일하게 작성할 수 있다. 컴파일러가 코드를 변형시켜 non-blocking 소켓을 사용하는데 필요한 상태 기계를 생성해 줄 것이다.

`TcpStream::connect` 같은 `async fn` 을 호출하면 현재 스레드가 완료될 때까지 막는 대신 연산 값을 즉시 반환한다. 이 값은 `Future trait`를 구현한다. 계산이 언제 어디서 일어날지 보장은 없다. 바로 일어날 수도 있지만 시간이 걸릴 수도 있는데 대부분은 시간이 걸린다. `.await`는 호출한 사람이 결과를 받기를 바라는 미래에 호출된다. 이 실행 흐름은 `Future` 가 완성되고 `.await` 가 결과를 반환할 때 끝난다.

Rust는 프로그램을 컴파일할 때 모든 `.await` 호출을 찾아서 `async fn` 을 각 `.await` 변수를 가진 열거형과 같은 종류의 상태 기계로 변환한다.

##### futures 자세히 살펴보기

위에서 나온 대로 `async fn` 호출은 `Future` 인스턴스를 반환한다. 여기서 `Future`란 정확히 무엇인가?

`Future`는 비동기 연산의 종료를 나타내는 값이다. 보통 future는 시스템의 다른 곳에서 발생하는 이벤트에 의해 완성된다. (OS의 I/O 이벤트, 타이머, 채널의 메시지 수신 등)

일찍이 서술된 대로 Rust의 비동기 모델은 다른 언어와 매우 다르다. 대부분의 타 언어는 특정 콜백 형식을 사용하여 만든 `completion` 기반 모델을 사용한다. 이 경우, 비동기 동작을 시작할 때 작업이 끝나면 호출할 함수를 같이 보낸다. OS가 보내는 I/O 알림을 프로세스가 받으면 관련된 함수를 찾고 그 함수를 즉시 호출한다. 값을 콜백에 밀어 넣기 때문에 push 기반 모델이다.

러스트의 비동기 모델은 pull 기반이다. `Future`는 데이터를 콜백에 밀어 넣는 역할을 하기보다는 데이터가 완전한지 아닌지를 파악하는 어떤 것에 의존하는데, `Tokio`의 경우 바로 `Tokio runtime`이다.

pull 기반 모델은 비용이 들지 않는 추상화 등 많은 이점을 가지고 있다. 즉 러스트 `futures`를 사용하면 비동기 코드를 직접 작성하는 것 이상으로는 추가 오버헤드가 발생하지 않는다.

##### Future trait

`future trait`는 아래와 같다.

```rust
use std::pin::Pin;
use std::task::{Context, Poll};

pub trait Future {
    /// The type of value produced on completion.
    type Output;

    /// Attempt to resolve the future to a final value, registering
    /// the current task for wakeup if the value is not yet available.
    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;
}
```

현재 시점에서는 future가 완료될 때 산출되는 `associated type`, 아웃풋을 future가 갖고 있는지를 아는 것이 중요하다. poll 함수는 `Tokio runtime`이 future가 완료되었는지 확인하는 용도의 함수이다.

> [async fn](https://tokio.rs/docs/getting-started/futures/)
