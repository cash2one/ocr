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

if (isWatchMode) {
    Object.assign(
        webpackConfig,
        {
            watch: true
        }
    );
}

webpack(
    webpackConfig,
    () => {

    }
);
