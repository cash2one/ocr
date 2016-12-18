/**
 * @file ocr-身份证识别脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from "jquery";
import DemoCanvas from "../component/widget/demoCanvas";
import {scanIDCard} from "../model/demoAPI";

$(document).ready(function () {
    // case点击效果
    $('.case-indicator > li').click(function (){
        $('.case-indicator > li').each((i, e) => {
            $(e).toggleClass('active', i == $(this).index());
        });
        $('.case-item').each((i, e) => {
            $(e).toggleClass('active', i == $(this).index());
        });
    });

    // 触发功能介绍动画
    $(window).scroll(() => {
        if ($(document).scrollTop() >= 100) {
            $('.tech-intro-detail').trigger('demo');
        }
    });

    // 绑定功能介绍动画
    $('.tech-intro-detail').one('demo', function (){
        $('.original-card').addClass('scanning');
        setTimeout(function () {
            $('.original-card').removeClass('scanning').addClass('scanned');
            $('.scan-result').addClass('scanned');
        }, 3000);
    });

    // 线上demo开始
    let resetDemo = () => {
        $('#demo-result, #demo-json').empty();
        $('#demo-photo-upload, #scan-photo').removeClass('disabled');
    };

    let startScan = function (type, imgSrc) {
        // var dfd = $.Deferred();
        var options = {
            success: function (res) {
                $('#demo-photo-upload, #scan-photo').removeClass('disabled');
                var canvasOpts = [];
                for (var key in res.data.words_result) {
                    if (!res.data.words_result.hasOwnProperty(key)) {
                        continue;
                    }
                    canvasOpts.push({
                        shape: 'rect',
                        location: res.data.words_result[key].location
                    });
                }
                new DemoCanvas({
                    selector: '#demo-result',
                    image: imgSrc,
                    type: 'url',
                    toCheck: false,
                    options: canvasOpts
                });
            },
            fail: function (xhr){
                console.error('接口出错：' + xhr.status + ' - ' + xhr.statusText);
                resetDemo();
            }
        };
        if (type === 'url') {
            options.imageUrl = imgSrc;
        } else if (type === 'stream') {
            options.image = imgSrc;
        }

        scanIDCard(options);

        // return dfd.promise();
    };

    // 上传图片
    $('#demo-photo-upload  > input').change(function (e) {
        $('#demo-photo-upload, #scan-photo').addClass('disabled');
        let file = $(this)[0].files[0];
        new DemoCanvas({
            selector: '#demo-origin',
            image: file,
            type: 'stream',
            success: (imgSrc) => {
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
        if ($(this).hasClass('disabled')) {
            return false;
        }
        $('#demo-photo-upload, #scan-photo').addClass('disabled');
        new DemoCanvas({
            selector: '#demo-origin',
            image: $('#demo-photo-url').val(),
            type: 'url',
            success: (imgSrc) => {
                startScan('url', imgSrc);
            },
            fail: resetDemo
        });
    });

    // 阻止多次上传
    $('#demo-photo-upload').click(function (e) {
        if ($(this).hasClass('disabled')) {
            return false;
        }
    });

    // 绑定实例图点击事件
    $('.demo-card-list > li').click(function (){
        $('.demo-card-list > li').removeClass('active');
        $(this).addClass('active');
        let imgSrc = $(this).find('img').attr('src');
        $('#demo-photo-url').val(window.location.origin + imgSrc);
    });

    // 触发初始化效果
    $('.demo-card-list > li')[0].click();
    $('#scan-photo').click();
});