# MARIADB 접속방법
1. mysql 혹은 maraidb 설치
2. mysql --host stg-yswa-kr-practice-db-master.mariadb.database.azure.com --user S07P11A104@stg-yswa-kr-practice-db-master.mariadb.database.azure.com -p
3. 비번 입력
4. use s07p11a104;

https://docs.microsoft.com/ko-kr/azure/mariadb/quickstart-create-mariadb-server-database-using-azure-portal

## Git 커밋 규칙

---

**커밋 메시지 5가지 규칙**   

1. 제목을 50글자 내로 제한 
2. 고유명사(JPA, React 등), 파일명을 제외한 나머지는 전부 소문자로 작성 
3. 제목 끝에 마침표 넣지 않기
4. 명령문으로 사용하며 과거형을 사용하지 않는다 
5. 무엇을 했는지 적는다


```bash
type : title  (#issue (참고 이슈, 생략 가능) )

body(본문, 생략 가능)
```

<aside>
📍 feat : 새로운 기능
fix : 버그 수정
build : 빌드 관련 파일 수정
chore : 그 외 자잘한 수정
ci : CI관련 설정 수정
docs : 문서 수정
style : 코드 스타일 혹은 포맷 등 수정
refactor :  코드 리팩토링
test : 테스트 코드 수정

</aside>

- Issue는 자유롭게 작성.. (Label만 잘 붙이기)
- PR (MR)은 커밋 규칙 따르기.

참고링크: [https://meetup.toast.com/posts/106](https://meetup.toast.com/posts/106)

Github가 이슈 종료로 인식하는 키워드는 다음과 같습니다.

- close  일반 개발 이슈,
- closes  일반 개발 이슈,
- closed  일반 개발 이슈,
- fix  버그 픽스나 핫 픽스 이슈,
- fixes  버그 픽스나 핫 픽스 이슈,
- fixed  버그 픽스나 핫 픽스 이슈,
- resolve 문의나 요청 사항에 대응한 이슈
- resolves 문의나 요청 사항에 대응한 이슈
- resolved 문의나 요청 사항에 대응한 이슈

## Git 브랜치 규칙

---

**MERGE 말고 MERGE REQUEST 하기**

- master : 제품으로 출시될 수 있는 브랜치
- hotfix : 출시 버전에서 발생한 버그를 수정하는 브랜치
- dev : 다음 출시 버전을 개발하는 브랜치
- feat/분야/기능 : 기능을 개발하는 브랜치 ( 만들고 완료하면 삭제 )

> 예시 : 최대한 단어 하나로 적기. 불가능하면 snake case로.
> 

- feat/fe/login
- feat/be/login
- feat/be/user_tier_info

기능 개발 완료 시 feat → dev → feat revert

스프린트 종료 시  dev → master

배포 후 문제 발생 시 master → hotfix → master

# Jira


### Epic: 가장 큰 기능

ex) 회원관리, 로그인, 게시판 등

### Story: Epic에서 세부화된 기능

ex) 회원관리-탈퇴, 회원관리-회원정보 수정 등

### Task: 실제 하는 일

ex ) [BE] 회원 탈퇴 API 구현, [FE] 회원 탈퇴 페이지 작성, [학습] 일렉트론 공부

## DB

---

- 테이블 이름, 뷰, 객체는 단수 사용
- 테이블 이름은 명사 사용
- 테이블 간 관계는 동사 사용
- snake case 사용
- 접두사, 접미사 사용 금지
- 따옴표 사용 금지
- 모든 식별자는 소문자 사용

