/**
 * @file 本地开发模拟环境server,方便脱离php，随时本地看效果
 * @author Franck Chen(chenfan02@baidu.com)
 */

const path = require('path');
const fs = require('fs');

const express = require('express');

const renderSmarty = require('./util/renderSmarty');
const getMockData = require('./util/getMockData');

const app = express();
const port = 8088;

app.use(
    '/ai_dist',
    express.static(path.join(__dirname, '..', 'dist'))
);

// 文档
app.use(
    '/data',
    express.static(path.join(__dirname, '..', 'data'))
);

app.get('/docs', (req, res, next) => {
    renderSmarty(
        'newDocument/newDocument.tpl',
        getMockData({
            cf: 'chenfan'
        })
    ).then(
        content => {
            res
                .type('html')
                .end(content);
        },
        next
    );
});

app.get('/video/vca', (req, res, next) => {
    renderSmarty(
        'technology/video-vca.tpl',
        getMockData()
    ).then(
        content => {
            res
                .type('html')
                .end(content);
        },
        next
    );
});

app.get('/video/cover', (req, res, next) => {
    renderSmarty(
        'technology/video-cover.tpl',
        getMockData()
    ).then(
        content => {
            res
                .type('html')
                .end(content);
        },
        next
    );
});

app.listen(port, () => {
    console.log('访问本地' + port + ',即可即时查看效果，enjoy it');
});
