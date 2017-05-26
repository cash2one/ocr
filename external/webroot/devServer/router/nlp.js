/**
 * @file nlp router
 * @author FranckChen(chenfan02@baidu.com)
 */

/* eslint-disable */
const router = require('express').Router();
/* enlint-enable */

const renderSmarty = require('../util/renderSmarty');
const getMockData = require('../util/getMockData');

router.get('/lexical', (req, res, next) => {
    renderSmarty(
        'technology/nlp-lexical.tpl',
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

router.get('/sentiment_classify', (req, res, next) => {
    renderSmarty(
        'technology/nlp-sentiment_classify.tpl',
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

router.get('/word_emb_sim', (req, res, next) => {
    renderSmarty(
        'technology/nlp-word_emb_sim.tpl',
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
