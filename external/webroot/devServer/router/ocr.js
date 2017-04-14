/**
 * @file video router
 * @author FranckChen(chenfan02@baidu.com)
 */

/* eslint-disable */
const router = require('express').Router();
/* enlint-enable */

const renderSmarty = require('../util/renderSmarty');
const getMockData = require('../util/getMockData');

router.get('/general', (req, res, next) => {
    renderSmarty(
        'technology/ocr-general.tpl',
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

router.get('/general_enhanced', (req, res, next) => {
    renderSmarty(
        'technology/ocr-general_enhanced.tpl',
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

router.get('/general_location', (req, res, next) => {
    renderSmarty(
        'technology/ocr-general_location.tpl',
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

router.get('/idcard', (req, res, next) => {
    renderSmarty(
        'technology/ocr-idcard.tpl',
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

router.get('/bankcard', (req, res, next) => {
    renderSmarty(
        'technology/ocr-bankcard.tpl',
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

router.get('/webimage', (req, res, next) => {
    renderSmarty(
        'technology/ocr-webimage.tpl',
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