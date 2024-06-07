#!/bin/bash

# 自动化部署
# 开发新功能啦 -> 切新分支 git ck -b newBranch
# 开发完成后 -> 提交代码 git add . git commit -m 'msg'
# 合并到内外侧分支 -> 合并到 Rel内外侧分支 git marge rel
# 就拿 Vue React项目来说，发布内外侧之前我们还需要将之前生产的代码给删除，不然体积会越来越大 rm -rf /linux目录路径~当前项目/*
# 发布内外侧（还有个预发布）， build - FileZilla | ZOC7 - 上传 不管你是拖拽，还是linux命令都可以，开心就好嘛
# 上面就是发布一个新功能的流程，可想而知，你让我一天做一次还能接受，要是隔几分钟来一次谁受得了？当然现实就是这样的操作隔几分钟就会来一次！！！

set -e

if [ "$1"x != "devx" ] && [ "$1"x != "testx" ] && [ "$1"x != "prex" ];then
    echo -e "\033[41;37m 不存在 $1 环境  只有 -> dev(内测) test(外侧) pre(预发布) \033[0m"
    exit
fi

function devFn() {
    ssh root@ip rm -rf 服务器项目路径/*

    echo -e "\033[32m 连接成功，上传代码中... \033[0m"

    rsync -e "ssh -p 端口"  --exclude=storage -a  本地代码路径/dist/*      root@ip:服务器项目路径/

    echo -e "\033[32m 内测 上传成功 \033[0m\n"
}

function testFn() {
    ssh -p 端口 root@ip rm -rf 服务器项目路径/*

    echo -e "\033[32m 连接成功，上传代码中... \033[0m"

    rsync -e "ssh -p 端口"  --exclude=storage -a  本地代码路径/dist/*      root@ip:服务器项目路径/

    echo -e "\033[32m 外侧上传成功 \033[0m\n"
}

function preFn() {
    echo "执行链接预发布服务器"
}

function build() {
    cd source
    npm run build:$1

    echo -e "\033[32m 打包完毕 \033[0m"
    echo -e "\033[32m 连接 $1 服务器 \033[0m"

    if [ "$1"x == "devx" ];then
        devFn
    elif [ "$1"x == "testx" ];then
        testFn
    elif [ "$1"x == "prex" ];then
        preFn
    else
        echo -e "\033[41;37m 应该不会走到这里来吧... \033[0m"
        exit
    fi
}


#获取当前分支
branch=$(git symbolic-ref --short HEAD)

#判断是否是rel分支
if [ ${branch} == "rel" ];then
    echo -e "\n\033[32m 当前在rel分支\n 不出意外应该刚发布过内测\n 所以无需执行git操作\n 所以是否直接发布 $1 环境\033[0m"
    read -p $'\n\033[31m是否直接打包上传？y or n: \033[0m' isbuild
    if [ "$isbuild" != 'y' ];then
        exit
    fi
    build $1
else
    #此sh脚本只适用于单子发布rel环境,提醒
    echo -e "\n\033[31m dev(内测) test(外侧) pre(预发布) \033[0m"
    echo -e "\033[31m 当前需要发布 $1 环境 \033[0m"
    #询问是否继续发布当前环境
    read -p $'\n\033[31m是否继续操作？y or n: \033[0m' isVersion
    if [ "$isVersion" != 'y' ];then
        exit
    fi

    echo -e "\n\033[32m 已确认环境 \033[0m\n"
    echo -e "\033[31m $1 环境，当前分支为： ${branch} \033[0m"
    #确认当前分支，是否继续
    read -p $'\n\033[31m请确认分支，是否继续操作？y or n: \033[0m' isContinue
    if [ "$isContinue" != 'y' ];then
        exit
    fi

    echo -e "\n\033[32m 已确认分支，分支为 -> ${branch} \033[0m\n"
    echo -e "\033[32m 开始提交 ${branch} 分支代码，执行 add commit  \033[0m\n"
    git add .
    read -p $'\n\033[31m请输入本次commit信息：\033[0m' commitInfo
    git commit -m ${commitInfo}

    echo -e "\033[32m 开始切换分支 \033[0m\n"
    git checkout rel
    echo -e "\033[32m 开始拉取 rel origin \033[0m\n"
    git pull origin rel
    echo -e "\033[32m 开始 merge 修改至 rel \033[0m\n"
    git merge ${branch}

    #判断merge是否成功
    if [ $? == 0 ];then
        echo -e "\033[32m merge ${branch} -> rel 成功 \033[0m\n"
        echo -e "\n\033[32m 开始推送 rel 至远端 origin \033[0m\n"

        git push origin rel

        echo -e "\n\033[32m 推送 rel 至远端 origin 成功 \033[0m\n"
        echo -e "\n\033[32m 执行打包 \033[0m\n"

        build $1
        
    else
        echo -e  "\033[31m merge失败，请检查 \033[0m"
        exit
    fi
fi
