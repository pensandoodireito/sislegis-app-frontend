#!/bin/bash

BASEDIR=`cd "$(dirname "$0")"; echo $PWD`

match=${match:-'../rest'}
change=${change:-'http://localhost:8080/sislegis/rest'}

for f in $(find "$BASEDIR"/.. -type f -name '*.js' | xargs grep -l "$match")
do
    sed -i "s,$match,$change,g" $f
done
