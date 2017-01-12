/**
 * @file 百度大脑首页版本号获取函数
 * @author Franck Chen(chenfan02@baidu.com)
 */

/* eslint-disable */
// 原生
const path = require('path');
const fs = require('fs');

// 第三方
const argv = require('minimist')(process.argv.slice(2));
const moment = require('moment');

// 版本记录文件
const versionFilePath = '../../version.json';

// 版本配置文件
const versionConfig = require(versionFilePath);
/* eslint-enable */

// 是否是需要建立新版本号的构建
const isNewVersionBuild = argv.hasOwnProperty('new');

const generateNewVersionData = () => {
    const now = moment();

    return {
        timeStamp: now.unix(),
        date: now.format('YYYY-MM-DD')
    };
};

module.exports = function () {
    // 如果是新版本号构建，则生成新版本号时间戳
    if (isNewVersionBuild) {
        let newVersionConfig = Object.assign(
            {},
            versionConfig,
            {
                // 上个版本
                previousVersion: versionConfig.currentVersion || {},
                // 上上个版本
                versionBeforePrevious: versionConfig.previousVersion || {}
            }
        );

        // 生成新版本信息
        newVersionConfig.currentVersion = generateNewVersionData();

        // 记录版本
        fs.writeFileSync(
            versionFilePath,
            JSON.stringify(newVersionConfig)
        );

        return newVersionConfig.currentVersion.timeStamp;
    }

    // 如果版本信息丢失，则不上
    if (!versionConfig.currentVersion) {
        versionConfig.currentVersion = generateNewVersionData();

        fs.writeFileSync(
            versionFilePath,
            JSON.stringify(versionConfig)
        );
    }

    return versionConfig.currentVersion.timeStamp;
};
