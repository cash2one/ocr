/**
 * @file 编译handlebars模板并压缩生成的html
 * @author FranckChen(chenfan02@baidu.com)
 */

const fs = require('fs');
const path = require('path');

const handlebars = require('handlebars');
const htmlMinify = require('html-minifier').minify;

// 注册partial
handlebars.registerPartial(
    'image',
    fs.readFileSync(path.join(__dirname, 'partials', 'image.hbs')).toString()
);
// 生成实例代码块的helper
handlebars.registerHelper('codeTab', require('./codeTab'));

module.exports = function (data) {
    return Promise.all(
        data.map(({fileName, tpl, headings, imageData}) =>
            new Promise((resolve, reject) => {
                // 代码地址标识转handlebars helper
                tpl = tpl.replace(/<p>{%(.*)%}<\/p>/g, (match, codeDirPath) => {
                    return `{{{codeTab "${codeDirPath.trim()}"}}}`;
                });

                // 编译handlebars
                const compiledTpl = handlebars.compile(tpl);
                const html = compiledTpl({imageData});

                resolve({
                    fileName,
                    content: {
                        html: htmlMinify(
                            html,
                            {
                                collapseWhitespace: true
                            }
                        ),
                        headings
                    }
                });
            })
        )
    );
};
