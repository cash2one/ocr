/**
 * @file 快速获取用于渲染页面的假数据的函数
 * @author FranckChen(chenfan02@baidu.com)
 */

const fs = require('fs');
const path = require('path');

const commonDataPath = path.resolve(__dirname, '..', '..', 'mock', 'common.json');

const defaultOption = {
    useCommon: true,
    data: {}
};

module.exports = function (opt = defaultOption) {
    opt = Object.assign(
        {},
        defaultOption,
        opt
    );

    if (opt.useCommon) {
        // 本地开发不考虑性能问题，所以使用同步读取
        const commonData = JSON.parse(fs.readFileSync(commonDataPath).toString());

        return Object.assign(
            {},
            commonData,
            opt.data
        );
    }

    return opt.data;
};
