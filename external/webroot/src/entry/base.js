/**
 * @file 模板脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';
import News from '../component/widget/news';
import ConsultationModal from '../component/widget/consultationModal';
import SubscriptionModal from '../component/widget/subscriptionModal';


$(document).ready(function () {
    // 绑定视窗滚动事件
    $(window).scroll(() => {
        $('.back-top').toggle($('body').scrollTop() > $(window).height() / 2);
    });

    $('.back-top > a').click(() => {
        $('body').scrollTop(0);
    });

    // 渲染底部新闻
    new News({
        selector: '.footer-nav .news-container',
        newsCounter: 5
    }).render();

    // 绑定合作咨询模态框
    let consultationModal = new ConsultationModal();
    $('.consult > a').click(e => {
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