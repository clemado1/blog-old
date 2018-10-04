---
layout: post
title: FarmParm
img: "assets/img/portfolio/farmparm.png"
date: 07 September 2018
tags: [Portfolio]
---

# 프로젝트 소개

![FarmParm](https://github.com/clemado1/project1/blob/master/WebContent/images/farmparm.png)
**팜팜농원**은 농작물 판매 쇼핑몰입니다. [팜팜농원 바로가기](http://java.swq.co.kr/FarmParm)


### 유저 기능

1. 상품 주문
	- 재고상황에 따라 주문
	- 세션 장바구니
	- 주문성공 시 재고 감소 & 주문 성공 이메일 발송  
	
2. 주문 조회
	- 상단 메뉴에서 주문 조회 가능
	- 배송 상황, 주문 상품, 배송지 확인 기능
	- 배송 출발 후 상품 수취 확인 기능
	
3. 포인트 적립
	- 회원가입 / 주문 / 리뷰 작성 포인트 증정
	- 포인트 내역 조회 기능
	- 포인트 결제 사용 기능
	
4. 문의 및 리뷰 작성
	- 상품별 문의 또는 후기 작성 기능
	- 상품 후기는 주문 당 한 건만 가능
	- 별도 페이지에서 본인 게시물 조회 기능

### 관리자 기능


1. 회원 관리
	- 가입일 / 등급 / 주문 금액 기준 회원 목록
	- 회원 정보 조회, 수정, 탈퇴 기능

2. 주문 조회
	- 주문일을 기준으로 한 주문 목록 조회 
	- 주문 상세 정보 확인 및 주문 상태 변경 기능

3. 상품 관리
	- 최근 재고, 주문량 확인 가능
	- 상품목록 및 월별 입출고 조회 기능
	- 상품조회 후 상품 입출고 등록 기능

4. 매출 조회
	- 주문/상품 별 기간 내 매출 조회 기능
	- 월  매출 조회 시 전월 비교 출력

5. 게시판 관리
	- 게시판 작성, 수정 삭제 기능
	- 미 답변 글 조회 기능



### 개발환경


| Server | Tool | DB | Back | Front | manage |
|--------|--------|--------|--------|--------|--------|
| ubuntu | eclipse | MySQL | Java | HTML | Git |
|Tomcat8|  |  | JSP | css | GitHub |
|||||JavaScript|||



### Database



| users | point | items | item_stock | orders | order_item |
|-----|-----|------|-----|-----|-----|
|회원정보|포인트내역|상품정보|입출고내역|결제정보|결제상품목록|

본 사이트의 규모가 큰 편이 아니므로 게시판은 1개의 테이블로 통합 가능하지만 개발 초기 DB 디자인에 미숙하여 각 게시판을 개별 테이블로 만들었습니다.

| notice | cs_board | qna_board | review_board|
|--------|--------|--------|--------|
|공지사항|고객센터|상품문의|상품후기|

편의를 위해 3개의 **View**가 존재합니다.

| user_view | item_view | order_view |
|--------|--------|---------|
| 회원정보+주문금액 | 상품+재고+판매량 | 주문정보+주문상품


### 구동 영상


[YouTube](https://www.youtube.com/embed/Xq69JDgsV9c)





### 향후 업데이트 계획

- 상품 가격 일괄 변경
- 상품별 포인트 차별화
- 프로시저를 이용한 상품 배송 완료 처리
- 서브도메인을 이용한 부분 https 적용
