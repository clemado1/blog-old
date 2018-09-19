---
layout: post
title: "AWS&ubuntu&tomcat8&letsencrypt 3"
tags: [aws, letsencrypt]
---




### war파일 배포

프로젝트 혹은 톰캣 폴더의 `context.xml`가 상황에 맞게 설정되었는지 확인하고 export한다.

배포를 위해 `http://elastic-ip/manager/html` 매니저 페이지로 진입. `tomcat-users.xml`에서 등록한 이름과 비밀번호를 통해 로그인 한다.  

![image]({{ site.baseurl }}/assets/img/pexels/manager.png)  

war파일 등록. 이제 `http://elastic-ip:8080/프로젝트이름`을 통해 프로젝트를 확인할 수 있다.
