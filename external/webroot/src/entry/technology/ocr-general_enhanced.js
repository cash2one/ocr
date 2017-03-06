/**
 * @file ocr-生僻字识别脚本入口
 * @author chenweiwei01@baidu.com
 *         FranckChen(chenfan02@baidu.com)
 */

import $ from 'jquery';
import throttle from 'lodash.throttle';

import '../common/tech-case';
import '../../less/technology/ocr-general_enhanced.less';
import getBase64ByFileReader from '../util/getBase64ByFileReader';

/* eslint-disable */
const formatImg = require('../../../ai_images/error/image-format.png');
const tooLargeImg = require('../../../ai_images/error/too-large.png');
const noResult = require('../../../ai_images/error/no-general-result.png');
const timeoutImg = require('../../../ai_images/error/timeout.png');
// fixme 很不合理
const demoImagePaths = [
    // 静态引入，不要尝试些变量！
    require('../../../ai_images/technology/ocr-general_enhanced/demo-card-1.png'),
    require('../../../ai_images/technology/ocr-general_enhanced/demo-card-2.png'),
    require('../../../ai_images/technology/ocr-general_enhanced/demo-card-3.png'),
    require('../../../ai_images/technology/ocr-general_enhanced/demo-card-4.png'),
    require('../../../ai_images/technology/ocr-general_enhanced/demo-card-5.png'),
    require('../../../ai_images/technology/ocr-general_enhanced/demo-card-6.png'),
    require('../../../ai_images/technology/ocr-general_enhanced/demo-card-7.png'),
    require('../../../ai_images/technology/ocr-general_enhanced/demo-card-8.png')
];
/* eslint-enable */

const $window = $(window);
const $document = $(document);
// Demo实例图片
const $techDemoSelect = $('.tech-demo-card-item');
// 结果json展示容器
const $jsonViewer = $('#demo-json').find('> p');
// 识别结果容器
const $demoResult = $('#demo-result');
const $fileUpload = $('#img-upload');
// 检查按键(点击后扫描url中的图片)
const $scanUrlBtn = $('#scan-url');
// 使用url上传图片
const $scanPhotoUrl = $('#demo-photo-url');

// 常量
const FILE_TYPE_ERROR = 1;
const FILE_OVER_SIZE = 2;

let isScanning = false;

$window.on(
    'scroll.demo',
    throttle(
        () => {
            if ($document.scrollTop() >= 100) {
                playDemo();

                $window.off('.demo');
            }
        },
        300
    )
);

// 功能介绍动画
const playDemo = () => {
    const $techFunctionDemoOrigin = $('.tech-function-original-card');
    const $techFunctionDemoResult = $('.tech-function-scan-result');

    $techFunctionDemoOrigin.addClass('tech-function-scanning');

    setTimeout(
        () => {
            $techFunctionDemoOrigin
                .removeClass('tech-function-scanning')
                .addClass('tech-function-scanned');
            $techFunctionDemoResult
                .addClass('tech-function-scanned');
        },
        3000
    );
};

/**
 * 填充JSON预览内容
 *
 * @param {string=} text 内容
 */
const setJsonViewer = (text = '') => {
    $jsonViewer.text(text);
};

// 显示demo图片
const showImage = imgUrl => {
    const demoOrigin = $('#demo-origin');

    demoOrigin.html(`<img class="tech-demo-origin-img" src="${imgUrl}">`);
};

const showLoading = () => {
    $demoResult.html('<div id="result-loading"></div>');
};

/**
 * 展示识别结果
 *
 * @param {Object=} data 文字识别接口返回的数据
 */
const showResult = data => {
    if (!data) {
        $demoResult.html('');

        return;
    }

    const wordsResult = data.words_result || [];

    const htmlArr = [];

    for (let i = 0, len = wordsResult.length; i < len; i++) {
        const record = wordsResult[i];
        const location = record.location;

        const template = [
            '<tr>',
            `    <td>${i + 1}</td>`,
            `    <td>${record.words}</td>`,
            `    <td>${location.left}</td>`,
            `    <td>${location.top}</td>`,
            `    <td>${location.width}</td>`,
            `    <td>${location.height}</td>`,
            '</tr>'
        ];

        htmlArr.push(template.join('\r'));
    }

    const tableHtml = htmlArr.length > 0
        ? [
            '<div id="json-table">',
            '<table cellspacing="0">',
            '    <thead>',
            '        <tr>',
            '            <th rowspan="2" style="width:20px;">编号</th>',
            '            <th colspan="5">识别结果</th>',
            '        </tr>',
            '        <tr>',
            '            <th style="width:250px;">文字</th>',
            '            <th>left</th>',
            '            <th>top</th>',
            '            <th>width</th>',
            '            <th>height</th>',
            '        </tr>',
            '    </thead>',
            `    <tbody>${htmlArr.join('\r')}</tbody>`,
            '</table>',
            '</div>'
        ].join('\r')
        : `<img src="${noResult}">`;

    $demoResult.html(tableHtml);
};

/**
 * 报告错误结果
 *
 * @param {number=} errno 错误码
 */
