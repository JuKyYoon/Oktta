# Frontend
작성일: 2022.08.18
<br/><br/><br/>
## 🔨개발 환경
---
- Google Chrome Browser
- Visual Studio Code
- HTML5, SCSS, JavaScript(ES8)
- NodeJS 16.16.0
- Npm 8.11.0
- React 17.0.2
- Redux 8.0.2
- Webpack
- CKEditor5
- Electron
- OpenVidu
<br/><br/><br/>
## 💡 실행 방법
---
- 패키지 설치<br/>
```
npm i
```
- 개발자 모드 실행<br/>
```
npm start
```
- 빌드 파일 생성<br/>
```
npm run build
```
<br/><br/><br/>
## 📁 프로젝트 구조
```
- /public
  └─index.html
  └─ /assets
    └─ /champion
    └─ /icons
    └─ /login_button
    └─ /lol_tier_250
    └─ /lol_tiers_ico
    └─ /tier_auth
  
- /src
  └─ App.js
  └─ index.js
  └─ /components
    └─ /board
    └─ /error
    └─ /layout
    └─ /recording
    └─ /room
    └─ /session
    └─ /user
  └─ /const
  └─ /modules
  └─ /routes
  └─ /services
  └─ /styles
  └─ /util
```
<br/><br/><br/>
## 📃 화면별 설명
---
### 로그인
- 사이트 내에서 이메일을 이용하여 가입할 수 있습니다. 이때 이메일 인증이 필요합니다.
- 소셜 로그인 기능을 제공하여 구글, 네이버, 카카오 계정으로 로그인할 수 있습니다.
<br/><br/>

### League of Legends 티어 인증
- electron을 이용하여 만든 프로그램을 통해 유저가 접속한 롤 클라이언트로부터 티어 정보를 가져와 인증할 수 있습니다.
<br/><br/>

### 홈화면
- 사이트에서 제공하는 다양한 게시물의 목록을 간략하게 보여줍니다.
<br/><br/>

### ON AIR
- 현재 라이브가 진행되고 있는 방을 게임정보와 함께 보여줍니다.
- 실시간으로 공유된 화면을 보고 음성, 채팅으로 유저 간 의사소통을 할 수 있습니다.
- 의사소통을 통해 범인이라고 생각되는 한 명을 투표할 수 있습니다.
<br/><br/>

### 옥상
- 소환사명을 검색하여 해당 소환사가 진행했던 게임 정보 중 원하는 게임을 선택하여 유저들과 공유할 수 있습니다.
- 유저들이 게임에 대한 설명과 함께 투표를 진행할 수 있는 방의 목록을 보여줍니다.
- 녹화된 영상을 보고 범인이라고 생각되는 한 명을 투표할 수 있습니다.
<br/><br/>

### 자유게시판
- CKEditor를 이용하여 텍스트, 이미지, 동영상 등을 업로드하여 게시물을 작성할 수 있습니다.
<br/><br/>

### 마이페이지
- 자신의 인증된 티어정보, 작성한 게시물을 보여줍니다.
- 프로필 사진을 업로드하고 수정할 수 있습니다.
- 닉네임 또는 비밀번호를 변경할 수 있습니다.
---
<br/><br/><br/>

## 📘 참고 문서
[와이어 프레임](https://www.figma.com/file/cwNYhS36UX0aasS9ZGbjmJ/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?node-id=0%3A1)



