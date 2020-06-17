---
title: hyper 기반 rust 크롤링 3
path: /2020-06-09-hyper기반-rust-크롤링-3
type: post
category: Dev
date: 2020-06-09
---

## Reqwest

이번에는 `Reqwest`를 사용해서 좀 더 간단하게 변경해본다.

```
[dependencies]
reqwest = { version = "0.10.4", features = ["json","cookies"] }

```

로그인을 유지하기 위해 `cookies`를 추가했다. 만약 `Response`의 `content-type`이 `json`이라면 `json` 피쳐로 편리한 기능을 사용할 수 있다.

### Client

`reqwest`로 `Client`를 생성하는 방법은 아래와 같다. `reqwest`를 사용하면 `pub fn cookie_store(self, enable: bool)`를 설정하는 것만으로 간단하게 세션을 유지할 수 있다.

```Rust
let client: reqwest::Client = reqwest::Client::builder()
        .cookie_store(true) // store session cookie
        .build()?;
```

### 로그인

`client`를 생성할 때 쿠키를 저장하는 설정을 추가했으므로 따로 쿠키를 저장할 필요가 없다. 응답 코드가 적절하게 떨어졌다면 바로 리턴한다.

```Rust
pub async fn login(
    client: &reqwest::Client,
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    dotenv().ok();

    let login_url = std::env::var("LOGIN_URL").expect("URL must be set");
    let login_id = std::env::var("LOGIN_ID").expect("ID must be set");
    let login_pw = std::env::var("LOGIN_PW").expect("PW must be set");

    let form_url = format!(
        r#"{}?id={}&password={}"#,
        login_url, login_id, login_pw
    );

    let response = client
        .get(form_url.as_str())
        .header(CONTENT_TYPE, "text/html")
        .send()
        .await?;

    if response.status() == 200 {
        Ok(())
    } else {
        panic!("login fail...");
    }
}
```

위에서는 URI로 바로 로그인했는데, 만약 `json` 데이터를 `post` 방식으로 보내야한다면 아래와 같이 처리할 수 있다.

```Rust
   let response = client
       .post(form_url.as_str())
       .header(CONTENT_TYPE, "text/html")
       .body(json_data)
       .send()
       .await?;
```

```Rust
// main.rs

mybook::login(&client);

```

이후로는 동일하게 `GET` 혹은 `POST` 요청을 보내면서 내용을 읽어오면 된다.  
아래는 보관함에 있는 책의 링크를 순환하면서 재고가 있다면 로그를 찍어주는 예제를 구현하였다.

```Rust
pub async fn get_mybook(
    client: &reqwest::Client,
) -> Result<String, Box<dyn std::error::Error + Send + Sync>> {
    dotenv().ok();

    let mybook_url = std::env::var("MYBOOK_URL").expect("URL must be set");

    let response = client
        .get(mybook_url.as_str())
        .header(CONTENT_TYPE, "text/html")
        .send()
        .await?;

    let html = response.text_with_charset("utf-8").await?;

    let document = Document::from(html.as_str());
    let form = document.find(Name("form")).next().unwrap();

    for node in form.find(Class("myBook")) {
        let title = node.find(Name("a")).next().unwrap().text();
        let link = node.find(Name("a")).next().unwrap().attr("href").unwrap();

        let book_response = client
            .get(link)
            .header(CONTENT_TYPE, "text/html")
            .send()
            .await?;

        let title = node.find(Attr("id", "title")).next().unwrap().text();
        let stock = node.find(Attr("id", "stock")).next().unwrap().text();

        let stock_num: u32 = stock.parse().unwrap();

        if stock_num > 0 {
            println!("{} has {} stock!", title, stock);
        }
    }
}


```
