#!/bin/bash

# start a jenkin job build
CURL_CMD="curl --user zhouyingfeng:9252522b511c3de99bd009802c8c74e2 -f"
JOB_NAME="ai_platform_web_docker_build"
JENKINS_JOB="http://tg.jenkins.baidu.com/job/${JOB_NAME}/"
temp_file=./tmp_fl
${CURL_CMD} -XPOST -I "${JENKINS_JOB}/build" > ${temp_file}1
if [ $? -ne 0 ]; then
    echo "Bad jenkins build invocation!"
    # rm -f ${temp_file}1
    exit 1
fi

# check the queue-item-url, to get the job-build-url
queue_url=`cat ${temp_file}1 | grep Location | awk -F "Location: " '{print $2}' | sed "s%\r%%g"`
queue_url=${queue_url}api/json?pretty=true
echo "queue url:${queue_url}"

count=0
build_started=0
while true; do
    count=$(( count + 1 ))
    echo "count1:${count}"
    sleep 5
    ${CURL_CMD} "${queue_url}" > ${temp_file}2
    if [ "$?" = "0" ]; then
        build_url=`cat ${temp_file}2 | grep "\"${JENKINS_JOB}" | grep -v "\"${JENKINS_JOB}\"" | \
            awk -F "\"" '{print $4;}' | sed "s%\r%%g"`
        if [ -n "${build_url}" ]; then
            echo "Find build url:${build_url}"
            build_started=1
            break
        else
            echo "Still check url:${queue_url}"
        fi
    else
        build_started=0
        break
    fi
    if [ ${count} -gt 200 ]; then
        break
    fi
done

if [ ${build_started} -ne 1 ]; then
    echo "Building process of job[${build_url}] too long, or meet some error!"
    # rm -f ${temp_file}2
    exit 2
fi

# check the jenkins job build status
count=0
error_count=0
build_finished=0
while true; do
    count=$(( count + 1 ))
    echo "count2:${count}"
    sleep 5
    ${CURL_CMD} "${build_url}/api/json?pretty=true" > ${temp_file}3
    if [ $? -ne 0 ]; then
        echo "Can't get the details of finished job build:${build_url}"
        error_count=$(( error_count + 1 ))
        # rm -f ${temp_file}3
    fi

    if [ ${error_count} -gt 10 ]; then
        echo "Too many times that get the wrong job status:${build_url}"
        # rm -f ${temp_file}3
        exit 3
    fi

    building=`cat ${temp_file}3 | grep '"building"' | awk -F ": " '{print $2;}' \
                | sed "s%\r%%g" | sed "s%,%%g"`
    if [ "${building}" = "true" ]; then
        echo "Still building..."
    elif [ "${building}" = "false" ]; then
        build_result=`cat ${temp_file}3 | grep '"result"' | awk -F ": " '{print $2;}' \
                        | sed "s%\r%%g" | sed "s%,%%g"`
        # good: Success, bad: failure, aborted
        echo "Read the jenkins job build result:${build_result}"
        break
    else
        echo "Not expected building flag:${building}..."
        error_count=$(( error_count + 1 ))
    fi

    if [ ${error_count} -gt 10 ]; then
        echo "Too many times that get the wrong job status:${build_url}"
        # rm -f ${temp_file}3
        exit 3
    fi
    if [ ${count} -gt 200 ]; then
        echo "The build costs too much time:${build_url}"
        # rm -f ${temp_file}3
        exit 4
    fi
done

# check the build result
if [ "${build_result}" = '"SUCCESS"' ]; then
    echo "Good job:${building_url}"
else
    echo "Bad job state[${build_result}]: ${building_url}"
    exit 4
fi

# read the build number
build_number=`cat ${temp_file} | grep '"number"' | awk -F ": " '{print $2;}' \
                | sed "s%\r%%g" | sed "s%,%%g"`
if [ "${build_number}" = "" ]; then
    echo "Can't get the build number from page? ${building_url}"
    exit 5
fi

# concat the ftp url
ftp_url="ftp://tg:a1b2c3.@ftp.jenkins.baidu.com:8557/${JOB_NAME}/${build_number}/"
wget -r -nH -np -m ${ftp_url}
mv ./${JOB_NAME}/${build_number}/* . -u
rm -rf ${JOB_NAME}
echo "all done"
