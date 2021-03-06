/**
 * @file nlp-短文本相似度脚本入口
 * @author shiliang@baidu.com
 */

import $ from 'jquery';
import throttle from 'lodash.throttle';

import {SIMNET_DATA} from '../../data/simnet-data';

import 'less/technology/nlp-simnet.less';

/* eslint-disable */
import '!file-loader?name=./../../template/cloud/[name].html!extract-loader!html-loader!view/technology/nlp-simnet.html';
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
    $(window).scroll(
        throttle(
            () => {
                if ($(document).scrollTop() >= 100) {
                    $('.tech-intro-detail').trigger('demo');
                }
            },
            300
        )
    );

    // 绑定功能介绍动画
    $('.tech-intro-detail').one('demo', function () {
        $(this).find('.intro-demo').addClass('scanned');
    });

    // 刷新demo
    let demoCounter = 0;
    let maxScore = 0;
    $('.refresh-demo').click(function () {
        maxScore = 0;
        let demoData = SIMNET_DATA[demoCounter++ % SIMNET_DATA.length];
        $('.demo-input').html(demoData.text);
        let options = Object.keys(demoData.options).map(word => {
            const html = [
                '<li>',
                `    <a role="button" data-score="${demoData.options[word]}" class="btn-normal">${word}</a>`,
                '</li>'
            ].join('');
            maxScore = demoData.options[word] > maxScore
                ? demoData.options[word]
                : maxScore;
            return $(html);
        });
        $('#demo-options')
            .html(options)
            .find('a.btn-normal')
            .eq(0)
            .click();
    });

    // demo选项切换
    $('#demo-options').on('click', 'a.btn-normal', function () {
        $('#demo-options .btn-normal').removeClass('selected');
        let option = $(this);
        option.addClass('selected');
        let score = parseFloat(option.attr('data-score'));
        $('.demo-score-detail').html(score)
            .toggleClass('good', maxScore === score)
            .toggleClass('bad', maxScore !== score);
    });

    $('.refresh-demo').click();
});
