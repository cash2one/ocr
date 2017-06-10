/**
 * @file 解析文档配置文件函数，返回文档文件具体地址
 * @author FranckChen(chenfan02@baidu.com)
 */

const path = require('path');

module.exports = function () {
    const mdNames = [];

    try {
        // 文档目录配置文件
        const categoryConfig = require('../category.json');

        // 递归遍历，解析目录树
        const extract = arr => {
            arr.forEach(element => {
                if (!element.children) {
                    mdNames.push(
                        path.join(__dirname, '..', '..', '..', 'md', `${element.md}.md`)
                    );
                }
                else {
                    extract(element.children);
                }
            });
        };

        // TODO 未来这里自动化，不需要手工添加
        // 获取全部新手文档
        extract(categoryConfig.beginnerDoc);

        // 获取全部技术文档
        extract(categoryConfig.techDoc);

        // 计费文档
        extract(categoryConfig.priceDoc);
    }
    catch (e) {
        return Promise.reject(e);
    }

    return Promise.resolve(mdNames);
};
