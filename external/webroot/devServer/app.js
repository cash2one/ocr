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

app.get('/', (req, res, next) => {
    renderSmarty(
        'home.tpl',
        getMockData({})
    ).then(
        content => {
            res
                .type('html')
                .end(content);
        },
        next
    );
});

app.get('/docs', (req, res, next) => {
    renderSmarty(
        'newDocument/newDocument.tpl',
        getMockData({})
    ).then(
        content => {
            res
                .type('html')
                .end(content);
        },
        next
    );
});

// 挂载router
app.use('/tech/nlp', require('./router/nlp'));
app.use('/tech/video', require('./router/video'));
app.use('/tech/face', require('./router/face'));
app.use('/tech/ocr', require('./router/ocr'));

app.get('/tech/speech', (req, res, next) => {
    renderSmarty(
        'secondary/speech.tpl',
        getMockData({})
    ).then(
        content => {
            res
                .type('html')
                .end(content);
        },
        next
    );
});

app.get('/tech/nlp', (req, res, next) => {
    renderSmarty(
        'secondary/nlp.tpl',
        getMockData({})
    ).then(
        content => {
            res
                .type('html')
                .end(content);
        },
        next
    );
});

app.get('/tech/antiterror', (req, res, next) => {
    renderSmarty(
        'technology/antiterror.tpl',
        getMockData({})
    ).then(
        content => {
            res
                .type('html')
                .end(content);
        },
        next
    );
});

app.get('/tech/antiporn', (req, res, next) => {
    renderSmarty(
        'technology/antiporn.tpl',
        getMockData({})
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
