# 📝Web Editor
<details>
<summary>📦Install Dependencies</summary>

```bash
npm install
```
</details>

<details>
<summary>🏃‍♂️Script Command</summary>

- 실행
    
    ```bash
    npm start
    ```
    
- 빌드 및 테스트
    
    ```bash
    npm run build && serve -s build
    ```
    (`bash: serve: command not found` 발생 시 `npm install -g serve` 후 다시 시도)
</details>

## 🎨ERD (Entity Relationship Diagram)
[🔗dbdigram ERD 바로가기](https://dbdiagram.io/d/Web-Editor-66013ad9ae072629cede68ad)

![image](https://github.com/do0ori/web-editor-project/assets/71831926/229e558c-e2f5-42a4-96c4-af308404e779)

## 🖋️API Design
[🔗API 명세 바로가기](https://do0ori.notion.site/95032abd4b984c4dac59a8f5d8a07a56?v=28dd90d7925a412083741a4466f3e4ba&pvs=4)

- 👤회원 API
    - 로그인
    - 로그아웃
    - 사용자 자신의 정보 조회
    - 회원가입
- 📒노트 API
    - 사용자가 작성한 노트 목록
    - 노트 상세 조회
    - 노트 생성
    - 노트 업데이트
    - 노트 삭제