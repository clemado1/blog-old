---
layout: post
title: QnA Site
img: "assets/img/portfolio/submarine.png"
date: 07 September 2018
tags: [Portfolio]
---

# 프로젝트 소개

![image]({{ site.baseurl }}/assets/img/portfolio/qnaboard.png)
**괴발개발**은 간단하고 쉬운 개발자 QnA사이트 입니다.


### 유저 기능

1. 질문 작성
	- 질문 태그 등록 기능  
	
2. 답변 작성
	- 게시글 열람 페이지에서 바로 답변 작성 가능
	- 답변은 추천 순으로 정렬됨
3. 댓글 작성
	- 등록된 답변에 댓글 작성 기능
	
4. 게시글 검색
	- 키워드 검색 기능 [ 최신순 / 정확도순 / 추천순 ]
	- 태그별 검색 기능 [ 최신순 / 추천순 ]


### 개발환경


| Server | Tool | DB | Back | Front | manage |
|--------|--------|--------|--------|--------|--------|
| ubuntu | STS | MySQL | Java | HTML | Git |
|Tomcat8|  |  | JSP | css | GitHub |
||||Spring|JavaScript||
|||||JQuery|||



### Database



| user | user_role | board | board_tag | rboard |
|-----|-----|------|-----|-----|
|회원정보|회원자격|게시물|게시물 태그|답글&댓글|

편의를 위해 2개의 **View**가 존재합니다.

| board_view | rboard_view |
|--------|--------|
| 게시물+유저정보 | 답글+유저정보 |

### 구현 기능
- 부트스트랩 템플릿을 이용한 디자인
- 회원가입 시 Ajax를 이용한 입력값 비동기 검증
- 회원가입 성공 시 Modal 성공 메세지 팝업
- spring-security로 로그인 및 권한 통제
- 비밀번호 암호화 bcrypt 사용, spring-security에서도 bcrypt로 검증토록 함
- MyBatis Mapper 사용
- 태그의 경우 Result Map 기능을 이용하여 리스트로 불러옴
- MySQL Fulltext Search로 게시물 검색 및 관련도 정렬
- 게시물 열람 시 게시물과 답글, 댓글이 한 번에 출력되도록 함

### 향후 업데이트 계획

1. 이메일 인증
2. 글쓰기 마크다운 에디터 API 적용
3. 내가 쓴 글 & 쓴 답변 목록 페이지
4. 답변 알람
5. 검색어 하이라이트 
6. 서비스 클래스 및 트랜잭션 도입

