set -e

npm run build
npm version --patch

# Git
git push origin --tags

cd dist/
# Git
git init
git checkout -B production
git add -A
git commit -m '🚀 Deploy'
# git commit --amend -m '🚀 Deploy'
git push -f https://github.com/luccasscds/voice-recognition.git production
# git remote get-url origin

cd -