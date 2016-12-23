/**
 * @file ocr-银行卡识别脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';
import DemoCanvas from '../../component/widget/demoCanvas';
import {scanBankCard} from '../../model/demoAPI';

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

    let isScanning = false;

    // 线上demo开始
    let resetDemo = () => {
        $('#demo-json > p').empty();
        $('#demo-result .result-background').attr('class', 'result-background');
        $('#demo-photo-upload, #scan-photo').removeClass('disabled');
        isScanning = false;
    };

    let startScan = function (type, imgSrc) {
        $('#demo-json > p').empty();
        $('#demo-result .result-background').attr('class', 'result-background loading');
        let options = {
            success: function (res) {
                $('#demo-photo-upload, #scan-photo').removeClass('disabled');
                $('#demo-json > p').html(JSON.stringify(res, null, '\t'));
                $('#demo-result .result-background').removeClass('loading');

                if (res.errno !== 0) {
                    $('#demo-result .result-background').toggleClass('has-result man female', false)
                        .toggleClass('error-upload-fail', res.errno === 1)
                        .toggleClass('error-timeout', res.errno === 28)
                        .toggleClass('error-no-result', res.errno === 216630)
                        .toggleClass('error-image-format', res.errno === 216201);
                    isScanning = false;
                    return false;
                }

                let hasNoResult = !res.data.result.bank_card_number;
                $('#demo-result .result-background').find('.bank-card-num').html(res.data.result.bank_card_number);
                $('#demo-result .result-background').toggleClass('has-result', !hasNoResult)
                    .toggleClass('error-no-result', hasNoResult);
                isScanning = false;
            },
            fail: function (xhr) {
                console.error('接口出错：' + xhr.status + ' - ' + xhr.statusText);
                resetDemo();
            }
        };
        if (type === 'url') {
            options.imageUrl = imgSrc;
        } else if (type === 'stream') {
            options.image = imgSrc;
        }

        scanBankCard(options);

    };

    // 上传图片
    $('#demo-photo-upload  > input').change(function (e) {
        if (isScanning) {
            alert('操作正在进行中，请稍候再试！');
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
            alert('操作正在进行中，请稍候再试！');
            return;
        }
        isScanning = true;
        if ($(this).hasClass('disabled') || !$('#demo-photo-url').val()) {
            return false;
        }
        $('#demo-photo-upload, #scan-photo').addClass('disabled');
        new DemoCanvas({
            selector: '#demo-origin',
            image: $('#demo-photo-url').val(),
            type: 'url',
            success: imgSrc => {
                startScan('url', imgSrc);
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
            alert('操作正在进行中，请稍候再试！');
            return;
        }
        isScanning = true;
        $('.demo-card-list > li').removeClass('active');
        $(this).addClass('active');
        let imgSrc = window.location.origin + $(this).find('img').attr('src');
        $('#demo-photo-upload, #scan-photo').addClass('disabled');
        new DemoCanvas({
            selector: '#demo-origin',
            image: imgSrc,
            type: 'url',
            success: imgSrc => {
                startScan('url', imgSrc);
            },
            fail: resetDemo
        });
    });

    // 触发初始化效果
    $('.demo-card-list > li')[0].click();
});