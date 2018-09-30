---
layout: post
title: "AWS&ubuntu 서버 다운 해결 여정"
tags: [aws, ubuntu]
---

###### 이전 프로젝트는 외부 db를 끌어 썼는데 새로운 개인 작업물은 서버에 db를 두고 업로드 했다. 별 내용도 없는데 오락가락하더니 오늘 결국 서버가 뻗었다. 초보라서 잘 모르겠는데 MySql이 메모리를 좀 잡아먹나 싶다.. AWS 무료 인스턴스를 사용하고 있으니 서버 사양이 좋을 거 같지도 않고, 그냥 첫 번째 프로젝트는 삭제 해야겠다.  

첫 증상은 war파일을 업로드하고 하루 뒤 **InnoDB 메모리 부족**  
```
innodb: cannot allocate memory for the buffer pool
```
로그를 확인해보니 이 메세지가 떠있다. 고친다고 컨퍼런스 파일을 건드리다가 잘못 만졌는지 재시작도 안되고 재설치도 안되고.. 그냥 싹 다 날린 다음에 컴파일로 설치했다. 그리고 `/etc/my.cnf`에  
```
innodb_buffer_pool_size = 16M
```
처음부터 이렇게 설정했으면 다시 설치할 일이 없었을텐데 괜히 이것저것 만지다가..  

그리고 잘되다가 다음 날 사이트에 접속하니  
```
Could not get JDBC Connection; nested exception is com.mysql.jdbc.exceptions.jdbc4.CommunicationsException: Communications link failure
```
이런 오류가 등장했다. 집에 돌아와서 아무 생각 없이 `service mysql status`하고 active(exited) 길래 `service mysql restart`를 했더니 접속은 되는데 로딩이 어마어마하다. 밥 먹고 돌아오니 서버 다운.  
putty에는 `server unexpectedly closed network connection` 로 뜨고, 사이트 접속시에는 `ERR_TIMED_OUT`이 떴다.  


두 시간 동안 마음 졸이며 구글링하다가 도저히 안되겠어서 아마존에 한영을 섞어 메일을 보냈다. 그런데 보내자마자 putty 접속 성공 머쓱; 접속 성공하자마자 커널 로그를 확인했다. `dmesg | tail`  
```
Out of memory: Kill process 19496 (mysqld) score 428 or sacrifice child
```
사이트에 접속해보니 낮과 동일한 메세지가 뜬다. 아마 낮에도 메모리부족으로 Mysql이 꺼졌던 모양. 메모리 확보를 위해 **캐시**를 삭제하고 주기적으로 관리를 할 수 있도록 설정해준다.  
```
echo 1 > /proc/sys/vm/drop_caches
echo 2 > /proc/sys/vm/drop_caches
echo 3 > /proc/sys/vm/drop_caches
crontab -e //편한 에디터 선택
0 4 * * * sync && echo 3 > /proc/sys/vm/drop_caches //새벽 4시마다 캐시를 삭제하도록 설정
```

그리고 **메모리**가 부족한 상황을 대비하기 위해 **swap**을 설정한다. 다음은 EC2 사이트에 있는 swap설명.  
*대개 스왑 공간은 애플리케이션이나 운영 체제의 지침 또는 데이터가 현재 점유한 물리적 RAM을 필요로 하는 Amazon EC2 인스턴스에서 물리적 RAM을 단기간 대신하기 위해 사용됩니다.*  

swap용량은 2기가 이하일 시 2배~4배, 4기가 이상은 동일 혹은 2배 정도로 하는 것 같다.  

```
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
swapon -s //확인
```
설정을 위해 `nano /etc/fstab`  
```
/swapfile swap swap defaults 0 0
```
`free -m`으로 확인하면 추가된 swap을 확인할 수 있다!  

메모리가 부족할 시 **OOM killer**가 Mysql을 강제종료시키는 것도 따로 설정해서 방지할 수 있는데 나는 혹시나 또 강제로 잡아두다가 서버가 다운될까봐 하지 않기로 결정했다. 구글링하면 나온다.
