/**
 * @file 色情识别脚本入口
 * @author shiliang@baidu.com
 */

import $ from 'jquery';
import throttle from 'lodash.throttle';
import DemoCanvas from '../../component/widget/demoCanvas';
import {scanTerrorgraphy} from '../../model/demoAPI';
import AlertModal from '../../component/widget/alertModal';


/* eslint-disable */
import '!file-loader?name=./../../template/cloud/[name].html!extract-loader!html-loader!view/technology/antiterror.html';
/* eslint-enable */
import '../../less/technology/antiterror.less';

// 绑定功能介绍动画
const functionDetail = $('.tech-function-detail');
// demo canvas
const canvasContainer = $('#demo-result .canvas-container');
// RESPONSE JSON
const demoJsonData = $('.demo-json-data');
// 本地上传
const photoUploadInput = $('.photo-upload-input');
// demo点击图片
const cardListItem = $('.card-list-item');
// 检测按钮
const scanPhoto = $('#scan-photo');
// 输入图片url
const demoPhotoUrl = $('#demo-photo-url');


const demoImagePaths = [
    require('../../../ai_images/technology/antiterror/demo-card-1.jpg'),
    require('../../../ai_images/technology/antiterror/demo-card-2.jpg'),
    require('../../../ai_images/technology/antiterror/demo-card-3.jpg'),
    require('../../../ai_images/technology/antiterror/demo-card-4.jpg'),
    require('../../../ai_images/technology/antiterror/demo-card-5.jpg'),
    require('../../../ai_images/technology/antiterror/demo-card-6.jpg'),
    require('../../../ai_images/technology/antiterror/demo-card-7.jpg'),
    require('../../../ai_images/technology/antiterror/demo-card-8.jpg')
];


// 触发功能介绍动画
$(window).scroll(
    throttle(
        () => {
            if ($(document).scrollTop() >= 100) {
                functionDetail.trigger('demo');
            }
        },
        300
    )
);

// 绑定功能介绍动画
functionDetail.one('demo', function () {
    functionDetail.find('>.scan-box').addClass('scanned');
});

// 线上demo开始
let isScanning = false;

// 重置demo相关dom
let resetDemo = () => {
    isScanning = false;
    demoJsonData.empty();
    photoUploadInput.val('');
    canvasContainer.attr('class', 'canvas-container');
    scanPhoto.removeClass('disabled');
};

let startScan = function (type, imgSrc, url) {
    demoJsonData.empty();
    canvasContainer.attr('class', 'canvas-container loading');
    $('#face-details').hide().empty();

    let options = {
        // 成功回调
        success(res) {
            scanPhoto.removeClass('disabled');
            demoJsonData.html(JSON.stringify(res, null, '\t'));
            canvasContainer.removeClass('loading');

            if (res.errno !== 0) {
                canvasContainer
                    .toggleClass('error-upload-fail', res.errno === 107)
                    .toggleClass('error-timeout', res.errno === 28)
                    .toggleClass('error-image-format', res.errno === 106);
                canvasContainer.empty();
                canvasContainer.toggleClass(
                    'error-no-result', !res.data
                );
                isScanning = false;
                if ([106, 107, 28, 0].indexOf(res.errno) === -1) {
                    new AlertModal(res.msg);
                }
                return false;
            }

            canvasContainer.toggleClass('has-result', res.msg === 'success');
            // canvasContainer.toggleClass('has-result', res.data.result_num >= 1);
            // let activeResult = null;
            // for (let i = 0, len = res.data.result.length; i < len; i++) {
            //     let record = res.data.result[i];
            //     if (!activeResult || record.probability > activeResult.probability) {
            //         activeResult = record;
            //     }
            // }
            const judgeGrade = res.data.result.toFixed(4);
            canvasContainer
                .attr('data-probability', judgeGrade * 100)
                .toggleClass('normal', judgeGrade < 0.5)
                .toggleClass('terror', judgeGrade >= 0.5);

            isScanning = false;
        },
        // 失败回调
        fail(xhr) {
            new AlertModal('接口发生错误：' + xhr.status + ' - ' + xhr.statusText);
            resetDemo();
        }
    };
    if (type === 'url') {
        options.imageUrl = url;
    }
    else if (type === 'stream') {
        options.image = imgSrc;
    }

    scanTerrorgraphy(options);
};



// 上传图片
photoUploadInput.change(function (e) {
    if ($(this).val() === '') {
        return false;
    }
    if (isScanning) {
        new AlertModal('操作正在进行中，请稍候再试！');
        return;
    }
    isScanning = true;
    scanPhoto.addClass('disabled');
    let file = $(this)[0].files[0];
    new DemoCanvas({
        selector: '#demo-result .canvas-container',
        image: file,
        type: 'stream',
        lazyRender: true,
        success(imgSrc) {
            photoUploadInput.val('');
            startScan('stream', imgSrc);
        },
        fail: resetDemo
    });
});

// demo 检测输入框事件绑定
demoPhotoUrl.change(function () {
    cardListItem.removeClass('active');
});

// 检测按钮事件
scanPhoto.click(function () {
    if (isScanning) {
        new AlertModal('操作正在进行中，请稍候再试！');
        return;
    }
    if ($(this).hasClass('disabled') || !demoPhotoUrl.val()) {
        return false;
    }
    isScanning = true;
    scanPhoto.addClass('disabled');
    let url = demoPhotoUrl.val();
    new DemoCanvas({
        selector: '#demo-result .canvas-container',
        image: url,
        type: 'url',
        apiType: 'terror',
        success(imgSrc) {
            startScan('url', imgSrc, url);
        },
        fail: resetDemo
    });
});

// 阻止多次上传
$('#demo-photo-upload').click(function () {
    if ($(this).hasClass('disabled')) {
        return false;
    }
});

// const $demoImgContainer = cardListItem;

cardListItem.each(function (index, item) {
    $(item)
        .find('img')
        .attr('src', `${demoImagePaths[index]}`);
});

// 绑定实例图点击事件
cardListItem.click(function () {
    if (isScanning) {
        new AlertModal('操作正在进行中，请稍候再试！');
        return;
    }
    isScanning = true;
    cardListItem.removeClass('active');
    $(this).addClass('active');
    let url = `${window.location.protocol}${$(this).find('img').attr('src')}`;
    scanPhoto.addClass('disabled');
    new DemoCanvas({
        selector: '#demo-result .canvas-container',
        image: url,
        type: 'url',
        toCheck: false,
        success(imgSrc) {
            startScan('url', imgSrc, url);
        },
        fail: resetDemo
    });
});

// 触发初始化效果
cardListItem[0].click();

