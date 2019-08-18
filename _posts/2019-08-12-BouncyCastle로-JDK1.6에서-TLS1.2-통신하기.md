---
layout: post
title: BouncyCastle로 JDK1.6에서 TLS1.2 통신하기 
tags: [java, bouncycastle, restapi]
---
얼마 전 타사의 REST API를 이용하는 서비스 개발 요청을 받았는데 신나게 개발하고 서버에 적용했더니 이상한 에러가 발생했다.  

````java
javax.net.ssl.SSLHandshakeException: Remote host closed connection during handshake
````

구글링해보니 여러가지 가능성이 있었는데 결국엔 JDK 버전 문제였다. JDK 1.6 환경인 서버에서만 위의 에러가 발생했다.  
로컬에서 프로젝트 환경을 1.6으로 설정했었는데도 이미 설치한 JDK의 버전이 1.8이라서 에러가 나지 않았던 모양이다.  
그래서 다시 구글링에 돌입... 





