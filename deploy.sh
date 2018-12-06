#!/bin/sh


git add . 
echo "add"
git commit -m "feat: $1"
echo "commit $1"
git pull --rebase 

echo "git pull --rebase"

git push 

echo "git push "