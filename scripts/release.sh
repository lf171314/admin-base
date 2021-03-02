#!/bin/bash
# 文件路径
filePath='./public/lib/config.js'
customVersion=$1

if [ ! -f "$dir" ]
then
  touch $filePath
fi

# 授权读写
chmod +rw "${filePath}"
# 获取版本号 默认取最后一个
for sysVersion in $(git tag)
do
  continue;
done

function getVersion(){
  version=$customVersion
  if [ -z "$customVersion" ]
  then
    version="$sysVersion"
  fi
}
getVersion
# 输出到文件内
# $1 为版本号
# $2 为备注
cat>"${filePath}"<<EOF
window.__RELEASE_INFO__ = {
  // 最新提交日志
  log: "$(git log -1 | grep commit | cut -d ' ' -f2)",
  // 打包日期
  date: "$(date '+%Y-%m-%d %H:%M')",
  // 当前分支
  branch: "$(git rev-parse --abbrev-ref HEAD)",
  // 仓库地址
  url: "$(git remote get-url --all origin)",
  // 版本号
  version: "$version",
  // 备注
  remark: "$2"
}
EOF