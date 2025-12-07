# 저장소 가이드라인

## 매 작업마다 반드시 지킬 사항
- 작업 시작 직전과 작업 완료 직후에는 항상 `git pull`를 실행한다.
- 현재 브랜치를 확인하고, `main`에서 작업을 시작해야 한다면 `codex/<feature|fix-...|yyyy-MM-dd>` 형태의 새 브랜치를 생성해 즉시 `origin`에 push 한다.
- 브랜치가 생성되었으면 기본적으로 `gh`를 활용해서 pr 도 바로 생성해 둔다.
- 이미 `codex/**` 브랜치라면 해당 브랜치가 `origin`에 존재하는지 확인하고, 없다면 `main`으로 돌아가 `git pull` 후 새 브랜치를 다시 생성한다. (머지되었거나 제거된 경우 포함)
- 작업 착수 전에 원격 브랜치가 `main`에 이미 머지되었는지 확인하고, 머지된 상태라면 반드시 `main`으로 이동해 최신화를 진행한 뒤 새로운 `codex/**` 브랜치를 생성한다.
- 커밋은 작은 단위로 나누고, `package.json`과 `pnpm-lock.yaml` 수정은 동일 커밋에만 포함한다.
- 각 대화 턴이 끝날 때 테스트로 에러 없음을 확인하고 push 한다. 이미 `main`에 머지된 브랜치라면 위 규칙에 따라 다시 브랜치를 준비한다. push가 실패했을 때만 `git pull --rebase`를 수행하고, 성공 후에는 추가로 실행하지 않는다.
- 모든 작업에 대해 PR을 만들고 제목은 `[yyyy-MM-dd] 브랜치명: 제목` 형식을 지키며, PR 본문은 한국어로 작성한다.
- 원격 리포지토리는 `origin`만 사용한다.
- 브랜치 이름을 항상 첫 줄에 작성한다.
- PR URL이 있는 경우 두번째 줄에 작성한다.
- 커밋 메시지와 최종 응답은 항상 한글로 작성한다.
- 파일당 top-level 에는 단하나의 함수만 존재하며 항상 export 함수다.
- 이 저장소에서 파일을 변경할 때는 본 가이드를 따른다.
- 변경은 최소한으로, 그리고 기존 스타일과 일관되게 유지한다.
- 임시 처방이 아닌 근본 원인 해결을 우선한다.
- 작업을 마칠 때 전달하는 마지막 요약은 반드시 한글로 작성한다.

## 프로젝트 구조 및 모듈 구성
- 루트: Docker 및 데이터베이스 자산(`docker-compose*.yaml`, `.env`).
- 프런트엔드 앱(Next.js + TypeScript): `apps/wiki/`
  - 라우트/페이지: `apps/wiki/app`
  - UI: `apps/wiki/component`, `apps/wiki/components/ui`
  - 데이터 접근: `apps/wiki/db`
  - 클라이언트 API 헬퍼: `apps/wiki/api`
  - 공유 상수: `apps/wiki/constant.ts`
  - 헬퍼, 공유 함수: `apps/wiki/lib`
  - 에셋: `apps/wiki/public`
- 경로 별칭: `@/*` → `apps/wiki/*`
- 파일 규칙
  - 정의 순서를 import → export function(정확히 하나, `export const` 금지) → export 변수 → export 타입 → 타입 정의 → 지역 상수로 유지한다.
  - file level 에서 함수는 반드시 하나만 정의한다 만약 추가적인 함수가 필요한 경우라면 `lib` 폴더를 활용하여 사용한다
    - 이는 현재 파일에서만 필요한 경우도 마찬가지다
- `apps/wiki/db`와 `apps/wiki/app/**/*.ts` 파일에서는 export 함수의 첫 줄에 `logger.debug({ file, params })`를 넣는다.
  - `logger.debug({ file, params })` 다음에는 빈 줄을 추가한다.
  - 모든 함수 밖, 파일 하단에 `const file = fileURLToPath(import.meta.url)`을 선언한다.
  - 이를 위해 `'url'`에서 `{ fileURLToPath }`를 import 한다.
- 모든 문자열 리터럴에는 홑따옴표를 사용한다.

