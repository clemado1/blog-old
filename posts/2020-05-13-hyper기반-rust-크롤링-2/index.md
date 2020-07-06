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

`Cargo.toml`-`[dependencies]`에 아래 라이브러리를 추가한다.

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

여기서 `format!` 매크로 안에 `r#""`를 사용했다. r#은 [Raw string literals](https://doc.rust-lang.org/reference/tokens.html#raw-string-literals)을 의미하며, `"'\` 등의 문자를 백슬래쉬 없이 그대로 사용할 수 있다.  
실제로는 URI가 복잡해서 `r#`을 사용했지만 Escape할 문자가 없다면 당연히 사용할 필요 없다.

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

반환한 `cookie` 값을 다음 페이지 호출에 지정하여 세션을 유지해야 한다.  
`Request`의 헤더에 매개 변수로 받은 `cookie` 문자열을 저장하고, 조회할 페이지를 요청하면 정상적으로 응답이 되는 것을 알 수 있다.

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
) -> Result<String, Box<dyn std::error::Error + Send + Sync>> {
    dotenv().ok();

    let mybook_url = std::env::var("MYBOOK_URL").expect("URL must be set");

    let mut request: Request<hyper::Body> = Request::default();
    request
        .headers_mut()
        .append(COOKIE, HeaderValue::from_str(cookie.as_str()).unwrap());   // request header value 지정
    *request.uri_mut() = mybook_url.as_str().parse().unwrap();              // request uri 지정

    let resp = client.request(request).await?;

    let body_bytes = body::to_bytes(resp.into_body()).await?;
    let body = String::from_utf8(body_bytes.to_vec()).expect("response was not valid utf-8");

    println!("Body: {}", body);


    Ok(body)
}
```

### select

> `Html` 형식을 갖춘 문자열에서 원하는 데이터만 추출할 수 있는 크롤링용 라이브러리

결과로 받은 `Response body`는 다른 라이브러리를 사용하지 않고도 충분히 가공할 수 있지만 좀 더 빠르게 하기 위해 [select](https://docs.rs/select/0.4.3/select/)를 이용한다.
`Cargo.toml` 에 `select` 라이브러리를 추가한 다음, 아래와 같이 사용한다.

```
[dependencies]
select = "0.4.3"

```

```Rust
use select::document::Document;
use select::predicate::{Class, Name};

pub fn search_mybook(
    client: &Client<HttpsConnector<client::HttpConnector>>,
    cookie: String,
    html: String
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let document = Document::from(html.as_str());
    let form = document.find(Name("form")).next().unwrap(); // 순환을 하지 않고 가장 첫 번째 값을 가져온다.

    for node in form.find(Class("myBook")) {
        let title = node.find(Name("a")).next().unwrap().text();
        let link = node.find(Name("a")).next().unwrap().attr("href").unwrap();

        /// link Request
    }
}

```
