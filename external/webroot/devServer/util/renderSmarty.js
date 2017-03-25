/**
 * @file 读取并渲染smarty模板
 * @author FranckChen(chenfan02@baidu.com)
 */

const path = require('path');
const fs = require('fs');

const Smarty = require('smarty.js');

// 项目模板存放的路径
const tplDir = path.resolve(__dirname, '..', '..', '..', 'template', 'brain', 'platform');

module.exports = function (viewPath, data = {}) {
    return new Promise((resolve, reject) => {
        const tplFile = path.join(tplDir, viewPath);

        fs.readFile(
            tplFile,
            {
                encoding: 'utf8'
            },
            (err, tplContent) => {
                if (err) {
                    reject(err);

                    return;
                }

                // 解析模板
                const compiled = new Smarty(tplContent.toString());

                // 填充数据
                resolve(compiled.fetch(data));
            }
        );
    });
};
