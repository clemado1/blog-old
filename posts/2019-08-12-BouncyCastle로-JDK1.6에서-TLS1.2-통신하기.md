---
title: BouncyCastle로 JDK1.6에서 TLS1.2 통신하기
path: /2019-08-12-BouncyCastle로-JDK1.6에서-TLS1.2-통신하기
type: post
category: Dev
date: 2019-07-22
---

얼마 전 타사의 REST API를 이용하는 서비스 개발 요청을 받았는데 신나게 개발하고 서버에 적용했더니 이상한 에러가 발생했다.

```java
javax.net.ssl.SSLHandshakeException: Remote host closed connection during handshake
```

구글링해보니 여러가지 가능성이 있었는데 결국엔 JDK 버전 문제였다.  
`SSLHandshakeException` 은 TLS 버전 불일치로 발생하는 경우가 높아서 억지로 TLS 버전을 설정했더니 아래와 같이 TLSv1.2를 설정할 수 없다는 에러가 새로 나타났다.

```java
System.setProperty("https.protocols", "TLSv1.2");

Exception in thread "main" java.lang.IllegalArgumentException: TLSv1.2
```

JDK1.6 버전에서는 TLSv1.2를 사용할 수 없다고 한다. JDK1.8 은 자동으로 TLS1.2를 사용하기 때문에 JDK1.8이 설치된 서버에서 실행시키면 에러가 뜨지 않는다.  
곧 대체할 예정인 낡은 서버라서 함부로 JDK를 업그레이드할 수도 없었다. JDK1.6에서 TLS1.2를 사용할 수 있는 방법이 없을까 구글링하다가 간단한 방법을 찾았다.

> [TLSConnection Factory](https://stackoverflow.com/questions/33364100/how-to-use-tls-1-2-in-java-6#answer-33495988)

소스는 매우 복잡하지만 그대로 가져다쓰면 되기 때문에 간단하다.  
자바 암호화 라이브러리인 `BouncyCastle`을 이용해서 `SSLSocketFactory`를 만들고 `HttpsURLConnection`의 `SSLSocketFactory`로 설정해주는 것이다.

위의 소스로 `TLSSocketConnectionFactory.java` 파일을 만든 다음 아래와 같이 커넥션을 설정한다.

```java
    static String sendURL = "";
	static String requestURL = "";
	static URL url;
	static HttpsURLConnection conn;

	//쓰고 받아오기
	public String getRemoteJsonData(String jsonValue) {
		String inputLine = null;
		StringBuffer outResult = new StringBuffer();
		String length = jsonValue.length()+"";

		try {
			url = new URL(sendURL+requestURL);
			System.setProperty("https.protocols", "TLSv1.2");
			conn = (HttpsURLConnection) url.openConnection();

			conn.setSSLSocketFactory(new TLSSocketConnectionFactory());
			conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            /*필요한 내용 작성*/

			OutputStream os = conn.getOutputStream();

			os.write(jsonValue.getBytes("UTF-8"));
			os.flush();

			BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
			while((inputLine = in.readLine()) != null) {
				outResult.append(inputLine);

			}

			in.close();

		}catch(Exception e) {
			LogError.LogErrorMsg("getRemoteJsonData ERROR", Util.getPrintStackTrace(e));
		}finally{
			closeConnection();
		}

		return outResult.toString();
	}

```
