const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));

let webpackConfig = require('./webpack.config');

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
