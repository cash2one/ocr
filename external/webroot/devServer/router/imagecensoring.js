/**
 * @file face router
 * @author FranckChen(chenfan02@baidu.com)
 */

/* eslint-disable */
const router = require('express').Router();
/* enlint-enable */

const renderSmarty = require('../util/renderSmarty');
const getMockData = require('../util/getMockData');

router.get('/antiterror', (req, res, next) => {
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
router.get('/antiporn', (req, res, next) => {
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

module.exports = router;
