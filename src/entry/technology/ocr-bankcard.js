/**
 * @file ocr-银行卡识别脚本入口
 * @author shiliang@baidu.com
 */

import $ from 'jquery';
import throttle from 'lodash.throttle';
import DemoCanvas from '../../component/widget/demoCanvas';
import {scanBankCard} from '../../model/demoAPI';

import 'less/technology/ocr-bankcard.less';

/* eslint-disable */
const demoImgPath = [
    require('../../../ai_images/technology/ocr-bankcard/demo-card-1.png'),
    require('../../../ai_images/technology/ocr-bankcard/demo-card-2.png'),
    require('../../../ai_images/technology/ocr-bankcard/demo-card-3.png'),
    require('../../../ai_images/technology/ocr-bankcard/demo-card-4.png'),
    require('../../../ai_images/technology/ocr-bankcard/demo-card-5.png'),
    require('../../../ai_images/technology/ocr-bankcard/demo-card-6.png')
];

import '!file-loader?name=./../../template/cloud/[name].html!extract-loader!html-loader!view/technology/ocr-bankcard.html';
/* eslint-enable */

// case点击效果
$('.case-indicator > li').click(function () {
    $('.case-indicator > li').each((i, e) => {
        $(e).toggleClass('active', i === $(this).index());
    });
    $('.case-item').each((i, e) => {
        $(e).toggleClass('active', i === $(this).index());
    });
});

// 触发功能介绍动画
$(window).scroll(
    throttle(
        () => {
            if ($(document).scrollTop() >= 100) {
                $('.tech-intro-detail').trigger('demo');
            }
        },
        300
    )
);

// 绑定功能介绍动画
$('.tech-intro-detail').one('demo', function () {
    $('.original-card').addClass('scanning');
    setTimeout(function () {
        $('.original-card').removeClass('scanning').addClass('scanned');
        $('.scan-result').addClass('scanned');
    }, 3000);
});

let isScanning = false;

const $resultBg = $('#demo-result').find('.result-background');
const $issuingBank = $('#issuing-bank');
const $cardType = $('#card-type');
const $demoJson = $('#demo-json > p');

// 线上demo开始
let resetDemo = () => {
    $demoJson.empty();
    $('#demo-photo-upload > input').val('');
    $resultBg.attr('class', 'result-background');
    $('#demo-photo-upload, #scan-photo').removeClass('disabled');
    isScanning = false;
};

let startScan = function (type, imgSrc, url) {
    $demoJson.empty();
    $resultBg.attr('class', 'result-background loading');

    let options = {
        success(res) {
            $('#demo-photo-upload, #scan-photo').removeClass('disabled');
            $demoJson.html(JSON.stringify(res, null, '\t'));
            $resultBg.removeClass('loading');

            if (res.errno !== 0) {
                $resultBg.toggleClass('has-result man female', false)
                    .toggleClass('error-upload-fail', res.errno === 107)
                    .toggleClass('error-timeout', res.errno === 28)
                    .toggleClass('error-no-result', res.errno === 216631 || res.errno === 216630)
                    .toggleClass('error-image-format', res.errno === 106);
                isScanning = false;

                return false;
            }

            let hasNoResult = !res.data.result.bank_card_number;

            const result = res.data.result;
            // 填写银行卡号, 发卡行，卡类型
            $resultBg.find('.bank-card-num').html(result.bank_card_number);
            $issuingBank.text(result.bank_name ? `发卡行：${result.bank_name}` : '');
            switch (result.bank_card_type) {
                case 1:
                    $cardType.text('借记卡');
                    break;
                case 2:
                    $cardType.text('信用卡');
                    break;
                case 0:
                default:
                    $cardType.text('');
            }

            $resultBg.toggleClass('has-result', !hasNoResult)
                .toggleClass('error-no-result', hasNoResult);
            isScanning = false;
        },
        fail(xhr) {
            resetDemo();
            $demoJson.html('接口发生错误：' + xhr.status + ' - ' + xhr.statusText);
        }
    };
    if (type === 'url') {
        options.imageUrl = url;
    }
    else if (type === 'stream') {
        options.image = imgSrc;
    }

    scanBankCard(options);
};

// 上传图片
$('#demo-photo-upload  > input').change(function (e) {
    if ($(this).val() === '') {
        return false;
    }
    if (isScanning) {
        $demoJson.html('操作正在进行中，请稍候再试！');
        return;
    }
    isScanning = true;
    $('#demo-photo-upload, #scan-photo').addClass('disabled');
    let file = $(this)[0].files[0];
    new DemoCanvas({
        selector: '#demo-origin',
        image: file,
        type: 'stream',
        success(imgSrc) {
            $('#demo-photo-upload > input').val('');
            startScan('stream', imgSrc);
        },
        fail: resetDemo
    });
});

// demo 检测输入框事件绑定
$('#demo-photo-url').change(function () {
    $('.demo-card-list > li').removeClass('active');
});

// 检测按钮事件
$('#scan-photo').click(function () {
    if (isScanning) {
        $demoJson.html('操作正在进行中，请稍候再试！');
        return;

    }
    if ($(this).hasClass('disabled') || !$('#demo-photo-url').val()) {
        return false;
    }
    isScanning = true;
    $('#demo-photo-upload, #scan-photo').addClass('disabled');
    let url = $('#demo-photo-url').val();
    new DemoCanvas({
        selector: '#demo-origin',
        image: url,
        type: 'url',
        apiType: 'bankcard',
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

const $demoCardList = $('.demo-card-list > li');
$demoCardList.each(function (index, item) {
    $(item)
        .find('img')
        .attr('src', `${demoImgPath[index]}`);
});

// 绑定实例图点击事件
$demoCardList.click(function () {
    if (isScanning) {
        $demoJson.html('操作正在进行中，请稍候再试！');
        return;
    }

    isScanning = true;

    $('.demo-card-list > li').removeClass('active');
    $(this).addClass('active');

    let url = `${window.location.protocol}${$(this).find('img').attr('src')}`;
    $('#demo-photo-upload, #scan-photo').addClass('disabled');

    new DemoCanvas({
        selector: '#demo-origin',
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
$('.demo-card-list > li')[0].click();
