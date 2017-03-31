/**
 * @file 爬取图片，并对图片进行base64编码
 * @author FranckChen(chenfan02@baidu.com)
 */

const request = require('request');

module.exports = function (compiledData) {
    // TODO promise嵌套有点深啊, 自己都有点看不懂
    return Promise.all(
        compiledData.map(
            ({fileName, tpl, headings, imageData}) => new Promise((resolve, reject) => {
                // 爬取全部图片
                Promise
                    .all(imageData.map(img => new Promise((resolve, reject) => {
                        request
                            .get(img.href)
                            .on(
                                'response',
                                response => {
                                    let data = '';
                                    response.setEncoding('binary');

                                    response.on('data', chunk => {
                                        data += chunk;
                                    });

                                    response.on('end', () => {
                                        resolve(
                                            Object.assign(
                                                {},
                                                img,
                                                {
                                                    contentType: response.headers['content-type'],
                                                    href: Buffer
                                                        .from(data, 'binary')
                                                        .toString('base64')
                                                }
                                            )
                                        );
                                    });
                                }
                            );
                    })))
                    .then(
                        imageData => {
                            resolve({
                                fileName,
                                tpl,
                                headings,
                                // 注意作用域，这里替换了图片信息
                                imageData
                            });
                        },
                        reject
                    );
            })
        )
    );
};
