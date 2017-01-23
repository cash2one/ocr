/**
 * @file ocr-身份证识别脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';
import throttle from 'lodash.throttle';
import DemoCanvas from '../../component/widget/demoCanvas';
import {scanIDCard} from '../../model/demoAPI';
import AlertModal from '../../component/widget/alertModal';

import 'less/technology/ocr-idcard.less';

/* eslint-disable */
const demoImgPath = [
    require('../../../ai_images/technology/ocr-idcard/demo-card-1.png'),
    require('../../../ai_images/technology/ocr-idcard/demo-card-2.png'),
    require('../../../ai_images/technology/ocr-idcard/demo-card-3.png'),
    require('../../../ai_images/technology/ocr-idcard/demo-card-4.png'),
    require('../../../ai_images/technology/ocr-idcard/demo-card-5.png'),
    require('../../../ai_images/technology/ocr-idcard/demo-card-6.png')
];
/* eslint-enable */

$(document).ready(function () {
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

    // 线上demo开始
    let isScanning = false;
    let resetDemo = () => {
        $('#demo-json > p').empty();
        $('#demo-photo-upload  > input').val('');
        $('#demo-result .result-background').attr('class', 'result-background');
        $('#demo-photo-upload, #scan-photo').removeClass('disabled');
        isScanning = false;
    };

    const ID_CARD_KEY_MAP = {
        '住址': 'address',
        '公民身份号码': 'card-no',
        '出生': 'birthday',
        '民族': 'folk',
        '性别': 'gender',
        '姓名': 'name',
        '女': 'female',
        '男': 'male'
    };

    let startScan = function (type, imgSrc, url) {
        $('#demo-json > p').empty();
        $('#demo-result .result-background').attr('class', 'result-background loading');
        let options = {
            success(res) {
                $('#demo-photo-upload, #scan-photo').removeClass('disabled');
                $('#demo-json > p').html(JSON.stringify(res, null, '\t'));
                $('#demo-result .result-background').removeClass('loading');

                if (res.errno !== 0) {
                    $('#demo-result .result-background').toggleClass('has-result man female', false)
                        .toggleClass('error-upload-fail', res.errno === 107)
                        .toggleClass('error-timeout', res.errno === 28)
                        .toggleClass('error-image-format', res.errno === 106);
                    isScanning = false;
                    if ([106, 107, 28].indexOf(res.errno) === -1) {
                        new AlertModal(res.msg);
                    }
                    return false;
                }
                let hasNoResult = true;
                Object.keys(res.data.words_result).forEach(key => {
                    let words = res.data.words_result[key].words;
                    hasNoResult = hasNoResult && !words;
                    $('#demo-result .result-background').find('.' + ID_CARD_KEY_MAP[key]).html(words);
                    if (key === '性别') {
                        $('#demo-result .result-background').toggleClass(ID_CARD_KEY_MAP[words] || '', true);
                    }
                });

                $('#demo-result .result-background')
                    .toggleClass('has-result', !hasNoResult)
                    .toggleClass('error-no-result', hasNoResult);
                isScanning = false;
            },
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

        scanIDCard(options);
    };

    // 上传图片
    $('#demo-photo-upload  > input').change(function (e) {
        if ($(this).val() === '') {
            return false;
        }
        if (isScanning) {
            new AlertModal('操作正在进行中，请稍候再试！');
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
                $('#demo-photo-upload  > input').val('');
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
            new AlertModal('操作正在进行中，请稍候再试！');
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
            apiType: 'idcard',
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

    const $demoCartList = $('.demo-card-list > li');

    $demoCartList.each(function (index, item) {
        $(item)
            .find('img')
            .attr('src', `${window.location.protocol}//${window.location.host}${demoImgPath[index]}`);
    });

    // 绑定实例图点击事件
    $demoCartList.click(function () {
        if (isScanning) {
            new AlertModal('操作正在进行中，请稍候再试！');
            return;
        }
        isScanning = true;
        $('.demo-card-list > li').removeClass('active');
        $(this).addClass('active');
        let url = $(this).find('img').attr('src');
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
});
