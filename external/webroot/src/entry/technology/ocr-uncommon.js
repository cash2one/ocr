/**
 * @file ocr-生僻字识别脚本入口
 * @author chenweiwei01@baidu.com
 */
'use strict';

import $ from 'jquery';

import '../../less/technology/ocr-uncommon.less';
import DemoCanvas from '../../component/widget/demoCanvas';
import {scanGeneralText} from '../../model/demoAPI';



// Demo实例图片
const $techDemoSelect = $('.tech-demo-examples img');

// 实例图片点击点击
$techDemoSelect.on('click', ({target}) => {
    const $target = $(target);

    if ($target.hasClass('active')) {
        return;
    }

    $target
        .addClass('active')
        .siblings()
        .removeClass('active');

    let demoUrl = `${window.location.protocol}${$target.attr('src')}`;
    new DemoCanvas({
        selector: '#demo-origin',
        image: demoUrl,
        type: 'url',
        toCheck: false,
        success(imgSrc) {
            startScan('url', imgSrc, demoUrl);
        },
    });
});

const startScan = function(type, imgSrc, url) {
    let options = {
        success(res) {
            $('#demo-json').html('<p>' + JSON.stringify(res, null, '\t') + '</p>');
            let result = res.data.words_result;
            result.forEach(
                (value,key) => {
                    $('.demo-result-table').append([
                        '<tr>' +
                        '<td>' + (key + 1) + '</td>',
                        '<td>' + value.words + '</td>',
                        '<td>' + value.location.left + '</td>',
                        '<td>' + value.location.top + '</td>',
                        '<td>' + value.location.width + '</td>',
                        '<td>' + value.location.height + '</td>',
                        '</tr>'
                    ].join(''));
                }
            );
        }
    };
    options.imageUrl = url;
    scanGeneralText(options);
};

// $techDemoSelect.click();
