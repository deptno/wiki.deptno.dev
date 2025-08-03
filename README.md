# wiki.deptno.dev

- vimwiki <https://wiki.deptno.dev> 웹 서버
- 런타임에 `/mnt/data` 에 `vimwiki` 디렉토리가 마운트 되어 있어야 실행 가능
  - 다중 위키를 지원하기 때문에 `/mnt/data/{wiki name}` 형태

## 설정

### 환경 변수

| env                             | description                                           | wiki     | meilisearch-updater |
|---------------------------------|-------------------------------------------------------|----------|---------------------|
| URL_ME                          | about-me                                              | optional |                     |
| DIR_DATA                        | /path/to/vimwiki                                      | required |                     |
| NEXT_PUBLIC_GIT_BRANCH          | default 'main'                                        | optional |                     |
| MEILISEARCH_HOST                | localhost:7700                                        | optional | required            |
| NEXT_PUBLIC_GOOGLE_ANALYTICS_ID | G-XXXXXXXXXX                                          | optional |                     |
| NEXT_PUBLIC_MS_CLARITY_ID       | xxxxxxxxxx                                            | optional |                     |
| GITHUB_WEBHOOK_SECRET           | runtime revalidate path, update meilisearech document | optional |                     |

### 설정 파일

- [wiki.config.json](wiki.config.json) 참조
- `wiki`, `meilisearch-updater` 둘 모두 필요로 함
- 쿠버네티스 배포시에는 하나의 `configmap` 설정 추천

#### private 위키 처리

- 해당 설정은 SEO 및 `robots.txt`, `sitemap.xml` 에서 제외 시킴
- 공개 여부와는 관계가 없으므로 주의
- 인증 처리를 하려면 `reverse proxy` 레벨에서 처리 추천

## 실행

### 로컬

```sh
pnpm dev # docker compose 필요
```

### 배포

- [deploy.sh](deploy.sh) 참조
- 위키 데이터를 위해 `volume` 마운트가 필수인 컨테이너가 뜨고 나서 관계로 런타임 빌드함

## 배포

### 쿠버네티스

- initContainer
  - `DIR_DATA` 에 git clone
  - initContainer `meilisearch-updater` 를 통해 인덱싱
- [deploy.sh](deploy.sh) 참조

### github page

- 지원 제거
  - ~~[deploy-gh.sh](deploy-gh.sh) 참조~~
    - lab/static-build - github pages 이용시
  - 배포 방식에 따라서 배포 스크립트 실행전, `next.config.js` 에서 `export` 옵션 설정필요
    ```js
    module.exports = {
      // 정적 배포인 경우 설정
      output: 'export'
    }
    ```