## 빌드·테스트·개발 명령
- 의존성 설치: `cd frontend && pnpm install`
- 개발 서버(http://localhost:3000): 항상 실행중, chrome-devtools mcp 를 사용해서 접근하며 항상 최신 내용이 이미 반영되어있다.
- 린트(ESLint 설정 `apps/wiki/eslint.config.mjs`): `pnpm lint`
- Node 테스트: `cd frontend && node --test **/*.spec.ts`

## 코딩 스타일 및 네이밍
- TypeScript 및 JavaScript에서는 세미콜론을 사용하지 않는다.
- `if` 문은 항상 중괄호와 줄바꿈을 사용한다.
- 삼항 연산자는 조건 / 참 / 거짓을 세 줄로 나누고, `?`와 `:`는 들여쓴 별도 줄에 배치한다.
- 한 파일에는 하나의 함수선언하며 해당 함수는 export 함수이다
- 작은 헬퍼라도 함수인 경우는 적절한 `**/lib` 폴더로 이동되어야한다
- 공유 상수는 `apps/wiki/constant.ts`에서 재사용한다.
- 컴포넌트/React 파일은 PascalCase(예: `ProjectView.tsx`), 유틸리티는 camelCase(예: `formatDt.ts`)를 사용한다.
- `asf_create.sql`에 정의된 `manage_*` 테이블은 `apps/wiki/db`의 `*3.ts` 모듈에서 다룬다.
- `core_*` 테이블은 조회나 조인에 자유롭게 사용하되, 스키마 생성·변경은 `manage_*` 테이블로 한정한다.
- 파일에서 export 하는 심볼은 정확히 하나이며, 이름은 파일명과 동일해야 한다(예: `selectFoo2.ts` → `selectFoo2` export).
- 파라미터 타입은 `Params`(일반 함수) 또는 `Props`(React 컴포넌트)로 명시한다.

## 테스트 가이드
- 프레임워크: Node 내장 `node:test`와 `assert`.
- 테스트 파일은 코드와 같은 위치에 `.spec.ts`로 추가한다.
- 테스트는 빠르고 결정적이어야 하며 I/O 및 네트워크를 목킹한다.
- 실행: `cd frontend && node --test **/*.spec.ts`.
- 테스트 시에는 `chrome-devtools` MCP를 사용해 로그인 과정을 자동화할 수 있습니다.
  - admin 계정: `__admin/123`
  - 개발 서버를 강제로 재시작해야 하는 경우 `POST /dev/kill` 엔드포인트를 호출하면 됩니다. 프로덕션 환경에서는 403을 응답하고, 개발 환경에서는 호출 직후 프로세스가 종료되면서 재시작됩니다.

## 로깅 및 파일 메타데이터
- 다른 모듈에서 호출되는 비컴포넌트 함수는 `logger.debug({ file, params })`로 시작한다.
- 라우트 엔트리 함수(예: `route.ts`에서 호출되는 핸들러)는 `logger.trace({ file, params }, req.url)`로 시작한다.
- 각 파일의 export 함수 밖, 하단에 `const file = fileURLToPath(import.meta.url)`을 선언한다.

## git 커밋 및 Github PR 가이드라인
- 커밋 메시지는 Conventional Commits 형식(`feat:`, `fix:`, `chore:` 등)을 사용하고, 변경 범위를 작게 유지한다.
- PR에는 명확한 설명, 연결된 이슈, UI 변경 시 스크린샷/애니메이션, 테스트 결과를 포함한다.
- 작성은 한글로 한다
- `git pull` 의 경우 `git pull --rebase --autostash` 을 기본 옵션으로 수행한다
- Github에 대한 작업으로, PR 및 merge 관련된 작업은 항상 `gh` 로 실행한다
  - PR 이 초반에 생성되어 body의 내용이 불충분할 수 있으므로 merge 전 pr 의 body를 상세하게 추가로 기록한다
  - `gh merge -dm` 을 기본으로하여 merge후에는 해당 브랜치 제거를 한다
  - 변경이 복잡할 경우 PR 본문에 근거를 설명한다.

## 보안 및 구성
- 비밀 값은 커밋하지 않는다. 로컬/개발 환경 변수는 루트 `.env`에 관리한다.
- 스키마와 시드 데이터는 `asf_create.sql` 에 둔다.
- 인증 흐름을 수정하기 전에는 `apps/wiki/auth.ts`와 NextAuth 라우트를 검토한다.

## 에이전트 전용 지침
- 이 저장소에서 파일을 변경할 때는 본 가이드를 따른다.
- 변경은 최소한으로, 그리고 기존 스타일과 일관되게 유지한다.
- 임시 처방이 아닌 근본 원인 해결을 우선한다.
- 삼항 연산자는 `?`와 `:`를 각각 들여쓴 줄에 배치하는 세 줄 형식을 유지한다.
- 작업을 마치기 전 `apps/wiki/`에서 `pnpm lint`와 `pnpm check-error`를 실행한다.
- 작업을 마칠 때 전달하는 마지막 요약은 반드시 한글로 작성한다.

## MCP 툴 사용
- shadcn: shadcn-ui 를 사용함에있어 사용법에 대해 질의가 가능하다
- chrome-devtools: localhost:3000 에 접속하여 실제 페이지들에 접근하여 상태를 시각적으로 확인할 수 있다
- pg-k8s: readonly, postgresql 서버로 sql 을 통해 데이터 확인 가능
- next-devtools: 사용중인 next.js 버전이 16 이상인 경우, next.js 관련 질의가 가능하다
