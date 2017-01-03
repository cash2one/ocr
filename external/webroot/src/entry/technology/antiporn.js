/**
 * @file 色情识别脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';
import DemoCanvas from '../../component/widget/demoCanvas';
import {scanPornography} from '../../model/demoAPI';
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

    let startScan = function (type, imgSrc, url) {
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
                        .toggleClass('error-upload-fail', res.errno === 107)
                        .toggleClass('error-timeout', res.errno === 28)
                        .toggleClass('error-image-format', res.errno === 106);
                    $('#demo-result .canvas-container').empty();
                    $('#demo-result .canvas-container').toggleClass(
                        'error-no-result', !res.data || !res.data.result_num
                    );
                    isScanning = false;
                    if ([106, 107, 28, 0].indexOf(res.errno) === -1) {
                        new AlertModal(res.msg);
                    }
                    return false;
                }

                $('#demo-result .canvas-container').toggleClass('has-result', res.data.result_num >= 1);

                let activeResult = null;
                for (let i = 0, len = res.data.result.length; i < len; i++) {
                    let record = res.data.result[i];
                    if (!activeResult || record.probability > activeResult.probability) {
                        activeResult = record;
                    }
                }

                $('#demo-result .canvas-container')
                    .attr('data-probability',
                        Math.round(activeResult.probability * 10000) / 100
                    )
                    .toggleClass(
                        'normal',
                        ['一般正常', '卡通正常', '亲子'].indexOf(activeResult.class_name) !== -1
                    )
                    .toggleClass(
                        'pornography',
                        ['一般色情', '卡通色情'].indexOf(activeResult.class_name) !== -1
                    );

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

        scanPornography(options);
    };



    // 上传图片
    $('#demo-photo-upload > input').change(function (e) {
        if (isScanning) {
            new AlertModal('操作正在进行中，请稍候再试！');
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
            selector: '#demo-result .canvas-container',
            image: url,
            type: 'url',
            apiType: 'pornography',
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
            selector: '#demo-result .canvas-container',
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