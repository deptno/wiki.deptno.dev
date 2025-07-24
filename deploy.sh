OUTPUT=$(node -e "process.stdout.write(require('./apps/wiki/next.config.js').output ?? '')")

if [ "$OUTPUT" != "" ]; then
  echo "next.config.js 에서 \`output\` 속성 제거"
  exit 1
fi

export NS=deptno

TAG=latest
GIT_COMMIT=$(git rev-parse --short @)
CHANGE_CAUSE="$(date '+%Y%m%d-%H:%M:%S') $(git rev-parse --abbrev-ref @)@$(git show --no-patch --oneline)"
NAME=wiki
APP_MS=meilisearch-updater
YAML=../cluster-amd64/manifest/$NAME.yaml
PERMISSION="$(kubectl auth can-i update deployment -n deptno)"

set -e

echo $PERMISSION
if [[ "no" == $PERMISSION ]]; then
  echo "no permission"
  exit 1
fi
if [[ "error: You must be logged in to the server (Unauthorized)" == "$PERMISSION" ]]; then
  echo "not authorized"
  exit 1
fi

echo $YAML

container_envs=$(
  cat $YAML \
    | yq -ojson \
    | jq 'select(.kind == "Deployment")' \
    | jq -r '.spec.template.spec.containers[0].env | map(select(.value)) | map(.name + "=" + .value) | .[]'
)

while IFS= read -r line; do export "$line"; done <<< "$container_envs"

export DIR_WIKI_ROOT=../../../
export DIR_WIKI=../../../public-wiki

pnpm turbo run build

docker build . \
 --platform linux/amd64 \
 -t harbor.deptno.dev/deptno/$NAME:$TAG \
 -t harbor.deptno.dev/deptno/$NAME:$GIT_COMMIT

docker push harbor.deptno.dev/deptno/$NAME:$TAG
docker push harbor.deptno.dev/deptno/$NAME:$GIT_COMMIT

cat $YAML \
  | sed "s|$APP_MS:.*|$APP_MS:$GIT_COMMIT|" \
  | sed "s|$NAME:.*|$NAME:$GIT_COMMIT|" \
  | kubectl apply -f -

kubectl annotate -n $NS deployment/$NAME kubernetes.io/change-cause="$CHANGE_CAUSE"
