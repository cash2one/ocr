/**
 * @file 模板脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';
import throttle from 'lodash.throttle';
import News from '../component/widget/news';
import ConsultationModal from '../component/widget/consultationModal';
import SubscriptionModal from '../component/widget/subscriptionModal';


$(document).ready(function () {
    // 绑定视窗滚动事件
    let toggleBackTop = () => {
        $('.back-top').toggle($(document).scrollTop() > $(window).height() / 2);
    };
    toggleBackTop();
    $(window).scroll(
        throttle(
            () => {
                toggleBackTop;
            },
            300
        )
    );

    $('.back-top > a').click(() => {
        $(document).scrollTop(0);
    });

    // 渲染底部新闻
    new News({
        selector: '.footer-nav .news-container',
        newsCounter: 5
    }).render();

    // 绑定合作咨询模态框
    let consultationModal = new ConsultationModal();
    $('body').on('click', '.consult > a', e => {
        e.stopPropagation();
        consultationModal.show();
    });

    // 绑定邮件订阅模态框
    let subscriptionModal = new SubscriptionModal();
    $('.email-subscribe').click(e => {
        e.stopPropagation();
        subscriptionModal.show();
    });
});
