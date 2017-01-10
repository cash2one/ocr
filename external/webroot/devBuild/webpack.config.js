/**
 * @file webpack构建
 * @author Franck Chen(chenfan02@baidu.com)
 */

/* eslint-disable */
// 原生模块
const path = require('path');

// 第三方模块
const glob = require('glob');
const webpack = require('webpack');

// webpack plgin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

// 构建配置
const buildConfig = require('./config.json');
/* eslint-enable */

const entries = glob.sync(
    '**/*.js',
    {
        cwd: path.join(__dirname, '..', 'src', 'entry'),
        ignore: ['**/pager.js', '**/base.js']
    }
);

// 生成符合webpack规则的entries
const webpackEntries = {};
// 一个文件一个html页面
const htmlWebpackPluginArr = [];
entries.forEach(entry => {
    const {dir, name} = path.parse(entry);
    const resourcePath = path.join(dir, name);

    // 去除文件后缀，资源入数组，防止entry引用entry
    webpackEntries[resourcePath] = [path.join('src', 'entry', entry)];

    // 逐一添加plugin，生成html入口
    htmlWebpackPluginArr.push(
        new HtmlWebpackPlugin({
            // 注入css和js
            inject: true,
            // 一次只能生成一个html文件...
            filename: path.join('entry', `${resourcePath}.html`),
            // 一个html直包含对应chunk，这样能为每个entry自定义模板
            chunks: ['common.bundle', resourcePath],
            // 模板
            template: path.resolve(__dirname, '..', 'src', 'view', 'common', 'template.ejs'),
            // 以下是自定义属性, 注意这里不要补充后缀，后缀留在模板里，避免动态引入，无法使用html-loader
            mainContent: resourcePath
        })
    );
});

// 目前想到的只有jQuery是通用的，要单独打包的
webpackEntries['common.bundle'] = ['jquery'];

module.exports = {
    // 注意基准路径是webroot
    context: path.resolve(__dirname, '..'),
    entry: webpackEntries,
    resolve: {
        root: [
            path.resolve(__dirname, '..', 'node_modules'),
            path.resolve(__dirname, '..', 'bower_components')
        ],
        alias: {
            // src别名,避免拼接glob返回值，如果出现冲突(如某模块包含src路径)修改这里
            src: path.resolve(__dirname, '..', 'src'),
            // 模板路径
            view: path.resolve(__dirname, '..', 'src', 'view'),
            // for 老古董ejs
            ejs: 'ejs/ejs.js'
        }
    },
    output: {
        publicPath: 'ai_dist',
        // 放入已包含时间戳的路径
        path: path.join(__dirname, '..', 'asset'),
        // TODO 添加时间戳路径,附带回滚机制
        filename: 'js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'less-loader')
            },
            {
                // 模板拼接用
                test: /\.html$/,
                loader: 'html-loader',
                query: {
                    attrs: false,
                    minimize: false
                }
            }
        ]
    },
    plugins: [
        // 提取通用部分
        new CommonsChunkPlugin({
            name: ['common.bundle'],
            filename: '[name].js'
        }),
        ...htmlWebpackPluginArr,
        // css文件单独打包
        new ExtractTextPlugin('css/[name].css')
    ]
};
