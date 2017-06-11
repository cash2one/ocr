#!/bin/bash

# you must have volumed the your code dir in host, as the /aip dir in container, before
NODE_DOWN_DIR="/aip_download/node_modules"
BOWER_DOWN_DIR="/aip_download/bower_components"
CODE_DIR="/aip"

if [ -d ${CODE_DIR}/external/webroot ]; then
    if [ -d ${CODE_DIR}/external/webroot/node_modules ]; then
        echo "skip copying existing node_modules"
    else
        cp -r ${NODE_DOWN_DIR} ${CODE_DIR}/external/webroot
    fi
    if [ -d ${CODE_DIR}/external/webroot/bower_components ]; then
        echo "skip copying existing bower_components"
    else
        cp -r ${BOWER_DOWN_DIR} ${CODE_DIR}/external/webroot
    fi
else
    echo "CODE_DIR:${CODE_DIR}/external/webroot is empty!"
fi

cd ${CODE_DIR}/external/webroot
## npm install & bower install will cost too much time if the newwork sucks...
## let's skip them to accelerate the progress.
if [ "${STOP_UPDATE}" = "" ]; then
    # npm install
    # bower install --allow-root
    yarn
    bower install --allow-root
fi

# gulp
yarn build
