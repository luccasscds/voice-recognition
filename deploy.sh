var_production='production'
var_url_origin=$(git remote get-url origin)

set -e

npm run build
npm version --patch

# Git
git push origin --tags

cd dist/
# Git
git init
git checkout -B $var_production
git add -A
git commit -m '🚀 Deploy'
# git commit --amend -m '🚀 Deploy'
git push -f $var_url_origin $var_production

cd -