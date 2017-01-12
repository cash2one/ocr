/**
 * @file 构建任务
 * @author Franck Chen(chenfan02@baidu.com)
 */

/* eslint-disable */
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));

let webpackConfig = require('./webpack.config');
/* eslint-enable */

const isWatchMode = argv.hasOwnProperty('w');

// 编译器
const compiler = webpack(webpackConfig);
// 打印配置
const printConfig = {
    hash: false,
    children: false,
    modules: false,
    chunkOrigins: false,
    chunksSort: false,
    source: false,
    // 以下是控制台参数
    chunks: false,
    colors: true
};


if (isWatchMode) {
    compiler.watch(
        {
            aggregateTimeout: 300,
            poll: true
        },
        (err, stats) => {
            console.log(stats.toString(printConfig));
        }
    );
}
else {
    compiler.run(
        (err, stats) => {
            console.log(stats.toString(printConfig));
        }
    );
}
