---
title: "Manjaro Linux에서 Windows 원격 접속"
path: /2021-01-04-manjaro-windows-rdp
type: post
category: Server
date: 2021-01-04
---

회사에서 발급받은 계정으로 VPN 연결 후 원격 접속까지 테스트했다. 회사 VPN 솔루션은 [FortiClient](https://www.forticlient.com/repoinfo)인데 Arch계열 지원은 없다. 대신 [openfortivpn](https://github.com/adrienverge/openfortivpn)을 사용했고 토큰 접속까지 문제 없이 가능했다. 

### 실행 환경
- 접속지: Manjaro Linux, KDE Plasma
- 대상지: Windows 10
- 사용 프로그램: `openfortivpn`, `Remmina`


# openfortivpn

```bash
sudo pacman -S openfortivpn

# 접속 정보 등록
cd /etc/openfortivpn
sudo vim ./config
```


```bash
### config file for openfortivpn, see man openfortivpn(1) ###

host = 
port = 
username = 
password = 
```

`openfortivpn` 실행

```bash
sudo openfortivpn
```

처음 실행 시 게이트웨이 인증서 에러가 발생해서 `config` 파일에 옵션을 하나 더 추가했다.

```bash
Gateway certificate validation failed, and the certificate digest is not in the local whitelist.

# config 추가
trusted-cert =
```

# Remmina

```
sudo pacman -S remmina
```

실행 후 `new connection` - `RDP`로 서버 및 사용자 정보 입력 및 실행