const showError = function (errno) {
    showResult();
    setJsonViewer('');

    if (!errno) {
        showImage(formatImg);

        return;
    }

    switch (errno) {
        // 图片格式错误
        case 104:
        case FILE_TYPE_ERROR:
            showImage(formatImg);

            return;
        case FILE_OVER_SIZE:
            showImage(tooLargeImg);

            return;
        // 接口超时
        // 上传失败
        case 107:
        case 28:
        default:
            showImage(timeoutImg);

            return;
    }
};

/**
 * 通过提交图片url的方式扫描生僻字
 *
 * @param {string} imageUrl 图片地址
 * @param {string=} base64 图片base64
 * @return {Promise}
 */
const scan = function (imageUrl, base64) {
    /* eslint-disable */
    const dfd = $.Deferred();
    /* eslint-enable */

    // 屏蔽扫面
    isScanning = true;

    showImage(imageUrl || base64);
    showLoading();
    setJsonViewer('');

    // 按键置灰
    $scanUrlBtn.prop('disabled', true);
    $fileUpload.prop('disabled', true);

    // 不能一次提供两个参数
    if (imageUrl && base64) {
        dfd.reject();
    }

    $.post(
        {
            url: '/aidemo',
            data: {
                'type': 'general_enhanced',
                'image': base64,
                'image_url': imageUrl
            }
        }
    ).then(
        ({errno, msg, data}) => {
            isScanning = false;

            $scanUrlBtn.prop('disabled', false);
            $fileUpload.prop('disabled', false);

            // 无误的情况下返回文字识别结果JSON
            if (errno === 0) {
                dfd.resolve(data);

                return;
            }

            dfd.reject(errno, msg);
        },
        () => {
            isScanning = false;

            $scanUrlBtn.prop('disabled', false);
            $fileUpload.prop('disabled', false);

            dfd.reject(28, '网络错误');
        }
    );

    return dfd.promise();
};

/**
 * 填充demo展示区，主要是2处内容 -- 核心数据、原始json返回
 *
 * @param {string=} JSONData JSON数据
 */
const showDemoResult = JSONData => {
    // 格式化JSON
    setJsonViewer(JSONData ? JSON.stringify(JSONData, null, '\t') : '');
    // 显示识别结果
    showResult(JSONData);
};

/**
 * 校验图片文件是否符合demo要求
 *
 * @param {File} file 文件
 * @return {Object}
 */
const validateImgFile = file => {
    const validMIMEType = [
        'image/jpeg', 'image/png', 'image/bmp'
    ];

    const {type, size} = file;

    if (validMIMEType.indexOf(type) < 0) {
        return {
            isValid: false,
            reason: FILE_TYPE_ERROR
        };
    }

    if (size > 2 * 1024 * 1024) {
        return {
            isValid: false,
            reason: FILE_OVER_SIZE
        };
    }

    return {
        isValid: true
    };
};

// fixme
$techDemoSelect.each((index, element) => {
    $(element).find('img').attr('src', demoImagePaths[index]);
});
// 实例图片点击点击
$techDemoSelect.on('click', e => {
    const $currentTarget = $(e.currentTarget);

    if ($currentTarget.hasClass('tech-demo-card-active') || isScanning) {
        return;
    }

    $currentTarget
        .addClass('tech-demo-card-active')
        .siblings()
        .removeClass('tech-demo-card-active');

    // TODO demo结构不合理
    const demoUrl = `${window.location.protocol}${$currentTarget.find('img').eq(0).attr('src')}`;

    scan(demoUrl)
        .then(
            data => {
                showDemoResult(data);
            },
            showError
        );
});

$scanUrlBtn.on(
    'click',
    () => {
        // 用户输入的url
        const demoUrl = $scanPhotoUrl.val().trim();

        if (!demoUrl) {
            return;
        }

        if (!/\.(jpe?g|png|gif|bmp)$/i.test(demoUrl)) {
            showError(FILE_TYPE_ERROR);

            return;
        }

        scan(demoUrl)
            .then(
                data => {
                    showDemoResult(data);
                },
                showError
            );
    }
);

// 用户上传图片时
$fileUpload.on('change', e => {
    if (!$(e.target).val()) {
        return;
    }

    const imgFile = e.target.files[0];

    // 上传前在本地校验图片
    const validateResult = validateImgFile(imgFile);

    if (!validateResult.isValid) {
        switch (validateResult.reason) {
            case FILE_TYPE_ERROR:
                showError(FILE_TYPE_ERROR);
                return;
            case FILE_OVER_SIZE:
                showError(FILE_OVER_SIZE);
                return;
        }
    }

    getBase64ByFileReader(imgFile)
        .then(
            base64 => {
                // TODO 没设计好,promise没串起来
                scan('', base64)
                    .then(
                        data => {
                            showDemoResult(data);
                        },
                        showError
                    );
            },
            showError
        );
});

// 页面加载后，分析第一张demo图片
const firstImg = $techDemoSelect.eq(0).find('img').attr('src');
scan(firstImg)
    .then(
        data => {
            showDemoResult(data);
        },
        showError
    );
