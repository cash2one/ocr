/**
 * @file 不同模块，可能有不同的头尾，所以写了这么个函数，来确定什么模块用什么头尾
 * @author FranckChen(chenfan02@baidu.com)
 */

const path = require('path');

module.exports = function (moduleName) {
    switch (moduleName) {
        case 'document/document':
            return path.resolve(__dirname, '..', '..', 'src', 'view', 'common', 'documentTpl.ejs');
        default:
            return path.resolve(__dirname, '..', '..', 'src', 'view', 'common', 'template.ejs');
    }
};
