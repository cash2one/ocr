/**
 * @file 构建任务
 * @author Franck Chen(chenfan02@baidu.com)
 */

/* eslint-disable */
const os = require('os');

const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');

let webpackConfig = require('./webpack.config');
/* eslint-enable */

const isWatchMode = argv.hasOwnProperty('w') || argv.hasOwnProperty('watch');
const isOnlineMode = argv.hasOwnProperty('o') || argv.hasOwnProperty('online');
const isBumpBuild = argv.hasOwnProperty('new');

// 增量观察构建模式
if (isWatchMode) {
    webpackConfig = Object.assign(
        {},
        webpackConfig,
        {
            devtool: 'source-map',
            plugins: [
                ...webpackConfig.plugins,
                // 增量构建时避免错误跳出，或输出错误结果代码
                new webpack.NoEmitOnErrorsPlugin()
            ]
        }
    );
}

// 线上、测试构建模式
if (isOnlineMode || isBumpBuild) {
    webpackConfig = Object.assign(
        {},
        webpackConfig,
        {
            plugins: [
                ...webpackConfig.plugins,
                new webpack.optimize.OccurrenceOrderPlugin(true),
                // js和css双压缩
                new webpack.optimize.UglifyJsPlugin({
                    warnings: false,
                    comments: false
                })
            ]
        }
    );
}

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
    const isOSX = os.platform() === 'darwin';

    if (isOSX) {
        const dashboard = new Dashboard();
        compiler.apply(new DashboardPlugin(dashboard.setData));
    }

    compiler.run(
        (err, stats) => {
            if (!isOSX) {
                console.log(stats.toString(printConfig));
            }
        }
    );
}
