set -e

while IFS='=' read -r name value; do
  [ -z "$name" ] && continue
  export "$name=$value"
done <<< "$(yq -r '.services.wiki.environment[]' docker-compose.yaml)"

export NODE_ENV=production
# 위키들의 상위 디렉토리 지정
export DIR_DATA=../../..

env | grep DIR_DATA

pnpm turbo --filter @app/wiki build
