/**
 * @file bfb-人脸查找脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';
import DemoCanvas from '../component/widget/demoCanvas';
import {scanIDCard} from '../model/demoAPI';

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
        let counter = 0;
        let interval = setInterval(function () {
            let faces = $('.face-list > li');
            faces.each((i, e) => {
                $(e).toggleClass('scanning', i === counter);
            });
            if (counter === faces.length) {
                clearInterval(interval);
                $('.face-list > li').addClass('scanned');
            }
            counter++;
        }, 700);
    });
});