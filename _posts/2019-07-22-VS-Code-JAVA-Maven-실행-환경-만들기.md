---
layout: post
title: VS Code JAVA Maven 실행 환경 만들기
tags: [vscode, maven, java]
---
# VS Code JAVA Maven 실행 환경 만들기
***

### 기본 다운로드
---
##### jdk와 tomcat은 설치가 되어있다고 가정  

1. `https://code.visualstudio.com/` 에서 VS Code 다운로드  
  
2. `VSCodeUserSetup-x64-1.36.1.exe` 실행파일을 관리자 권한으로 실행 (원하는 위치에 설치하기 위해)  
  
3. `Ctrl + Shift + X` EXTENSIONS 페이지에서 필요한 확장팩 설치  
	- 필수 다운로드
    	1) Java Extension Pack : 아래의 기본적인 자바 확장팩 일괄 제공
            - Language Support for Java™ by Red Hat
            - Debugger for Java
            - Java Test Runner
            - Maven Project Explorer
            - Java Dependency Viewer
            - Visual Studio IntelliCode  *프록시 환경에서는 다운로드 에러가 발생한다.*  
        2) Tomcat for Java
	- 인기/추천
        1) Java Server Pages (JSP)
        2) Spring Boot Tools
        3) Spring Initializr Java Support
        4) Spring Boot Dashboard
        5) CheckStyle
  
    - 리액트를 배우고 있어서 아래도 추가함 
        1) React Native Tools
        2) ES7 React/Redux/GraphQL/React-Native snippets
        3) GraphQL for VSCode
4. cmd를 열어 `mvn -version` 을 실행했을 때 maven 정보가 뜨지 않는다면 Maven 다운로드가 필요하다.  

5. `https://maven.apache.org/download.cgi` 로 가서 Binary zip archive 다운로드 후 환경변수 세팅  

    ```bash
    MAVEN_HOME : C:\Program Files\Apache\apache-maven-3.6.1
    Path 	  : %MAVEN_HOME%\bin

    //cmd로 가서 세팅되었는지 확인
    mvn -version
    Apache Maven 3.6.1 어쩌구 저쩌구가 뜨면 성공
    ```

### Import 및 실행
---
##### 기존 프로젝트를 추가하는 것으로 진행

1. 기존 프로젝트를 찾아 EXPLORER`Ctrl+Shift+E` 에 추가한다.  
![image]({{ site.baseurl }}/assets/img/pexels/vscode1.png)  
![image]({{ site.baseurl }}/assets/img/pexels/vscode2.png)  

2. TOMCAT SERVERS에 컴퓨터에 설치되어 있는 Tomcat을 추가한다.  
![image]({{ site.baseurl }}/assets/img/pexels/vscode5.png)  

3. Maven Project일 경우 자동으로 MAVEN PROJECT 항목에 추가된다. 추가된 Project를 package화 한다.  
![image]({{ site.baseurl }}/assets/img/pexels/vscode4.png)  

    ```bash
    [INFO] Building war: d:\sts_workspace\spring_board\target\spring_board-1.0.0-BUILD-SNAPSHOT.war
    [INFO] WEB-INF\web.xml already added, skipping
    [INFO] ------------------------------------------------------------------------
    [INFO] BUILD SUCCESS
    ```
    
	만약 unmappable character for encoding 에러가 뜬다면 `pom.xml`에 아래 **encoding** 설정을 추가하자.  

    ```html
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.1</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
                <encoding>UTF-8</encoding>
            </configuration>
    </plugin>
    ```

4. 위에서 생성된 `*.war` 파일을 우클릭하고 `Run on Tomcat Server` 클릭  
![image]({{ site.baseurl }}/assets/img/pexels/vscode6.png)  
server.xml 조작이 필요하다면 추가한 tomcat을 우클릭하고 Open Server Configuration 을 클릭  

5. 정상적으로 실행되는 것을 확인할 수 있다.  
![image]({{ site.baseurl }}/assets/img/pexels/vscode7.png)  

### 단축키
---
###### 기본 단축키
| 단축키 | 설명 | Eclipse
|--------|--------|-------|
| `Alt + Shift + O` | 자동 import | `Ctrl + Shift + O` |
| `Ctrl + P` | 요소 찾기 | `Ctrl + Shift + E` |
| `Ctrl + Shift + P` | 명령 검색 |  |
| `Ctrl + Shift + F` | 전체 찾기 | `Ctrl + F` |  
| `Ctrl + Shift + K` | 한 줄 삭제 | `Ctrl + D` |  

자주 쓰는 Project Clean은 `Ctrl + Shift + P`에서 `Java: Clean the java language server workspace` 를 이용한다.

###### 유용한 단축키  

| 단축키 | 설명 | 비고 |
|--------|--------|-------|
| `Ctrl + \` ` | 터미널 실행 | 현재 경로를 기준 |
| `Ctrl + K` | 단축키 설정 |  |
| `Ctrl + U` | 이전 위치로 커서 이동 |  |
| `Ctrl + Shift + F12` | 구현 미리보기 |  |
| `Ctrl + F12` | 구현으로 이동 |  |
| `Shift + F12` | 모든 참조 찾기 | |
| `F12` | 정의로 이동 | `Ctrl + 왼클릭`으로도 가능 |
| `Alt + ←` | 이전 화면으로 이동 |  |
| `Alt + ↑` | 위로 이동 | ↓ 는 아래로 이동 |
| `Ctrl + Shift + O` | 소스 구성요소 보기 | |
| `Ctrl + D` | 동일 문자열 중복 선택 | 입력 횟수만큼 증가 |
| `Alt + Shift + 드래그` | 드래그 영역으로 선택 |  |
| `Ctrl + Alt + ↑` | 다중 커서 | ↓ 도 마찬가지 |  
| `Shift + Alt + ↑` | 위로 복사 | ↓ 는 아래 복사 |  

이외에도 div>span*5 와 같은 약어를 입력하면 아래와 같이 자동으로 생성된다.
```
	<div>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>
```

### 사용 후기
---
1. Maven이 아닌 Dynamic Web Project는 지원이 안되는 듯 하다.  
 -- 하루종일 찾아봤는데 안된다는 글만 있는 걸로 보면 안되는 듯  
2. war 파일을 만들어서 tomcat 서버를 구동해야한다. 파일이 수정되면 자동으로 deploy 되도록 설정할 수 있을런지 모르겠다.  
3. jsp 지원이 유독 적음. JSP 내 요소들을 거의 인식하지 못하는 것 처럼 보인다.  

VS Code는 이클립스, intellJ와 같은 IDE가 아니기 때문에 동일한 퍼포먼스를 기대하기에는 무리가 있다. 자바를 사용하기에 불편한 점은 분명 있지만 앞으로 프레임워크나 스크립트 언어를 사용해야하니 계속 사용할 것 같다.  