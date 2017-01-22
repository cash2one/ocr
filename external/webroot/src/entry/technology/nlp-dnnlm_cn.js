/**
 * @file nlp-中文DNN模型脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';
import {DNN_DATA} from '../../data/dnn-data';

import '../../less/technology/nlp-dnnlm_cn.less';

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
        $(this).find('.intro-demo').addClass('scanned');
    });

    // 刷新demo
    let demoCounter = 0;
    let minScore = 0;
    $('.refresh-demo').click(function () {
        minScore = 0;
        let demoData = DNN_DATA[demoCounter++ % DNN_DATA.length];
        $('.demo-input').attr('data-text', demoData.text);

        let options = Object.keys(demoData.options).map(word => {
            const html = [
                '<li>',
                `    <a role="button" data-score="${demoData.options[word]}" class="btn-normal">${word}</a>`,
                '</li>'
            ].join('');

            minScore = minScore === 0
                ? demoData.options[word]
                : (demoData.options[word] < minScore ? demoData.options[word] : minScore);

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
        let input = $('.demo-input');
        let text = input.attr('data-text');
        input.html(text.replace(/\{option\}/g, '<span>' + option.html() + '</span>'));
        let score = parseFloat(option.attr('data-score'));
        $('.demo-score-detail').html(score)
            .toggleClass('good', minScore === score)
            .toggleClass('bad', minScore !== score);
    });

    $('.refresh-demo').click();
});
