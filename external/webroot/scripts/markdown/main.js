/**
 * @file 百度大脑markdown编译入口
 * @author FranckChen(chenfan02@baidu.com)
 */

// 原生
const path = require('path');

// 第三方
const fs = require('fs-extra');
const cheerio = require('cheerio');
const handlebars = require('handlebars');

// lib
const parseMdConfig = require('./lib/parseCategory');
const compileMd = require('./lib/compileMd');
const encodeImage = require('./lib/encodeImage');
const compileTpl = require('./lib/compileTpl');

const readMdFile = mdFiles => {
    const promiseArr = [];

    for (let filePath of mdFiles) {
        promiseArr.push(
            new Promise((resolve, reject) => {
                fs.readFile(
                    filePath,
                    (err, data) => {
                        if (err) {
                            reject(`无法找到md文件 -- ${filePath}\r\n`);

                            return;
                        }

                        resolve({
                            filePath,
                            content: data.toString()
                        });
                    }
                );
            })
        );
    }

    return Promise.all(promiseArr);
};

const saveJson = htmlData => {
    return Promise.all(
        htmlData.map(({fileName, content}) => new Promise((resolve, reject) => {
            fs.outputJson(
                path.join(__dirname, '..', '..', 'data', `${fileName}.json`),
                content,
                err => {
                    if (err) {
                        reject(`无法保存md编辑结果 -- ${fileName}.json\r`);
                    }

                    resolve();
                }
            );
        }))
    );
};

parseMdConfig()
    .then(readMdFile)
    .then(compileMd)
    .then(encodeImage)
    .then(compileTpl)
    .then(saveJson)
    .catch(
        err => {
            console.log(err);
        }
    );
