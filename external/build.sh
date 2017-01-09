#/bin/sh
OUTPUT_DIR=output
mkdir -p ${OUTPUT_DIR}

sh invoke_jenkins_job.sh

BUILD_SUB_DIRS="app conf data template webroot scripts webserver"

cp -rf ${BUILD_SUB_DIRS} ${OUTPUT_DIR}
#tar -cf ${OUTPUT_DIR}.tar ${OUTPUT_DIR}/*
#mv ${OUTPUT_DIR}.tar ../

echo "build all done!"
