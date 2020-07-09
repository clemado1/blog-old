---
title: Webp 이미지 이용
path: /2020-07-09-WebP-이미지-이용
type: post
category: Dev
date: 2020-07-09
---

### PageSpeed Insights

구글에서 만든 `PageSpeed Insights`를 활용하면 사이트의 속도와 성능을 리뷰할 수 있다.  
이 중 우리 사이트의 개선점으로 나온 *차세대 형식을 사용해 이미지 제공하기*를 적용해보고자 한다.

```
https://developers.google.com/speed/pagespeed/insights/?hl=ko&url={url}
```

### 차세대 이미지 포맷

차세대 이미지 포맷은 트래픽과 로딩 속도 감소를 위해 대체 기술로 이미지를 압축하는 방식을 말한다. 차세대로 거론되는 이미지 포맷은 아래 3가지가 있는데, 이 중 Google에서 개발한 Webp의 지원율이 현재 약 80%로 가장 높다.

-   [Webp](https://caniuse.com/#feat=webp)
-   [JPEG 2000](https://caniuse.com/#feat=jpeg2000)
-   [JPEG XR](https://caniuse.com/#feat=jpegxr)

### Webp 설치 for Linux (Ubuntu)

회사에서 사용하는 `WSL2 Ubuntu16.04`에서 설치를 진행했다.

> 공식 설치 가이드 https://developers.google.com/speed/webp/docs/compiling#building

##### 패키지

```bash
sudo apt-get install libjpeg-dev libpng-dev libtiff-dev libgif-dev
```

##### 빌드

```bash
cd libwebp-1.1.0
./configure
make
sudo make install
```

##### 환경변수

```bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib
echo $LD_LIBRARY_PATH
echo "export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib" >> ~/.bashrc
```

#### 설치 확인

```bash
 clemado1@PC  cwebp
Usage:

   cwebp [options] -q quality input.png -o output.webp

where quality is between 0 (poor) to 100 (very good).
Typical value is around 80.

Try -longhelp for an exhaustive list of advanced options.
```

### Webp 사용

```bash
cwebp -q 80 bg_main_01.jpg -o test.webp

```

`jpg` 포맷의 이미지를 `-q` 압축 계수 80으로 지정하고 실행했을 때 1.06MB -> 174KB 의 결과를 얻었다.  
압축 계수를 낮게 지정할 수록 파일 크기는 줄어드나 품질도 낮아진다.

[Webp 옵션](https://developers.google.com/speed/webp/docs/cwebp)

### `.webp` 적용

다른 이미지와 동일하게 `<img>` 태그로도 가능하지만, 일부 브라우저 혹은 ios 유저에게는 보이지 않는 경우가 발생한다.

```html
<img src="/test.webp" alt="WebP Test" />
```

`webp` 를 지원하지 않는 접근일 때에는 원래 이미지를 보여주기 위해 `<picture>` 태그를 활용한다.

```html
<picture>
	<source srcset="test.webp" type="image/webp" />
	<source srcset="bg_main_01.jpg" type="image/jpeg" />
	<img src="bg_main_01.jpg" alt="WebP Test" />
</picture>
```
