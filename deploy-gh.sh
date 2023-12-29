NEXT_PUBLIC_MEILISEARCH_HOST=https://search.deptno.dev \
NEXT_PUBLIC_ENDPOINT=https://deptno.dev \
DIR_WIKI_ROOT=~/workspace/src/github.com/deptno \
DIR_WIKI=~/workspace/src/github.com/deptno/public-wiki \
pnpm turbo run build

touch apps/wiki/out/.nojekyll
git -C apps/wiki/out init
git -C apps/wiki/out add .
git -C apps/wiki/out commit -m 'deploy commit'
git -C apps/wiki/out remote add origin git@github.com:deptno/deptno.github.io
git -C apps/wiki/out push -f origin @:main
