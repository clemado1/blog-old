---
layout: post
title: Window10 WSL Vscode
tags: [window10, wsl, vscode, ubuntu]
---

# Window10에서 WSL로 리눅스 기반 개발해보기

## WSL

1. `Powercell`을 관리자 권한으로 실행
2. `WSL` (Windows Subsystem for Linux) 설치

```bash
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

3. 리눅스 배포판 설치파일 다운로드

- 익숙하기도 하고 18은 부담이 될까 싶어 `ubuntu 16.04` 버전으로 설치

```bash
Invoke-WebRequest -Uri https://aka.ms/wsl-ubuntu-1604 -OutFile Ubuntu.appx -UseBasicParsing
```

4. 설치가 끝났으면 파일 실행하여 설치

```
Add-AppxPackage .\Ubuntu.appx (설치한 appx명)
```

---

## Python

1. `Python 3.6` 설치

- Real Python 에 소개된대로 설치함 [링크](https://realpython.com/installing-python/#ubuntu)

```bash
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
sudo apt-get install python3.6
```

2. `Python3` 버전 선택

```
sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.5 1

sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.6 2

sudo update-alternatives --config python3
```

3. `Pip3` 설치

```
sudo apt install python3-pip
```

4. `Pipenv` 설치

```
pip3 intall --user pipenv
```

---

## Vscode

1. `vscode` wsl용 확장 프로그램 설치 [URL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
2. `wsl` 실행
3. `wsl` 에서 mount 폴더인 `/mnt` 에서 `ls` 를 실행하면 `c` 가 mount 되어있음을 알 수 있다.
4. `/mnt/c/` 에서 실행할 Project 폴더를 찾아가
5. `vscode` 실행 명령어인 `code .` 를 입력하면 내가 설정해 둔 `wsl` 환경에 맞게 Project를 실행할 수 있다.
