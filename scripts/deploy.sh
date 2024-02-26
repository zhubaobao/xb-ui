# /bin/bash

# 确保脚本抛出遇到的错误
set -e

# 重新打包组件库
npm run build

# 进入docs目录
cd docs

# 打包生成静态文件
npm run docs:build

# 进入docs目录
cd .vitepress/dist

# 提交打包静态网站到 github-pages 分支
git add .
git commit -m 'docs: 修改文档'

# 部署到 https://<username>.github.io/<repo>
git push -u git@github.com:zhubaobao/xb-ui.git master:docs-pages

# 提交所有代码到github
cd ../../../
git add .
git commit -m 'docs: 修改文档'
git push -u origin master   