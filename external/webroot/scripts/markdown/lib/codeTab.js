/**
 * @file 生成代码tab的helper
 * @author FranckChen(chenfan02@baidu.com)
 */

const path = require('path');

const fs = require('fs-extra');
const glob = require('glob');
const hljs = require('highlight.js');
const handlebars = require('handlebars');

const getLanguageName = require('./getLanguageName');
const codeTplRawTpl = fs.readFileSync(path.join(__dirname, 'partials', 'codeTab.hbs')).toString();
const tpl = handlebars.compile(codeTplRawTpl);

const codeExamplePath = path.resolve(__dirname, '..', '..', '..', 'md', 'codeExample');

module.exports = function (codeDirPath) {
    // 当前代码tab需要用的代码所在的路径
    const codeFileDir = path.join(codeExamplePath, codeDirPath, '*');

    const examplesPath = glob.sync(codeFileDir);

    // 未找到代码时提示并结束，不输出任何内容
    if (examplesPath.length <= 0) {
        console.log(`未在代码示例路径${codeFileDir}下找到任何代码`);

        return;
    }

    const codeData = [];

    for (let codePath of examplesPath) {
        // 根据文件后缀推测语言名
        const lanData = getLanguageName(path.parse(codePath).ext.replace('.', ''));

        if (!lanData.hljsLanName) {
            console.log(`无法获取文件 -- ${codePath}的语言类型，忽略编译`);

            continue;
        }

        // 实际代码
        const code = fs.readFileSync(codePath).toString();

        if (!code) {
            console.log(`读取文件 -- ${codePath}时发生错误，已忽略`);

            continue;
        }

        codeData.push({
            lanData,
            codeHTML: hljs.highlight(lanData.hljsLanName, code).value
        });

    }

    return tpl({
        codeData
    });
};
