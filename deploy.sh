#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm build

cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
# 
# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f https://github.com/garmin21/jm-garming.git garming21:main
git push https://github.com/garmin21/garmin21.github.io.git main -f

cd ..

rm -rf dist

# git add -A
# git commit -m '提交到主分支'
# git push origin garming21 -f

exit 0