---
title: "[링크] Cloud에서 Rust의 전망이 밝은 이유"
path: /2021-01-09-cloud-rust
type: post
category: Dev
date: 2021-01-09
---

[Why Rust Has a Bright Future in the Cloud](https://www.qovery.com/blog/why-rust-has-a-bright-future-in-the-cloud)

- Rust는 클라우드 인프라를 향상하기 위한 소프트웨어를 구축하는데 진출하고 있다.

  1. Rust의 퍼포먼스는 C, C++과 견줄만하다.
      - Rust는 런타임이나 가비지 콜렉터를 사용하지 않기 때문에 C, C++과 비슷한 퍼포먼스를 낼 수 있다. 클라우드 컴퓨팅에서는 치명적인 오버헤드를 줄이기 위해 높은 퍼포먼스를 요구하는 low-level 인프라 컴포넌트가 필요한데, Rust는 퍼포먼스와 속도를 낮추지 않고도 보안과 안전성에 초점을 맞추었기 때문에 이에 적합하다.
  2. 낮은 메모리 사용량
      - 클라우드 컴퓨팅에서 메모리는 큰 비용을 차지한다. Rust는 데이터를 힙이나 스택에 저장할 수 있고 더 이상 사용하지 않을 경우 컴파일 시간에 호출한다. 메모리를 효율적으로 사용할 수 있어 클라우드 컴퓨팅에 유용하다. 
  3. 안전한 설계
      - Rust의 컴파일러는 또한 메모리 안전성을 제공한다. Rust는 가비지 콜렉터 (GC)를 사용하지 않고 컴파일러가 컴파일 시간에 메모리 오류를 점검한다. 또한 소유권 모델과 엄격한 타입, 동시 안전성을 같이 검사하면서 테스트 및 검증 비용도 절감할 수 있다.

- Rust의 Borrow checker, 소유권, 라이프타임은 메모리 관리를 최적화하는데 좋은 특징이고 클라우드에서 Rust를 선택하는 이유가 된다.
- Rust 사용이 늘어나고 있다.

  - AWS Firecracker
  - Linkerd
  - Qovery Engine



