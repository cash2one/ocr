/**
 * @file face router
 * @author FranckChen(chenfan02@baidu.com)
 */

/* eslint-disable */
const router = require('express').Router();
/* enlint-enable */

const renderSmarty = require('../util/renderSmarty');
const getMockData = require('../util/getMockData');

router.get('/nlp', (req, res, next) => {
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

router.get('/speech', (req, res, next) => {
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

router.get('/video', (req, res, next) => {
    renderSmarty(
        'secondary/video.tpl',
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

router.get('/imagecensoring', (req, res, next) => {
    renderSmarty(
        'secondary/imagecensor.tpl',
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

module.exports = router;
