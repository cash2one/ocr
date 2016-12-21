/**
 * @file bfb-人脸检测脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';
import DemoCanvas from '../component/widget/demoCanvas';
import {scanFace} from '../model/demoAPI';

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
        $('.tech-intro-detail').addClass('scanned');
    });

    // 线上demo开始
    let resetDemo = () => {
        $('#demo-json > p').empty();
        $('#demo-result .result-background').attr('class', 'result-background');
        $('#demo-photo-upload, #scan-photo').removeClass('disabled');
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
                        .toggleClass('error-image-format', res.errno === 216201);
                    $('#demo-result .result-background').empty();
                    return false;
                }
                let hasNoResult = !res.data.result_num;
                let canvas = $('#demo-result canvas');
                let scale = canvas.attr('data-scale');
                let ctx = $('#demo-result canvas')[0].getContext('2d');

                for (let i = 0, len = res.data.result_num; i < len; i++) {
                    let record = res.data.result[i];
                    let location = record.location;
                    ctx.beginPath();
                    ctx.lineWidth = 4 / scale;
                    ctx.fillStyle = 'transparent';
                    ctx.strokeStyle = 'rgba(0, 115, 235, 0.8)';
                    ctx.rect(
                        location.left, location.top,
                        location.width, location.height
                    );
                    ctx.rotate(record.rotation_angle / 180 * Math.PI);
                    ctx.fill();
                    ctx.stroke();
                }
                $('#demo-result .result-background').toggleClass('has-result', !hasNoResult)
                    .toggleClass('error-no-result', hasNoResult);
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

        scanFace(options);
    };

    // 上传图片
    $('#demo-photo-upload  > input').change(function (e) {
        $('#demo-photo-upload, #scan-photo').addClass('disabled');
        let file = $(this)[0].files[0];
        new DemoCanvas({
            selector: '#demo-result .result-background',
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
        if ($(this).hasClass('disabled') || !$('#demo-photo-url').val()) {
            return false;
        }
        $('#demo-photo-upload, #scan-photo').addClass('disabled');
        new DemoCanvas({
            selector: '#demo-result .result-background',
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
        $('.demo-card-list > li').removeClass('active');
        $(this).addClass('active');
        let imgSrc = window.location.origin + $(this).find('img').attr('src');
        $('#demo-photo-upload, #scan-photo').addClass('disabled');
        new DemoCanvas({
            selector: '#demo-result .result-background',
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