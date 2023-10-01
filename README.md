# deptno.dev

- vimwiki <https://deptno.dev> 웹 서버
- 런타임에 `/mnt/data` 에 vimwiki 가 마운트 되어 있어야 실행 가능

## 환경 변수
`value` 는 설정 예제
```yaml
- name: URI_WIKI
  value: https://github.com/deptno/deptno.github.io/wiki
- name: DIR_WIKI
  value: /mnt/data
- name: NEXT_PUBLIC_MEILISEARCH_HOST #meilisearch-updater 에서만 사용
  value: localhost:7700
- name: NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
  value: G-XXXXXXXXXX
- name: NEXT_PUBLIC_MS_CLARITY_ID
  value: xxxxxxxxxx
```

## 실행

### 로컬 실행
kubernetes 에서 port-forward 를 해두어야한다
```shell
NEXT_PUBLIC_MEILISEARCH_HOST=localhost:7700 DIR_WIKI=/path/to/vimwiki pnpm dev
```

### 다커 테스트
```sh
pnpm build
docker build -t wiki .
docker -e WIKI_DIR=/mnt/data -v my-wiki-directory:/mnt/data -p 3000:3000 wiki
```

## 쿠버네티스
initContainer 등을 통해서 `/mnt/data` 에 git clone 후 사용

## todo
- [x] 2레벨 이상의 파일 참조의 경우 링크 깨지는 것 수정 -> 아마 [...md]
- [o] 실시간 업데이트 고민
  - git event 를 받아서 로컬에서 pull 하는 형태의 멀티 컨테이너도 가능
  - [x] 실시간 업데이트를 하지 않고 *웹훅을 받아 재시작*하는 형태로 초기 구현
    - pod 가 **하나**라는 가정으로 설계됨, **스케일이 필요한 경우** 고도화 필요
- [x] 서치 지원
- [ ] 여러 vimwiki 의 경우도 지원
  - [ ] clone 형태는 골아프니 github을 바로 바라 보는 게 나을 수도
  - [x] private 위키 숨기기
- [ ] ui
