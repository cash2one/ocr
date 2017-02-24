#/bin/sh
workspace=$(pwd)
project=${workspace//*\//}

OUTPUT_DIR=output/
mkdir -p ${OUTPUT_DIR}

#sh invoke_jenkins_job.sh

BUILD_SUB_DIRS="app conf data template webroot scripts webserver"

cp -rf ${BUILD_SUB_DIRS} ${OUTPUT_DIR}

 cd ${OUTPUT_DIR}
  _time=$(date +%s%N)
  tgz="$project.$_time.tgz"
  tar czf $tgz *
  mv $tgz $workspace/.
  rm -rf $output/*
  mv $workspace/$tgz $output/.

mv ${OUTPUT_DIR}.tar ../

echo "build all done!"
