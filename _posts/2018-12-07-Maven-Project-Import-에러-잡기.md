### Maven Project Import 에러 잡기

1. import 시 `General-Existing Project` 가 아닌 `Maven-Existing Maven Project`로 import
	- `Add Project to working set` 선택
2. 프로젝트 우클릭 - `Properties - DeployAssembly`
	- 에러 있는 항목 삭제
	- `add - java build path entries` -> `maven dependencies` 추가
	  **! Maven Dependencies 항목이 보이지 않음**


- - -


##### >> Maven Dependencies가 보이게 하기 위해,
  
1. 프로젝트 우클릭 - Run As - Maven build
2. 프로젝트 우클릭 - Maven - update Maven
	**! update Maven 시 에러 발생**
    ````
    Cannot nest 'project/src/main/resources' inside 'project/src'. To enable the nesting exclude 'main/' from 'project/src'
    ````

##### >> update Maven 에러 수정
1. 프로젝트 우클릭 - Properties - Java Build Path의 Source 탭
	- 모두 remove 후 `src/main` 과 `src/main/resources` 추가

##### << update Maven 성공
##### << Maven Dependencies 추가
