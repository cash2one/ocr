## 依赖包安装<br>
依次执行下叙指令完成依赖安装<br>
yarn<br>
bower install<br>
> 依赖安装推荐使用yarn,yarn缓存机制更加完善，同时会生成版本锁文件yarn.lock,确保依赖版本固定，更加安全<br>

## 注意事项
* 不要尝试使用yarn clean去清理依赖包中的无用内容，默认清理影响postcss的正常使用<br>
* 如果发现丢失了内容，可执行yarn install --force尝试找回<br>

## TODO<br>

## 构建脚本<br>
yarn build -- 构建静态资源(不生成新版本号)<br>
yarn watch -- 本地开发构建，不生成新版本号，生成新版本号，并观测代码变动，开始增量构建<br>
