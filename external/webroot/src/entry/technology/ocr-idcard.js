/**
 * @file ocr-身份证识别脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';
import DemoCanvas from '../../component/widget/demoCanvas';
import {scanIDCard} from '../../model/demoAPI';
import AlertModal from '../../component/widget/alertModal';

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
    $(window).scroll(() => {
        if ($(document).scrollTop() >= 100) {
            $('.tech-intro-detail').trigger('demo');
        }
    });

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
            success: function (res) {
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
                for (let key in res.data.words_result) {
                    if (!res.data.words_result.hasOwnProperty(key)) {
                        continue;
                    }
                    let words = res.data.words_result[key].words;
                    hasNoResult = hasNoResult && !words;
                    $('#demo-result .result-background').find('.' + ID_CARD_KEY_MAP[key]).html(words);
                    if (key === '性别') {
                        $('#demo-result .result-background').toggleClass(ID_CARD_KEY_MAP[words] || '', true);
                    }
                }
                $('#demo-result .result-background').toggleClass('has-result', !hasNoResult)
                    .toggleClass('error-no-result', hasNoResult);
                isScanning = false;
            },
            fail: function (xhr) {
                new AlertModal('接口发生错误：' + xhr.status + ' - ' + xhr.statusText);
                resetDemo();
            }
        };
        if (type === 'url') {
            options.imageUrl = url;
        } else if (type === 'stream') {
            options.image = imgSrc;
        }

        scanIDCard(options);
    };

    // 上传图片
    $('#demo-photo-upload  > input').change(function (e) {
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
            success: imgSrc => {
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
            success: imgSrc => {
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

    // 绑定实例图点击事件
    $('.demo-card-list > li').click(function () {
        if (isScanning) {
            new AlertModal('操作正在进行中，请稍候再试！');
            return;
        }
        isScanning = true;
        $('.demo-card-list > li').removeClass('active');
        $(this).addClass('active');
        let url = window.location.origin + $(this).find('img').attr('src');
        $('#demo-photo-upload, #scan-photo').addClass('disabled');
        new DemoCanvas({
            selector: '#demo-origin',
            image: url,
            type: 'url',
            toCheck: false,
            success: imgSrc => {
                startScan('url', imgSrc, url);
            },
            fail: resetDemo
        });
    });

    // 触发初始化效果
    $('.demo-card-list > li')[0].click();
});