OUTPUT=$(node -e "process.stdout.write(require('./apps/wiki/next.config.js').output ?? '')")

if [ $OUTPUT != "export" ]; then
  echo "next.config.js 에서 \`"output": "export"\` 설정 필요"
  exit 1
fi

NEXT_PUBLIC_MEILISEARCH_HOST=https://search.deptno.dev \
NEXT_PUBLIC_ENDPOINT=https://deptno.dev \
DIR_WIKI_ROOT=~/workspace/src/github.com/deptno \
DIR_WIKI=~/workspace/src/github.com/deptno/public-wiki \
MEILI_API_KEY="fde26209c267ac6b5802e52d0582a18ad593d3853f354e3d63e67d40c36628a7" \
pnpm turbo run build

NEXT_PUBLIC_MEILISEARCH_HOST=https://search.deptno.dev \
MEILI_MASTER_KEY=$(kubectl get secret -n deptno meilisearch-master-key -ojsonpath="{.data.MEILI_MASTER_KEY}" | base64 -d | tr -d '\n') \
DIR_WIKI=~/workspace/src/github.com/deptno/public-wiki \
pnpm --filter meilisearch-updater start

touch apps/wiki/out/.nojekyll
git -C apps/wiki/out init
git -C apps/wiki/out add .
git -C apps/wiki/out commit -m 'deploy commit'
git -C apps/wiki/out remote add origin git@github.com:deptno/deptno.github.io
git -C apps/wiki/out push -f origin @:main
