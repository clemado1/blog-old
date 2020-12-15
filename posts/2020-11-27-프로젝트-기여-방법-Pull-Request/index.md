---
title: 프로젝트 기여 방법 / Pull Request
path: /2020-11-27-프로젝트-기여-방법-Pull-Request
type: post
category: Dev
date: 2020-11-27
---

# 읽을거리

-   [코드 리뷰 in 뱅크샐러드 개발 문화](https://blog.banksalad.com/tech/banksalad-code-review-culture/)
-   [효과적인 코드 리뷰를 위해서 - LINE](https://engineering.linecorp.com/ko/blog/effective-codereview/)
-   [우리는 코드 리뷰를 잘하고 있을까요?](https://medium.com/styleshare/%EC%9A%B0%EB%A6%AC%EB%8A%94-%EC%BD%94%EB%93%9C-%EB%A6%AC%EB%B7%B0%EB%A5%BC-%EC%9E%98%ED%95%98%EA%B3%A0-%EC%9E%88%EC%9D%84%EA%B9%8C%EC%9A%94-201c12d04d0d)

---

# 프로젝트 기여 방법 / Pull Request

`Pull Request`는 프로젝트의 규모가 크고 복잡하거나 코드 리뷰가 필수일 때, 참여자 수가 많을 때 등등 여러가지 상황에서 사용한다.

## Pull Request

-   `Pull Request`를 사용하여 변경한 사항을 공개적으로 알릴 수 있다.
-   프로젝트 멤버와 변경 사항을 검토하고 후속 작업을 논의할 수 있다.
-   변경한 내역에 재수정이 필요할 경우 검토자는 기여자에게 수정 요청을 보낼 수 있다.
-   플랫폼에 따라 `Pull Request` 시 코드 분석, 테스트 등을 실행할 수 있다.
-   모든 검토가 끝나면 `upstream`에 `merge` 한다.
    > upstream: fork한 repo가 아닌 가장 상류 repo

### Pull Request 장점

-   요청을 보내고 `upstream`에 `merge` 되기 전까지 `upstream`의 소스에 영향을 주지 않는다.
-   코드 리뷰가 용이하다.
-   다른 멤버가 작성한 `Pull Request`를 검토하면서 프로젝트 이해도를 높일 수 있다.
-   코드 충돌을 줄일 수 있다.

## 실습

1. `upstream`에 해당하는 `repo`를 fork 한다. 이후 Your Repository로 이동하면 fork한 `repo`를 확인할 수 있다.  
   ![image](https://user-images.githubusercontent.com/41099541/100420195-5b1b2f00-30c9-11eb-993a-2ac32f1ca390.png)

2. fork한 `repo`를 `clone`한다.

    ```bash
    $ git clone https://github.com/myname/project.git && cd project
    $ git remote -v # origin이 본인 repo로 잘 설정되었는지 확인
    # main repo를 upstream으로 원격 저장소 저장
    $ git remote add upstream https://github.com/upstream/project.git
    ```

    **username과 user email이 설정되어 있지 않다면 반드시 설정해준다.** GitHub 계정과 일치해야 자동으로 연결 가능한다.

    ```bash
    # 확인
    $ git config user.email
    $ git config user.name

    # 변경
    $ git config user.email "clemado1@email.com"
    $ git config user.name "clemado1"

    # 해당 설정을 전역으로 사용하고 싶은 경우 --global 옵션을 붙여주면 됩니다.
    $ git config --global user.email "clemado1@email.com"
    $ git config --global user.name "clemado1"
    ```

3. 새로운 브랜치를 만든 다음 파일을 수정한다.

    ```bash
    # study 브랜치 생성 및 이동
    $ git checkout -b clemado1/study # git 2.23.0 미만
    $ git switch -c clemado1/study # git 2.23.0 이상
    ```

    > Pull Request 시 branch는 각 특징을 살려 만드는 것이 좋다. 이를 topic 혹은 feature 브랜치라고 한다. 기능 추가, 버그 수정같은 단위 작업을 위해 생성한다. 토픽 브랜치에서 작업이 완료되면 통합 브랜치에 병합한다.

4. 수정 후 `origin`에 `push`한다.

    ```bash
    $ git add README.md
    $ git commit -m "study: clemado1 참가자 명단 추가"
    # git push {remote 종류} {브랜치명}
    $ git push origin clemado1/study
    ```

5. GitHub에 로그인하여 Pull Request를 생성한다. 내가 작업한 브랜치가 맞는지, 충돌이 발생하지 않는지 확인 후 내용을 적고 제출한다.

    - repo에서 Pull Request 등록
      ![image](https://user-images.githubusercontent.com/41099541/100424265-ac7aec80-30d0-11eb-8d63-07e6e67ee63e.png)

    - Pull Request 내용 작성
      ![image](https://user-images.githubusercontent.com/41099541/100424572-1dba9f80-30d1-11eb-94a5-12acd11e8e66.png)

6. Pull Request 완료

    ![image](https://user-images.githubusercontent.com/41099541/100424815-7853fb80-30d1-11eb-8f93-37710c12af0b.png)

    PR을 올린 다음에는 코드 리뷰를 받고 수정 후 마지막으로 `upstream`의 `master` 브랜치에 병합되면 최종 종료.

    `merge`가 끝난 뒤 소스를 최신화 하고 작업한 브랜치를 삭제하려면 아래 명령어를 실행한다.

    ```bash
    # upstream 소스로 최신화
    $ git pull upstream master
    # 브랜치 삭제
    $ git branch -d clemado1/study
    ```

### Rebase

위 내용만으로 진행이 된다면 딱히 어려울 이유가 없지만 `Pull Request` (이하 PR) 전/후로 충돌이 발생한다면 수정하기가 까다롭다. PR한 코드에 충돌이 있다면 대부분 Requester가 `commit`을 `rebase` 해주어야 한다. 충돌이 발생하는 이유는 내가 변경한 파일에 새로운 업데이트 사항이 생겼기 때문이다.

사람이 많고 업데이트가 잦다면 내가 수정하던 파일에서 누군가의 PR이 승인되어 `upstream`이 갱신될 수 있고 내가 올린 PR에 검증할 사항이 많아서 승인이 늦어진다면 그 사이 `upstream`의 내용이 변경될 수 있다. 이러한 상황에서는 로컬 저장소를 다시 최신화해야한다.

-   충돌로 인해 Merge pull request가 활성화되어 있지 않은 상황
    ![image](https://user-images.githubusercontent.com/41099541/100559537-5f785f80-32f6-11eb-9885-38b357e966dd.png)

1.  reset  
    `commit` 내용이 복잡하지 않아서 `commit`을 취소하고 다시 진행하려면 `reset` 명령어만으로 간단하게 해결할 수 있다. 이 때 `--soft` 옵션은 현재 로컬 파일의 변경 사항을 `staged`로 유지하고, `--hard` 옵션은 변경한 내용까지 모두 초기화한다. 기본 옵션은 `--mixed`로, 현재 로컬 파일의 변경 사항을 유지하지만 `unstaged`로 격하한다.

    ```bash
    # 가장 최신 commit 취소
    $ git reset --soft HEAD^
    # 3개의 commit 취소
    $ git reset --soft HEAD~3

    # git add & git commit 새로 진행
    # 충돌 수정 시 강제 push 필요
    $ git push -f origin clemado1/study
    ```

2.  rebase  
    `rebase`는 `git`에서 다소 복잡하고 어려운 문법으로, 여기에서는 PR 충돌을 해결하는 분량으로만 기술한다.

    ```bash
    # upstream master 브랜치의 최신 소스 가져오기
    $ git fetch upstream master # upstream/master 로 rebase
    $ git rebase upstream/master

    # 충돌 확인
    $ git status
    $ git diff

    # 충돌 수정 작업 후 rebase 풀기
    $ git add ENTRY.md
    $ git rebase --continue

    # 충돌 수정 시 강제 push 필요
    $ git push -f origin clemado1/study
    ```

    이 때 주의할 점은 `rebase`는 기존 `commit`을 유지하고 수정하는 것이 아니라 새로운 `commit`을 생산하기 때문에 이미 병합되어 있는 `commit`은 건드리지 않도록 한다.

    또한 소스 최신화 시 `pull`이 `fetch`와 `merge`를 합쳐놓은 명령어이기 때문에 `merge` 하기 전 검토를 하고 싶을 때도 아래와 같이 사용할 수 있다.

    ```bash
    $ git fetch upstream master
    $ git rebase upstream/master
    ```

    `rebase`의 자세한 내용은 [참조](https://git-scm.com/book/ko/v2/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-Rebase-%ED%95%98%EA%B8%B0)

-   충돌 해결 후 `Merge pull request`가 활성화된 상황.
    ![image](https://user-images.githubusercontent.com/41099541/100570867-1c79b480-3315-11eb-82cf-4310a006d97b.png)

---

# 참고

-   [About pull requests - GitHub Docs](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests)
-   [브랜치 만들기 - 누구나 쉽게 이해할 수 있는 Git 입문](https://backlog.com/git-tutorial/kr/stepup/stepup1_2.html)
