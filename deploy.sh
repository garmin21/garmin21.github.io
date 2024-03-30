#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm build

# cd dist

# 创建一个新的临时分支，将 dist 目录中的文件提交到该分支上。
git checkout -b temp_branch
git add dist
git commit -m "Add files from dist directory"


git checkout main

#从临时分支合并变更到 main 分支。
git merge --no-edit temp_branch


git push origin main
# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git push origin --delete temp_branch

git branch --delete temp_branch

# git init
# git add -A
# git commit -m 'deploy'


# git pull

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
# 
# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f https://github.com/garmin21/jm-garming.git garming21:main
# git push https://github.com/garmin21/garmin21.github.io.git main -f

# git push https://github.com/garmin21/garmin21.github.io.git feature:develop

# git subtree push --prefix dist https://github.com/garmin21/garmin21.github.io.git main

# cd ..

# rm -rf dist

exit 0