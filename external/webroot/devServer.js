/**
 * @file 本地开发模拟环境server,方便脱离php，随时本地看效果
 * @author Franck Chen(chenfan02@baidu.com)
 */

var path = require('path');
var fs = require('fs');

var express = require('express');
var app = express();

var port = 8088;

app.use(
    '/ai_images',
    express.static(path.join(__dirname, 'ai_images'))
);

app.use(
    '/ai_dist/css',
    express.static(path.join(__dirname, 'dist', 'css'))
);

app.use(
    '/ai_dist/js',
    express.static(path.join(__dirname, 'dist', 'js'))
);

app.get('/html/*', function (req, res, next) {
    var relativePath = path.relative('/html', req.path);

    fs.readFile(
        path.join(__dirname, '..', 'template', 'brain', 'platform', relativePath),
        function (err, data) {
            if (err) {
                next();
                return;
            }

            res
                .type('html')
                .end(data);
        }
    );
});

app.listen(port, function () {
    console.log('访问本地' + port + ',即可即时查看效果，enjoy it');
});
