/**
 * @file 本地开发模拟环境server,方便脱离php，随时本地看效果
 * @author Franck Chen(chenfan02@baidu.com)
 */

var path = require('path');

var express = require('express');
var app = express();

var port = 8088;

app.use(
    '/html',
    express.static(path.join(__dirname, 'dist', 'html'))
);

app.use(
    '/images',
    express.static(path.join(__dirname, 'images'))
);

app.use(
    '/dist/css',
    express.static(path.join(__dirname, 'dist', 'css'))
);

app.use(
    '/dist/js',
    express.static(path.join(__dirname, 'dist', 'js'))
);

app.listen(port, function () {
    console.log('访问本地' + port + ',即可即时查看效果，enjoy it');
});
