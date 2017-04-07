/**
 * @file video router
 * @author FranckChen(chenfan02@baidu.com)
 */

/* eslint-disable */
const router = require('express').Router();
/* enlint-enable */

const renderSmarty = require('../util/renderSmarty');
const getMockData = require('../util/getMockData');

router.get('/net-picture', (req, res, next) => {
    renderSmarty(
        'technology/net-picture.tpl',
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
