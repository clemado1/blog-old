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

`Client`를 이용하여 사이트에 로그인 요청을 보낸다. 해당 페이지가 어떤 방식으로 로그인 정보를 전달하느냐에 따라 방식이 나뉜다. 여기에서는 GET 방식을 사용했다.

```Rust
// mybook.rs
use hyper::header::SET_COOKIE;
use hyper::{self, client, Client, Method, Request};
use hyper_tls::HttpsConnector;

use dotenv::dotenv;

pub async fn login(
    client: Client<HttpsConnector<client::HttpConnector>>,
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    dotenv().ok();

    let login_url = std::env::var("LOGIN_URL").expect("URL must be set");
    let login_id = std::env::var("LOGIN_ID").expect("ID must be set");
    let login_pw = std::env::var("LOGIN_PW").expect("PW must be set");

    let form_url = format!(
        r#"{}?id={}&password={}"#,
        login_url, login_id, login_pw
    );

    let uri = form_url.as_str().parse()?;

    let resp = client.get(uri).await?;

    println!("Response: {}", resp.status());

    let cookie = resp
        .headers()
        .get(SET_COOKIE)
        .and_then(|val| val.to_str().ok());

    match cookie {
        Some(my_cookie) => println!("my cookie: {}", my_cookie.to_string()),
        None => {
            panic!("로그인 실패");
        }
    }

    Ok(())
}
```

```Rust
// main.rs

extern crate hyper;
extern crate hyper_tls;

use hyper::Client;
use hyper_tls::HttpsConnector;

mod mybook;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let https = HttpsConnector::new();
    let client = Client::builder().build::<_, hyper::Body>(https);
    mybook::login(client).await?;

    Ok(())
}

```
