#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

rm -rf dist

# 生成静态文件
pnpm build

cd dist


git init
git add -A
git commit -m 'deploy'


# 与远程分支建立联系
git remote add origin git@github.com:garmin21/garmin21.github.io.git

# 强制推送到远程main 分支
git push https://github.com/garmin21/garmin21.github.io.git garming21:main -f

cd ..

rm -rf dist

exit 0