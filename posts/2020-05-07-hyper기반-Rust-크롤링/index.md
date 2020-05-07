---
title: hyper 기반 Rust 크롤링
path: /2020-05-07-hyper기반-Rust-크롤링
type: post
category: Dev
date: 2020-05-07
---

### hyper.rs

#[기본 튜토리얼](https://hyper.rs/guides/client/basic/)

### Tokio

`Tokio` 는 개발자들이 러스트로 비동기 프로그래밍을 할 수 있도록 해준다. `Tokio`를 사용하면 파일 읽기나 타이머와 같은 기나긴 시간을 동기식으로 기다리지 않고 바로 다른 프로그램을 실행할 수 있는 프로그램을 만들 수 있다.

좀 더 설명하자면 `Tokio`는 러스트로 비동기 어플리케이션을 제작할 수 있는 event-driven, non-bloking I/O 플랫폼이며 주로 다음과 같은 우수한 기능을 제공한다.

-   동기화 기본 요소와 channel, timeout, delay, interval를 포함한 비동기 작업
-   TCP/UPD 소켓, 파일 시스템 관리, 프로세스와 signal 관리를 포함한 비동기 I/0 용 API
-   작업 스케쥴러나 운영 체제의 이벤트 Queue가 지원하는 I/0 드라이버 및 고성능 타이머와 같은 비동기 코드를 실행하기 위한 런타임

#[Tokio](https://tokio.rs/docs/overview/)

#### async fn

`Rust` 의 `async fn` 를 사용하면 `Tokio`가 `futures` crate를 사용하면서 다른 라이브러리와 상호작용할 수 있다.
`futures`는 비동기 작업의 최종 값이라고 보면 되는데, `js`의 `Promise`와 동일한 개념이다.

#[async fn](https://tokio.rs/docs/getting-started/futures/)
