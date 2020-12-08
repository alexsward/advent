#!/bin/sh
set -e

# usage: ./bootstrap year day

day=$(printf "day%02d\n" $2)
path=src/$1/$day
mkdir -p $path
touch $path/index.ts
touch $path/index.test.ts
touch $path/README.md
touch $path/input
sed -i '' -e "s/$1\/day[0-9]\{2\}/$1\/$day/g" ./Makefile
