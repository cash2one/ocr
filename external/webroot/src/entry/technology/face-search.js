/**
 * @file bfb-人脸查找脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';
import throttle from 'lodash.throttle';
import 'less/technology/face-search.less';

import '../common/tech-case.js';


const $demo = $('.tech-function-demo');
// 触发功能介绍动画
$(window).scroll(
    throttle(
        () => {
            if ($(document).scrollTop() >= 100) {
                $demo.trigger('demo');
            }
        },
        300
    )
);

// 绑定功能介绍动画
$demo.one('demo', function () {
    let counter = 0;
    let faces = $('.tech-function-demo-item');

    let interval = setInterval(
        function () {
            faces
                .removeClass('tech-function-scanning')
                .eq(counter)
                .addClass('tech-function-scanning');

            if (counter++ === faces.length) {
                faces.addClass('tech-function-scanned');

                clearInterval(interval);
            }
        },
        700
    );
});

