#!/bin/sh


git add . 

git commit -m "feat: $1"

git pull --rebase 

echo "git pull --rebase"

git push 

echo "git push "