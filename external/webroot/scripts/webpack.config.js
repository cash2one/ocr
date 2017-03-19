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
const argv = require('minimist')(process.argv.slice(2));

// webpack plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

// postcss
const autoprefixer = require('autoprefixer');

const getVersion = require('./lib/getVersion');
/* eslint-enable */

// 判断是开发构建还是测试构建
const isOnlineBuild = argv.hasOwnProperty('o')
    || argv.hasOwnProperty('online')
    || argv.hasOwnProperty('new');

// 关键参数
const publicPath = isOnlineBuild
    ? '//ai.bdstatic.com/dist/'
    : '/ai_dist/';

// 获取版本号
const versionPath = getVersion();

// glob选项
const globConfig = {
    cwd: path.join(__dirname, '..', 'src', 'entry'),
    ignore: [
        '**/pager.js', '**/base.js',
        '**/common/*.js', '**/util/*.js'
    ]
};

const moduleName = argv['module'];

let entries = [];
if (!moduleName) {
    entries = glob.sync(
        '**/*.js',
        globConfig
    );
}
else {
    entries = glob.sync(
        `**/${moduleName}.js`,
        globConfig
    );

    if (entries.length === 0) {
        console.log(`未找到名为${moduleName}的模块`);
        process.exit();
    }
}

// 移除文件扩展名
const removeExtension = function (filename) {
    return filename.substr(0, filename.lastIndexOf('.') || filename);
};

// 样式独立打包
const extractLESS = new ExtractTextPlugin(`${versionPath}/css/[name].style.css`);

// 生成符合webpack规则的entries
const webpackEntries = {};
// 一个文件一个html页面
const htmlWebpackPluginArr = [];
// 需要抽取通用代码普通模块
const normalModules = [];
entries.forEach(entry => {
    const resourcePath = removeExtension(entry);

    // 去除文件后缀，资源入数组，防止entry引用entry
    webpackEntries[resourcePath] = ['./' + path.join('src', 'entry', entry)];
    // less不需要在js中引入，最大程度减少破坏js,补充style是为了保证不和js入口名字冲突
    // webpackEntries[`${resourcePath}.style`] = ['./' + path.join('src', 'less', `${resourcePath}.less`)];

    // 逐一添加plugin，生成html入口
    htmlWebpackPluginArr.push(
        new HtmlWebpackPlugin({
            // 我们的代码比较特殊，所以这里改为定制化插入，比如ie9 polyfill
            inject: false,
            // 一次只能生成一个html文件...
            filename: path.join('..', '..', 'template', 'brain', 'platform', `${resourcePath}.tpl`),
            // 一个html直包含对应chunk，这样能为每个entry自定义模板
            // ie9 polyfill位置比较特殊，需要定制化
            chunks: [
                'ie9', 'base',
                'common.bundle', resourcePath, `${resourcePath}.style`
            ],
            chunksSortMode: 'dependency',
            // 模板
            template: path.resolve(__dirname, '..', 'src', 'view', 'common', 'template.ejs'),
            // 以下是自定义属性, 注意这里不要补充后缀，后缀留在模板里，避免动态引入，无法使用html-loader
            mainContent: resourcePath,
            // 这个页面需要用到的css和js
            jsCommonBundle: `${publicPath}${versionPath}\/js\/common.bundle.js`,
            cssFile: `${publicPath}${versionPath}\/css\/${resourcePath}.style.css`,
            jsFile: `${publicPath}${versionPath}\/js\/${resourcePath}.js`
        })
    );

    // 填充需要提取通用代码的模块
    normalModules.push(resourcePath);
});

// jQuery和通用代码单独打包
webpackEntries['common.bundle'] = ['jquery', 'src/entry/base.js'];
// 两个单独引入的css，目前没有想好如何处理
webpackEntries.base = ['src/less/base.less'];
webpackEntries.ie9 = ['src/less/ie9.less'];

module.exports = {
    // 注意基准路径是webroot
    context: path.resolve(__dirname, '..'),
    entry: webpackEntries,
    resolve: {
        modules: [
            path.resolve(__dirname, '..', 'node_modules')
        ],
        alias: {
            src: path.resolve(__dirname, '..', 'src'),
            // 模板路径
            view: path.resolve(__dirname, '..', 'src', 'view'),
            // less快捷路径
            less: path.resolve(__dirname, '..', 'src', 'less'),
            // 模板partials
            partials: path.resolve(__dirname, '..', 'src', 'partials'),
            // for 老古董ejs
            ejs: 'ejs/ejs.js'
        }
    },
    output: {
        publicPath,
        // 放入已包含时间戳的路径
        path: path.join(__dirname, '..', 'dist'),
        // TODO 添加时间戳路径,附带回滚机制
        filename: `${versionPath}/js/[name].js`,
        // 优化jsonp函数名
        jsonpFunction: 'duAI'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: extractLESS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        'postcss-loader',
                        'less-loader'
                    ]
                })
            },
            {
                // 模板拼接，通用资源替换
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // external路径下的view文件夹
                            name: '../../view/[name].html'
                        }
                    },
                    'extract-loader',
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                            // 修改图片、视频缓存路径
                            attrs: ['img:src', 'video:src']
                        }
                    }
                ]
            },
            {
                // icon转换base64
                test: /sprite|icons(\/|\\).+\.(jpe?g|png|gif)$/i,
                use: 'url-loader'
            },
            {
                // TODO，小icon分单独文件夹管理，base64打包入css，省去拼接雪碧图
                test: /\.(jpe?g|png|gif|mp4)$/i,
                exclude: /sprite|icons(\/|\\).+\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: `${versionPath}/[path][name].[ext]`,
                            publicPath
                        }
                    }
                ]
            },
            {
                // 不需要缓存的静态资源
                test: /\.ico$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            publicPath
                        }
                    }
                ]
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader'
            }
        ]
    },
    plugins: [
        // 通过插件注入环境变量，防止不同操作系统间命令行传入的差异性
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 提取通用部分
        new CommonsChunkPlugin({
            name: ['common.bundle'],
            filename: `${versionPath}/js/[name].js`,
            chunks: normalModules
        }),
        // ...htmlWebpackPluginArr,
        // css文件单独打包
        extractLESS
    ]
};
