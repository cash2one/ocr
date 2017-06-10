/**
 * @file aiDemo接口mock
 * @author FranckChen(chenfan02@baidu.com)
 */

/* eslint-disable */
const fs = require('fs');
const path = require('path');

const router = require('express').Router();
/* enlint-enable */

const bodyParser = require('body-parser');

router.post('/aiDemo', bodyParser.urlencoded(), (req, res, next) => {
    const body = req.body;
    const {action, type} = body;

    // action + type的组合，决定一个接口的行为，设计较差，目前基本都是这样子
    // 未来如果有扩充，修改这里
    let response;

    if (action) {
        // TODO 未来扩展
        switch(action) {
            case 'getHeader':
                response = 'getHeader';
        }
    }
    else {
        response = type;
    }

    if (!response) {
        next();
        return;
    }

    fs.readFile(
        path.join(__dirname, '..', 'mock', 'aiDemo', `${response}.json`),
        (err, data) => {
            // 基本上err是因为找不到这个文件
            if (err) {
                next();

                return;
            }

            res
                .type('json')
                .end(data.toString());
        }
    );
});

module.exports = router;
