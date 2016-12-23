/**
 * @file 色情识别脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';
import DemoCanvas from '../component/widget/demoCanvas';
import {scanPornography} from '../model/demoAPI';

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
        $('.tech-intro-detail > .scan-box').addClass('scanned');
    });

    // 线上demo开始
    let isScanning = false;

    // 重置demo相关dom
    let resetDemo = () => {
        isScanning = false;
        $('#demo-json > p').empty();
        $('#demo-result .canvas-container').attr('class', 'canvas-container');
        $('#demo-photo-upload, #scan-photo').removeClass('disabled');
        $('#demo-photo-upload').val('');
    };

    let startScan = function (type, imgSrc) {
        $('#demo-json > p').empty();
        $('#demo-result .canvas-container').attr('class', 'canvas-container loading');
        $('#face-details').hide().empty();

        let options = {
            success: function (res) {
                $('#demo-photo-upload, #scan-photo').removeClass('disabled');
                $('#demo-json > p').html(JSON.stringify(res, null, '\t'));
                $('#demo-result .canvas-container').removeClass('loading');

                if (res.errno !== 0 || !res.data.result_num) {
                    $('#demo-result .canvas-container')
                        .toggleClass('error-upload-fail', res.errno === 1)
                        .toggleClass('error-timeout', res.errno === 28)
                        .toggleClass('error-image-format', res.errno === 216201)
                        .toggleClass('error-no-result', !res.data.result_num);
                    $('#demo-result .canvas-container').empty();
                    isScanning = false;
                    return false;
                }

                $('#demo-result .canvas-container').toggleClass('has-result', res.data.result_num >= 1);

                //todo: 输出结果
                let normalProbability = 0;
                let pornProbability = 0;
                for (let i = 0, len = res.data.result.length; i < len; i++) {
                    let record = res.data.result[i];
                    switch (record.class_name) {
                        case '一般色情':
                        case '卡通色情':
                            pornProbability += record.probability;
                            break;
                        default:
                            normalProbability += record.probability
                    }
                }

                $('#demo-result .canvas-container')
                    .attr('data-probability',
                        Math.round(
                            (normalProbability > pornProbability ? normalProbability : pornProbability) * 10000
                        ) / 100
                    )
                    .toggleClass('normal', normalProbability > pornProbability)
                    .toggleClass('pornography', normalProbability <= pornProbability);

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

        scanPornography(options);
    };



    // 上传图片
    $('#demo-photo-upload > input').change(function (e) {
        if (isScanning) {
            alert('操作正在进行中，请稍候再试！');
            return;
        }
        isScanning = true;
        $('#demo-photo-upload, #scan-photo').addClass('disabled');
        let file = $(this)[0].files[0];
        new DemoCanvas({
            selector: '#demo-result .canvas-container',
            image: file,
            type: 'stream',
            lazyRender: true,
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
            selector: '#demo-result .canvas-container',
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
            selector: '#demo-result .canvas-container',
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