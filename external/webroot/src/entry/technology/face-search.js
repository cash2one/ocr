/**
 * @file bfb-人脸查找脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';

import 'less/technology/face-search.less';

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
        let faces = $('.face-list > li');

        let interval = setInterval(
            function () {
                faces
                    .removeClass('scanning')
                    .eq(counter)
                    .addClass('scanning');

                if (counter++ === faces.length) {
                    faces.addClass('scanned');

                    clearInterval(interval);
                }
            },
            700
        );
    });
});
