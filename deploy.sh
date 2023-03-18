var_production='production'
var_url_origin=$(git remote get-url origin)
# git branch --show-current

npm run build
npm version patch

# Git
git push origin --tags
git push origin HEAD

cd dist/
# Git
git init
git checkout -b $var_production
git add -A
git commit -m '🚀 Deploy'
# git commit --amend -m '🚀 Deploy'
git push -f $var_url_origin $var_production

cd ..