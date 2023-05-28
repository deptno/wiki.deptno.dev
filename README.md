# deptno.dev

vimwiki <https://deptno.dev> 의 웹 서빙

런타임에 /mnt/data 에 vimwiki 가 마운트 되어 있어야 실행 가능

## 실행
### 로컬 실행
```shell
DIR_WIKI=/path/to/vimwiki pnpm dev
```
### 다커 테스트
```sh
docker build -t wiki .
docker -v my-wiki-directory:/mnt/data -p 3000:3000 wiki
```
### 다커 테스트
## 쿠버네티스
initContainer 등을 통해서 `/mnt/data` 에 git clone 후 사용

## todo
- [x] 2레벨 이상의 파일 참조의 경우 링크 깨지는 것 수정 -> 아마 [...md]
- [ ] 실시간 업데이트 고민
  - git event 를 받아서 로컬에서 pull 하는 형태의 멀티 컨테이너도 가능
- [ ] 서치 지원
- [ ] 여러 vimwiki 의 경우도 지원
  - [ ] clone 형태는 골아프니 github을 바로 바라 보는 게 나을 수도
  - [x] private 위키 숨기기
- [ ] ui
