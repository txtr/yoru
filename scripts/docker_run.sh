#!/usr/bin/env bash

export MM_APP_ROOT="$HOME/projects/yoru"

docker run -ti -d -p 0.0.0.0:9200:9200 -p 0.0.0.0:7151:7151 -p 0.0.0.0:9300:9300 mindmeldworkbench/dep:es_7

echo DONE
