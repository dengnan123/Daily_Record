#!/bin/sh


git add . 
echo "add 成功"
git commit -m "feat: $1"
echo "commit $1 成功"
git pull --rebase 

echo "git pull --rebase 成功"

git push 

echo "git push 成功"