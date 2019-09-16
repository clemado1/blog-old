---
layout: post
title: letsencrypt 갱신 완료 기록용
tags: [letsencrypt]
published : false
---

친절하게도 인증서 만료일이 다가오면 메일이 계속 온다. 그래도 3개월 동안 어찌저찌 잘 버텼다 싶다. 

  
  
### 서버 용량 비우기
- - -
처음부터 `./certbot-auto renew`를 때려박았더니 용량 부족으로 실행불가.. 서버는 정말 마음대로 되는 날이 없는 것 같다.  
````
df -h //디스크 용량 확인
````

세부 용량 확인하는 법은 다양하다..
````
//일정 크기 이상 폴더 찾기 999999999 부분을 조정
sudo find / -type f -printf '%12s %p\n' 2>/dev/null|awk '{if($1>99999999)print $0;}'

//용량 상위 10 디렉토리 로그 저장
du -ckx | sort -n > /tmp/duck-root
tail /tmp/duck-root

//현재 경로 하위 디렉토리 크기 조회
du sh /

//현재 경로 하위 파일 크기 조회
du sh *

//현재 경로 내의 파일 크기 
ls -lS
````

조회해보니 `/var/log` 에 로그 파일이 꽤 용량을 차지하고 있다. 해당 경로로 이동 후 오래되어 압축 저장되어 있는 파일을 일괄 삭제하고 볼 일 없는 로그 파일은 비워줬다.

````
cd /var/log
rm *.gz
sh -c " /var/log/log.log"
````

jounalctl 이라는 파일 로그가 특히 크다.
jounalctl은

````
jounalctl --disk-use
jounalctl --vacuum-size=128M

nano /etc/systemd/journald.conf
````
***

### letsencrypt 갱신
- - -
갱신이 처음이라 구글링만 하루종일 했다.
처음에 그냥 ./certbot-auto renew 쳤더니 당연히 안됨. ./lestencryp-auto renew도 안됨. 
````
 ./letsencrypt-auto certonly --renew --email clemado1@gmail.com -a manual -d farmparm.ml
 1988  ./letsencrypt-auto certonly --renew-by-default --email clemado1@gmail.com -a manual -d farmparm.ml --dry-run --agree-tos
````
안됨 계속해서 404 에러
./letsencrypt-auto --renew-by-default

`sudo ls -alR /etc/letsencrypt/{archive,live,renewal}`