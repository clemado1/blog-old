---
title: hyper 기반 rust 크롤링 2
path: /2020-05-13-hyper기반-rust-크롤링-2
type: post
category: Dev
date: 2020-05-13
---

## 목표

인터넷 서점에 접속하여 보관함에 넣어둔 책의 재고가 있는지 검사하는 간단한 프로그램을 제작한다.

`hyper`를 사용하여 작성한 뒤, [reqwest](https://github.com/seanmonstar/reqwest)로 변경한다. `reqwest`는 `hyper` 개발자가 `hyper`를 이용하여 만든 쉽고 간편한 HTTP Client 라이브러리다.

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

`tokio` 런타임을 사용하는 메인 함수 정의

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

보관함에 접근하기 위해서는 먼제 로그인이 필요하여 먼저 사이트에 로그인 요청을 보낸다. 해당 페이지가 어떤 방식으로 로그인 정보를 전달하느냐에 따라 방식이 다르지만 여기에서는 GET 방식을 사용했다.

`mybook.rs` 파일을 새로 만들어 다음 로그인 기능을 작성하고 `main.rs` 에서 호출한다.

```Rust
// mybook.rs
use hyper::header::SET_COOKIE;
use hyper::{self, body, client, Client, Request};
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

    Ok(())
}
```

```Rust
// main.rs

extern crate hyper;
extern crate hyper_tls;

use hyper::Client;
use hyper_tls::HttpsConnector;

// mybook.rs 사용
mod mybook;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let https = HttpsConnector::new();
    let client = Client::builder().build::<_, hyper::Body>(https);
    // 로그인
    mybook::login(client).await?;

    Ok(())
}

```

### Cookie

로그인이 필요한 페이지는 로그인 후 `Response`의 `Cookie`를 `client`에 저장해야 접근할 수 있다. `Response`의 헤더에 `SET_COOKIE`값이 있을텐데, 그 중 사이트에서 사용하는 쿠키만 취합하여 반환했다.

```Rust
// mybook.rs
use hyper::header::{COOKIE, SET_COOKIE};
use hyper::http::HeaderValue;

pub async fn login(
    client: &Client<HttpsConnector<client::HttpConnector>>,
) -> Result<String, Box<dyn std::error::Error + Send + Sync>> {
    
    // 생략

    let resp = client.get(uri).await?;

    let mut values = String::from("");

    for cookie in resp.headers().get_all(SET_COOKIE).into_iter() {
        // 필요한 Cookie 생성
    }

    Ok((values))

}
```

반환한 `cookie` 값을 다음 페이지 호출에 사용한다. 

```Rust
// main.rs
    let cookies = mybook::login(&client).await?;
    mybook::get_mybook(&client, cookies).await?;
```

```Rust
// mybook.rs

pub async fn get_mybook(
    client: &Client<HttpsConnector<client::HttpConnector>>,
    cookie: String,
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    dotenv().ok();

    let mybook_url = std::env::var("MYBOOK_URL").expect("URL must be set");

    let mut request: Request<hyper::Body> = Request::default();
    request
        .headers_mut()
        .append(COOKIE, HeaderValue::from_str(cookie.as_str()).unwrap());
    *request.uri_mut() = mybook_url.as_str().parse().unwrap();

    let resp = client.request(request).await?;

    let body_bytes = body::to_bytes(resp.into_body()).await?;
    let body = String::from_utf8(body_bytes.to_vec()).expect("response was not valid utf-8");
    
    println!("Body: {}", body);


    Ok(())
}
```