# deptno.dev
- vimwiki <https://deptno.dev> 웹 서버
- 런타임에 `/mnt/data` 에 vimwiki 가 마운트 되어 있어야 실행 가능

## 환경 변수
> 필수: m
> 선택: o

| env                             | 설명                  | wiki | meilisearch-updater |
|---------------------------------|-----------------------|------|---------------------|
| URL_ME                          | 자기소개 페이지       | o    |                     |
| DIR_WIKI                        | /path/to/vimwiki      |      | m                   |
| DIR_WIKI_ROOT                   | /path/to/vimwiki/root | m    |                     |
| NEXT_PUBLIC_GIT_BRANCH          | default 'main'        | o    |                     |
| NEXT_PUBLIC_GOOGLE_ANALYTICS_ID | G-XXXXXXXXXX          | o    |                     |
| NEXT_PUBLIC_MEILISEARCH_HOST    | localhost:7700        | o    | m                   |
| NEXT_PUBLIC_MS_CLARITY_ID       | xxxxxxxxxx            | o    |                     |

## 실행

### 로컬 실행 및 빌드
```sh
# NEXT_PUBLIC_MEILISEARCH_HOST: 실행되는 서버의 위치 지정
# DIR_WIKI: meilisearch-updater 를 사용하는 경우
NEXT_PUBLIC_MEILISEARCH_HOST=localhost:7700 \
NEXT_PUBLIC_ENDPOINT=https://deptno.dev \
DIR_WIKI_ROOT=/path/to/vimwiki/root \
pnpm dev # or pnpm build
```

## 설정 파일
- [wiki.config.js](wiki.config.js) 참조

### 다커 테스트
```sh
pnpm build
docker build -t wiki .
docker -e WIKI_DIR=/mnt/data -v my-wiki-directory:/mnt/data -p 3000:3000 wiki
```

## 배포

### 쿠버네티스
- initContainer 등을 통해서 `/mnt/data` 에 git clone 후 사용

### github page
- [deploy-gh.sh](deploy-gh.sh) 참조
