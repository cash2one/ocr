## 依赖包安装<br>
依次执行下叙指令完成依赖安装<br>
yarn<br>
bower install<br>
> 依赖安装推荐使用yarn,yarn缓存机制更加完善，同时会生成版本锁文件yarn.lock,确保依赖版本固定，更加安全<br>

## 注意事项<br>
* 不要尝试使用yarn clean去清理依赖包中的无用内容，默认清理影响postcss的正常使用<br>
* 如果发现丢失了内容，可执行yarn install --force尝试找回<br>

## TODO<br>

## 构建脚本<br>
yarn build -- 构建静态资源(不生成新版本号)<br>
yarn watch -- 本地开发构建，不生成新版本号，生成source-map，并观测代码变动，开始增量构建<br>
yarn bump -- 生成新版本号，并构建<br>

## 构建过程说明<br>
构建中静态分析，检测html,less中中引用的静态资源地址在源文件中是否存在，如果不存在则报错，无法通过编译，确保线上不会丢失静态资源<br>

## 环境地址汇总<br>
线下沙盒环境: http://cp01-yf-db-02.epc.baidu.com:8033/<br>
线下沙盒环境jenkins: http://tg.jenkins.baidu.com/job/ai_platform_web_docker_build_branch<br>
测试环境: http://cp01-data-flow-research.epc.baidu.com:8032<br>
测试环境jenkins: http://tg.jenkins.baidu.com/job/holmes_aip_branch_deploy/<br>
* 线下jenkins服务有外网权限<br>
