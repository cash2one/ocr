#/bin/sh
workspace=$(pwd)
project=${workspace//*\//}
dir=$(dirname $0)
prj_code="$workspace/$dir"

output="$workspace/output"

mkdir output
#cd $prj_code


#sh invoke_jenkins_job.sh

BUILD_SUB_DIRS="app conf data php template webroot scripts webserver"

cp -rf ${BUILD_SUB_DIRS} ${output}

 cd ${output}
  _time=$(date +%s%N)
  tgz="$project.$_time.tgz"
  tar czf $tgz *
  mv $tgz $workspace/.
 # rm -rf $output/*

echo "build all done!"
