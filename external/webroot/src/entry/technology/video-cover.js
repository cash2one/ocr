/**
 * @file 色情识别脚本入口
 * @author shiliang@baidu.com
 */

import $ from 'jquery';
// import throttle from 'lodash.throttle';
import DemoCanvas from '../../component/widget/demoCanvas';
import {scanPornography} from '../../model/demoAPI';
import AlertModal from '../../component/widget/alertModal';

/* eslint-disable */
import '!file-loader?name=./../../template/cloud/[name].html!extract-loader!html-loader!view/technology/video-cover.html';
/* eslint-enable */
import '../../less/technology/video-cover.less';

/* eslint-disable */
const demoImagePaths = [
    require('../../../ai_images/technology/antiporn/demo-card-1.jpg'),
    require('../../../ai_images/technology/antiporn/demo-card-2.jpg'),
    require('../../../ai_images/technology/antiporn/demo-card-3.jpg'),
    require('../../../ai_images/technology/antiporn/demo-card-4.jpg'),
    require('../../../ai_images/technology/antiporn/demo-card-5.jpg'),
    require('../../../ai_images/technology/antiporn/demo-card-6.jpg'),
    require('../../../ai_images/technology/antiporn/demo-card-7.jpg'),
    require('../../../ai_images/technology/antiporn/demo-card-8.jpg')
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
    // $(window).scroll(
    //     throttle(
    //         () => {
    //             if ($(document).scrollTop() >= 100) {
    //                 $('.tech-intro-detail').trigger('demo');
    //             }
    //         },
    //         300
    //     )
    // );

    // // 绑定功能介绍动画
    // $('.tech-intro-detail').one('demo', function () {
    //     $('.tech-intro-detail > .scan-box').addClass('scanned');
    // });

    // 线上demo开始
    let isScanning = false;

    // 重置demo相关dom
    let resetDemo = () => {
        isScanning = false;
        $('#demo-json > p').empty();
        $('#demo-photo-upload  > input').val('');
        $('#demo-result .canvas-container').attr('class', 'canvas-container');
        $('#demo-photo-upload, #scan-photo').removeClass('disabled');
    };

    let startScan = function (type, imgSrc, url) {
        $('#demo-json > p').empty();
        $('#demo-result .canvas-container').attr('class', 'canvas-container loading');
        $('#face-details').hide().empty();

        let options = {
            success(res) {
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
                    .toggleClass('normal', '正常' === activeResult.class_name)
                    .toggleClass('sexy', '性感' === activeResult.class_name)
                    .toggleClass('pornography', '色情' === activeResult.class_name);

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

        scanPornography(options);
    };



    // 上传图片
    $('#demo-photo-upload > input').change(function (e) {
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
            selector: '#demo-result .canvas-container',
            image: file,
            type: 'stream',
            lazyRender: true,
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
            selector: '#demo-result .canvas-container',
            image: url,
            type: 'url',
            apiType: 'pornography',
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

    const $demoImgContainer = $('.demo-card-list > li');

    $demoImgContainer.each(function (index, item) {
        $(item)
            .find('img')
            .attr('src', `${demoImagePaths[index]}`);
    });

    // 绑定实例图点击事件
    $demoImgContainer.click(function () {
        if (isScanning) {
            new AlertModal('操作正在进行中，请稍候再试！');
            return;
        }
        isScanning = true;
        $('.demo-card-list > li').removeClass('active');
        $(this).addClass('active');
        let url = `${window.location.protocol}${$(this).find('img').attr('src')}`;
        $('#demo-photo-upload, #scan-photo').addClass('disabled');
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
    $('.demo-card-list > li')[0].click();
});
