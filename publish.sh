#!/bin/bash
####################################3
## Tavinus 2024
##
## Parses and publishes wiki

div=$'------------------------------------------------------'


mess="Wiki Update"
[[ ! -z  "$1" ]] && mess="$@"

echo "$div"
echo "  COMMIT AND PUBLISH"

echo "$div"
echo "git add ."$'\n'
git add .

echo "$div"
echo "git commit -am '$mess'"$'\n'
git commit -am "'$mess'"

echo "$div"
echo "git push"$'\n'
git push
echo "$div"
