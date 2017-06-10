/**
 * @file md编译函数
 * @author FranckChen(chenfan02@baidu.com)
 */

const path = require('path');

const marked = require('marked');
const htmlMinify = require('html-minifier').minify;

const AIMDRenderer = require('./AiMDRenderer');

module.exports = mdDataArr => {
    return Promise.all(
        mdDataArr.map(({filePath, content}) => new Promise((resolve, reject) => {
            // 提取文件名
            const fileName = path.parse(filePath).name;

            const renderer = new AIMDRenderer(fileName);

            marked(
                content,
                {
                    renderer
                },
                (err, tpl) => {
                    if (err) {
                        reject();

                        return;
                    }

                    resolve({
                        fileName,
                        tpl,
                        headings: renderer._getHeadings(),
                        imageData: renderer._getImages()
                    });
                }
            );
        }))
    );
};
