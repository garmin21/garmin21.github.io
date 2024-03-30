
#!/usr/bin/env sh


# # 进入生成的文件夹
# cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'


# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f https://github.com/garmin21/jm-garming.git garming21:gh-pages
# git push -f https://199.232.69.194/garmin21/jm-garming.git garming21:gh-pages

git push -f https://github.com/garmin21/garmin21.github.io.git dev:main

cd ..

rm -rf dist

exit 0