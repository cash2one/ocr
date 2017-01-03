/**
 * @file bfb-人脸检测脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';
import DemoCanvas from '../../component/widget/demoCanvas';
import {scanFace} from '../../model/demoAPI';
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
        $('.tech-intro-detail').addClass('scanned');
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
        $('#result-gallery').toggle(false).find('ul').empty();
        $('#face-details').hide().empty();
    };

    // 画人脸结果区块
    let drawRect = function (data) {
        let canvas = $('#demo-result canvas');
        let scale = canvas.attr('data-scale');
        let ctx = $('#demo-result canvas')[0].getContext('2d');

        for (let i = 0, len = data.length; i < len; i++) {
            let record = data[i];
            let location = record.location;
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 4 / scale;
            ctx.fillStyle = 'transparent';
            ctx.strokeStyle = 'rgba(0, 115, 235, 0.8)';
            ctx.translate(location.left, location.top);
            ctx.rotate(record.rotation_angle / 180 * Math.PI);
            ctx.rect(
                0, 0,
                location.width, location.height
            );
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    };

    // 画人脸结果Land Mark
    let drawLandMark = function (data, hasOffset) {
        let canvas = $('#demo-result canvas');
        let scale = canvas.attr('data-scale');
        let ctx = $('#demo-result canvas')[0].getContext('2d');
        let offset = hasOffset
            ? {x: data.location.left, y: data.location.top}
            : {x: 0, y: 0};
        let rotatedAngel = hasOffset ? data.rotation_angle : 0;


        let getAngle = function (x, y) {
            return 360 * Math.atan(y / x) / (2 * Math.PI);
        };
        let getRadius = function (x, y) {
            return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        };

        for (let i = 0, len = data.landmark72.length; i < len; i++) {
            let record = data.landmark72[i];
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.fillStyle = 'rgba(0, 115, 235, 0.8)';
            ctx.strokeStyle = 'transparent';
            let angle = (getAngle(record.x - offset.x, record.y - offset.y) - rotatedAngel)  / 180 * Math.PI;
            let radius = getRadius(record.x - offset.x, record.y - offset.y);
            ctx.arc(radius * Math.cos(angle), radius * Math.sin(angle), 2 / scale, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    };

    // 打开关闭结果画廊
    let toggleGallery = function (isOpen) {
        $('#result-gallery').toggle(isOpen);
    };

    // 初始画廊
    let setGalleryContent = function (data) {
        let galleryList = $('#result-gallery > ul');
        let originalImage = new Image();
        originalImage.onload = function () {
            for (let i = 0, len = data.result.length; i < len; i++) {
                let record = data.result[i];
                let canvas = $('<canvas>').attr('width', record.location.width)
                    .attr('height', record.location.height);
                let ctx = canvas[0].getContext('2d');
                ctx.rotate(-record.rotation_angle * Math.PI / 180);
                ctx.translate(-record.location.left, -record.location.top);
                ctx.drawImage(originalImage, 0, 0);
                let galleryItem = $('<li><img src="' + canvas[0].toDataURL() + '"></li>');
                galleryItem.data('face', record).data('isAll', false);
                galleryList.append(galleryItem);
            }
        };
        originalImage.src = galleryList.find('img').eq(0).attr('src');
    };

    // 初始画廊
    let initGallery = function (imgSrc, data) {
        let galleryList = $('#result-gallery > ul');
        let galleryItem = $('<li class="active"><img src="' + imgSrc + '"></li>');
        galleryItem.data('face', data).data('isAll', true);
        galleryList.empty().append(galleryItem);
    };

    const FACE_PROPERTY_DICT = {
        age: {
            name: '年龄',
            transform: value => {
                return Math.round(value);
            }
        },
        race: {
            name: '人种',
            transform: value => {
                return {
                    yellow: '黄种人',
                    white: '白种人',
                    black: '黑种人',
                    arabs: '阿拉伯人'
                }[value];
            }
        },
        gender: {
            name: '性别',
            transform: value => {
                return {
                    male: '男性',
                    female: '女性'
                }[value];
            }
        },
        expression: {
            name: '表情',
            transform: value => {
                return {
                    0: '不笑',
                    1: '微笑',
                    2: '大笑'
                }[value];
            }
        },
        glasses: {
            name: '眼镜',
            transform: value => {
                return {
                    0: '无眼镜',
                    1: '普通眼镜',
                    2: '墨镜'
                }[value];
            }
        }
    };

    // 显示人脸结果
    let showScanResult = function (data, isAll) {
        let details = $('#face-details');
        details.empty();
        if (isAll) {
            details.hide();
            return false;
        }
        details.show();
        for (let i in FACE_PROPERTY_DICT) {
            if (data.hasOwnProperty(i)) {
                let label = FACE_PROPERTY_DICT[i].name;
                let value = FACE_PROPERTY_DICT[i].transform(data[i]);
                details.append(
                    $('<li></li>').html(label + ' : ' + value)
                );
            }
        }
    };

    let startScan = function (type, imgSrc, url) {
        $('#demo-json > p').empty();
        toggleGallery(false);
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
                    $('#demo-result .canvas-container').toggleClass(
                        'error-no-result', !res.data || !res.data.result_num
                    );
                    $('#demo-result .canvas-container').empty();
                    isScanning = false;
                    if ([106, 107, 28, 0].indexOf(res.errno) === -1) {
                        new AlertModal(res.msg);
                    }
                    return isScanning;
                }
                $('#demo-result .canvas-container').toggleClass('has-result', res.data.result_num >= 1);

                initGallery(imgSrc, res.data.result);

                if (res.data.result_num === 1) {
                    toggleGallery(false);
                    drawLandMark(res.data.result[0]);
                    showScanResult(res.data.result[0], false);
                } else {
                    toggleGallery(true);
                    setGalleryContent(res.data);
                    drawRect(res.data.result);
                    showScanResult(null, true);
                }
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

        scanFace(options);
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
            apiType: 'face',
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

    // 结果画廊点击事件
    $('#result-gallery').on('click', 'li', function () {
        $('#result-gallery li').removeClass('active');
        let galleryItem = $(this);
        galleryItem.addClass('active');
        let faceData = galleryItem.data('face');
        let isAll = galleryItem.data('isAll');

        new DemoCanvas({
            selector: '#demo-result .canvas-container',
            image: $(this).find('img').attr('src'),
            toCheck: false,
            // scale: isAll ? 1 : 2,
            success: function () {
                if (isAll) {
                    drawRect(faceData);
                }
                else {
                    drawLandMark(faceData, true);
                }
                showScanResult(faceData, isAll);
            },
            fail: resetDemo
        });
    });

    // 触发初始化效果
    $('.demo-card-list > li')[0].click();
});