# 레시피 제공 서비스 'All Cook'
> All Cook은 노후화된 기존 레시피 서비스들의 한계를 개선하기 위해 개발된 레시피 제공 서비스입니다. <br>
> 기존 레시피 서비스들은 오래된 인터페이스와 미흡한 유지보수로 인해 사용자들에게 불편한 경험을 제공해왔습니다. <br>
> 이에 All Cook은 현대적인 UI와 직관적인 사용자 경험을 통해 누구나 즐겁고 쉽게 요리할 수 있는 환경을 제공합니다. <br>
- 배포 URL: https://allcook.site
  
<br>

## 1. 프로젝트 개요

### 개발 기간
> 2024.01.10 - 2024.05.26 <br>

### 인원 구성
> 이진우(1인)

### 기술

|Environment|Frontend|Backend|Database|Deployment|API|
|:---:|:---:|:---:|:---:|:---:|:---:|
|![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)|![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)|![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)|![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)|![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)|<img width="350" alt="식약처" src="https://github.com/jbljw02/AllCook/assets/125800649/3a915f03-0511-42fa-a413-046d0de8da8a">|

<br>

## 2. 프로젝트 구조도
![구조도](https://github.com/user-attachments/assets/7063922b-7d90-4d77-9407-7e6ae067f607)

## 3. 프로젝트 흐름도

### 1) 레시피 데이터 저장 및 조회
![흐름도](https://github.com/user-attachments/assets/95d24544-5d9a-405b-a85b-f4cabd94b939)

## 4. 화면 구성 및 주요 기능

### 1) 회원가입
- 유효성 검사(이메일과 비밀번호의 형식)를 통과해야 회원가입이 가능합니다. <br>
- 이메일 인증을 진행해야 회원가입이 완료됩니다.

|회원가입|
|:---:|
![회원가입(모자이크)](https://github.com/jbljw02/AllCook/assets/125800649/073ccfdd-3e33-4e52-85f2-4f7493c6f388)

### 2) 로그인
- ID와 비밀번호가 DB의 값과 일치하면 로그인에 성공합니다.
- 로그인에 성공하면 홈 화면으로 이동합니다.
- 구글을 통한 소셜 로그인이 가능합니다.

|로그인|
|:---:|
![로그인](https://github.com/jbljw02/AllCook/assets/125800649/570908a0-c215-404b-8745-689a3ec04186)

|구글 로그인|
|:---:|
![구글 로그인](https://github.com/jbljw02/AllCook/assets/125800649/8fed1837-534e-415f-b76f-011e3b8eb90e)

### 3) 홈 화면
- 서비스에 처음 접속하면 보이는 화면입니다.
- 배너 이미지와 서비스에 대한 소개, 그리고 추천 메뉴 등을 보여줍니다.

|홈|
|:---:|
![홈 화면](https://github.com/jbljw02/AllCook/assets/125800649/77b42c53-67f5-4ff1-81b0-65f1c38668a2)

### 4) 레시피 페이지
- DB에 존재하는 모든 레시피를 페이지네이션을 통해 출력합니다.
- 레시피를 '가나다순', '저열량순', '저지방순' 등등 여러 기준에 따라 정렬할 수 있습니다.
- 특정 카테고리의 레시피들이 랜덤하게 추천됩니다.
- 메뉴 혹은 재료명을 통해 레시피를 검색할 수 있으며 음식의 종류, 요리 방법, 영양성분이 포함된 양을 조절하여 상세하게 레시피를 검색할 수도 있습니다.

|레시피(페이지네이션, 정렬, 카테고리 검색)|
|:---:|
![레시피1](https://github.com/jbljw02/AllCook/assets/125800649/5cee5dbf-97de-4ca7-b16e-08a13290bc31)

|레시피(상세 검색, 일반 검색)|
|:---:|
![레시피2](https://github.com/jbljw02/AllCook/assets/125800649/40b4a299-87dd-4fed-a2f4-be8f1fa8e289)

### 5) 레시피 상세 페이지
- 선택한 레시피의 재료, 영양성분, 메뉴얼 등을 확인할 수 있습니다.
- 인분 수를 조절할 수 있으며, 인분 수에 따라 재료와 영양성분의 양이 변경됩니다.
- 비슷한 재료를 사용한 유사 레시피를 보여줍니다.
- 레시피에 대한 의견 및 평가를 댓글로 남길 수 있습니다.
- 레시피가 맘에 든다면 폴더를 만들고 해당 레시피를 추가할 수 있습니다.

|레시피 상세|
|:---:|
![레시피 상세](https://github.com/jbljw02/AllCook/assets/125800649/4732bbf8-4441-4c2a-b6e9-fbb22cc855c0)

### 6) 관심 레시피 페이지
- 저장한 레시피들을 확인할 수 있습니다.
- 레시피를 저장할 새 폴더를 만들 수 있습니다.
- 폴더명을 변경할 수 있습니다.
- 폴더와 레시피 모두 삭제가 가능합니다.

|관심 레시피|
|:---:|
![폴더, 폴더 상세](https://github.com/jbljw02/AllCook/assets/125800649/68ffa3c0-4415-4246-8ac2-0ae7fa62ef0d)

### 7) 문의 페이지
- 관리자에게 서비스에 대한 문의 및 건의사항을 작성할 수 있습니다.
- 작성된 내용은 관리자의 이메일로 전송됩니다.

|문의|
|:---:|
![문의(모자이크)](https://github.com/jbljw02/AllCook/assets/125800649/948cfefd-f17c-4392-8b9d-4a96d97076e9)

### 8) 회원 정보 변경 및 탈퇴
- 회원명을 변경할 수 있습니다.
- 계정을 탈퇴할 수 있습니다.

|회원 정보|
|:---:|
![회원 정보 변경 및 탈퇴](https://github.com/jbljw02/AllCook/assets/125800649/a1c6a983-5848-4f23-888c-572b4e810259)
