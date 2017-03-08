#/bin/sh
workspace=$(pwd)
project="aip-platform-ext"
output="$workspace/output"

mkdir -p $output

sh invoke_jenkins_job.sh

BUILD_SUB_DIRS="app conf data template webroot scripts webserver"

cp -rf ${BUILD_SUB_DIRS} ${output}
cd ${output}
    tgz="$project.tgz"
  tar czf $tgz *
mv $tgz $workspace/.
  rm -rf $output/*
  mv $workspace/$tgz $output/.
  mv $workspace/deploy $output/.
  sed -i "s/tgz=.*/&$tgz/g" $output/deploy
  sed -i "s/BUILD_SUB_DIRS=.*/&\"$BUILD_SUB_DIRS\"/g" $output/deploy
echo "build all done!"
