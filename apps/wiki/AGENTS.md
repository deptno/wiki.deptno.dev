# `apps/wiki/app` 에이전트 가이드

## 적용 범위
- `apps/wiki/app/**`에 속한 라우트 핸들러, 서버 액션, 모든 TypeScript 파일에 적용된다.

## 구조 및 네이밍
- 한 파일에는 export 심볼을 하나만 두고, export 이름은 파일명과 동일하게 맞춘다.
- 정의 순서는 import → export 함수(또는 컴포넌트) → export 항목 → 타입 → 지역 선언을 유지한다.
- React 컴포넌트는 PascalCase, 비컴포넌트 유틸리티는 camelCase를 사용한다.

## 코딩 스타일
- TypeScript/JavaScript에서는 세미콜론을 사용하지 않는다.
- `if` 문은 항상 중괄호와 줄바꿈을 적용한다.
- 삼항 연산자는 조건 / 참 / 거짓 세 줄 구조로 작성하고, `?`와 `:`는 들여쓴 별도 줄에 둔다.
- 가능한 한 `apps/wiki/constant.ts`의 공유 상수를 활용한다.
- 파라미터 타입은 명시적으로 선언하며, 컴포넌트는 `Props`, 핸들러는 `Params`를 사용한다.

## 로깅 및 메타데이터
- 라우트 엔트리 함수(예: export 되는 `GET`, `POST`, 라우트 파일의 컴포넌트)는 아래 형태로 시작한다.
  ```ts
  logger.trace({ file, params }, req.url)
  ```
  `req`를 사용할 수 없는 경우에는 `logger.debug({ file, params })`로 시작한다.
- `'url'`에서 `{ fileURLToPath }`를 import 하고, 모듈 하단에 `const file = fileURLToPath(import.meta.url)`을 추가한다.

## 데이터 접근
- `apps/wiki/db/*3.ts`에 정의된 상위 헬퍼를 사용한다. 이 디렉터리에서는 `@/db/pg`, `@/db/pg2`, 혹은 원시 풀 인스턴스를 직접 import 하지 않는다.
- 비즈니스 로직은 헬퍼 내부에 유지하고, 라우트 파일에서는 권한, 유효성 검사, 응답 조합에 집중한다.

## 테스트 및 검증
- 이 디렉터리의 파일을 수정했다면 `cd frontend && pnpm lint`와 `pnpm check-error`를 실행한 뒤 작업을 마무리한다.
