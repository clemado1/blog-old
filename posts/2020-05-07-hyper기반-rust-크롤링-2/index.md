---
title: hyper 기반 rust 크롤링 2
path: /2020-05-07-hyper기반-rust-크롤링-2
type: post
category: Dev
date: 2020-05-13
---

## 목표

주간 업무 보고서 작성을 위해 한 주간 발송 메일을 .csv 파일로 Export 한다.

`hyper`를 사용하여 작성한 뒤, [reqwest](https://github.com/seanmonstar/reqwest)로 변경한다. `reqwest`는 `hyper`를 이용하여 만든 쉽고 간편한 HTTP Client 라이브러리이다.

## hyper

### Dependencies

`Cargo.toml` `dependencies`에 아래 라이브러리를 추가한다.

```toml
dotenv = "0.14.1"
hyper = "0.13"
# hyper library for HTTPS
hyper-tls = "0.4"
tokio = { version = "0.2", features = ["full"] }
```

-   `dotenv`: URL이나 계정 정보를 코드 및 원격 저장소에 노출되지 않도록 하기 위해 이용했다.
-   `hyper-tls`: 크롤링할 사이트가 HTTPS라면 필요

### Runtime

`tokio` 런타임을 사용하는 메인 함수를 정의했다.

```Rust
// main.rs

extern crate hyper;
extern crate hyper_tls;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {

    Ok(())
}
```

### Client

`hyper`의 `Client`를 생성한다. 프로토콜이 HTTP인지 HTTPS인지에 따라 방법이 나뉜다.

-   HTTP

    ```Rust
    use hyper::Client;

    let client = Client::new();
    ```

-   HTTPS

    ```Rust
    use hyper::Client;
    use hyper_tls::HttpsConnector;

    let https = HttpsConnector::new();
    let client = Client::builder().build::<_, hyper::Body>(https);
    ```

### 로그인

`Client`를 이용하여 사이트에 로그인 요청을 보낸 다음 쿠키를 저장한다.

```Rust
extern crate hyper;
extern crate hyper_tls;

use hyper::{self, Client, Method, Request};
use hyper::header::{self, SET_COOKIE};
use hyper_tls::HttpsConnector;

use dotenv::dotenv;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let https = HttpsConnector::new();
    let client = Client::builder().build::<_, hyper::Body>(https);

    dotenv().ok();

    let req_url = std::env::var("URL").expect("URL must be set");
    let req_id = std::env::var("ID").expect("ID must be set");
    let req_pw = std::env::var("PW").expect("PW must be set");

    let login_json = format!(r#"{{"username": "{}", "password": "{}", "returnUrl": ""}}"#, req_id, req_pw);

    let request = Request::builder()
        .method(Method::POST)
        .uri(req_url)
        .header("content-type", "application/json")
        .header("X-Requested-With", "XMLHttpRequest")
        .body(Body::from(
            login_json
        ))?;

    let response = client.request(request).await?;

    println!("Response: {}", resp.status());

    let cookie = response
    .headers()
    .get(SET_COOKIE)
    .and_then(|val| val.to_str().ok());

    match cookie {
        Some(my_cookie) => Ok(my_cookie.to_string()),
        None => {panic!("로그인 실패");},
    }

    Ok(())
}

```
