TODO:
1.html-webpack-plugin模板升级为handlebars,ejs实在太弱了，目前有些css和js注入依赖数组推测，因为ejs没有helper,可尝试使用handlebars的helper解决这类问题<br>
2.template过html-loader,目前html模板没有修改依赖路径，不科学<br>

Q: 为什么不适用webpack指令调用webpack<br>
A: 方便代码调试打断点，同时为了保证未来平滑迁移编译集群<br>
