---
title: "AWS EC2 배포 연습 기록 3"
path: /2018-09-17-AWS-EC2-배포-연습-기록-3
type: post
category: Dev
date: 2018-09-19
---

### 주소의 :8080 제거

`http://elastic-ip:8080/프로젝트명`
리눅스는 1024 이하의 포트에서 root이외의 사용자가 접근할 수 없다. 그러므로 tomcat `server.xml`을 만지는 것이 아니라 `iptables`를 통해 80포트를 8080으로 리다이렉트할 것이다.

```
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
```

`-A` : 새로운 규칙 `-t` : 테이블 `-i` : 인터페이스 `-p` : 프로토콜 `--dport` : 도착지 포트  
`http://elastic-ip/프로젝트`로 접속 가능한지 확인한다.

### 도메인 등록

나는 무료 도메인 사이트 [freenom](https://www.freenom.com/en/index.html?lang=en)을 이용했다. 회원가입 후 도메인을 신청하고 [여기](https://www.sslforfree.com/)에서 보안서 발급이 가능한 DNS인지 확인한다.

가능하면 다시 **freenom**에서 `services - myDomains - Manage` 에 들어간다. `Management Tools - Nameservers`에서 대기.

**AWS**로 가서 **Route53**을 찾아 들어간다. `Get Started now - Create Hosted Zone`  
`Domain Name`에 생성한 DNS 주소를 넣고 `Create`  
생성하면 두개의 타입이 만들어지는데 그 중에 `NS` 타입의 `Value`를 `Nameservers`에 넣어주면 된다.  
이제 나만의 DNS로 프로젝트를 열람할 수 있다.

---

### Let's Encrypt

[여기](https://elfinlas.github.io/2018/03/19/spring-boot-tls-certbot/)를 참고했다.  
Let's Encrypt는 무료로 SSL인증서를 발급해준다. 유효기간이 90일로 짧은 편이고 지원하는 도메인도 제한적이지만 꾸준히 발전을 거듭하고 있으며 비교적 간단해서 사용자를 점점 늘려가고 있다.

lets encrypt는 ubuntu에서 명렁어만으로 SSL 인증서를 발급받을 수 있다. **github**에 등록된 **letsencrypt**를 복사하거나 letsencrypt 이용을 도와주는 **certbot-auto**를 설치한다. 설치하기 전에 적당한 경로를 지정해두고 설치한다.

```bash
wget https://dl.eff.org/certbot-auto
or
git clone https://github.com/letsencrypt/letsencrypt
```

실행

```bash
./certbot-auto certonly --manual
or
./letsencrypt-auto certonly --manual
```

letsencrypt 인증서 발급을 계속 시도하다 보면 1시간정도 밴을 먹는다. 혹시 오류가 날 때는 certonly 뒤에 `--dry-run` 옵션을 더해 테스트하면 된다.

`/etc/letsencrypt/live/DNS_Name`에 `ls`로 확인하면 `pem`파일이 만들어졌을 것이다. pem파일을 **tomcat** Http11NioProtocol 이용을 위해 **jks** 파일로 바꿔야 한다.

```
openssl pkcs12 -export -in cert.pem -inkey privkey.pem -out <만들어질 키 이름>.p12 -name tomcat -CAfile chain.pem -caname root

keytool -importkeystore -deststorepass <비밀번호> -destkeypass <재확인> -destkeystore <만들어질jks 이름> -srckeystore <만든 키스토어 이름>.p12 -srcstoretype PKCS12 -srcstorepass <방금 생성한 키의 비밀번호> -alias tomcat

keytool -import -trustcacerts -alias root -file chain.pem -keystore <jks 이름>
```

jks파일을 적당한 위치로 옮긴 다음 톰캣에 jks파일을 등록한다. `server.xml` 에서 `Connector port="8443"` 을 수정한다.

```xml
sudo nano /opt/tomcat/conf/server.xml

<Connector port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
               maxThreads="150" SSLEnabled="true" scheme="https" secure="true"
               URIEncoding="UTF-8" clientAuth="false" sslProtocol="TLS"
               keystoreFile="/opt/tomcat/jks이름" keystorePass="비밀번호"
</Connector>

```

그냥 `http://DNS/프로젝트` 로 들어가면 443으로 진입하면서 권한이 뜬다. 이를 위해 똑같이, 443 포트를 8443으로 리다이렉트 해준다.

```
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 8443
```

![image](completeurl.png)  
완성!!
