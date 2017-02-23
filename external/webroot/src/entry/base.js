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

const $window = $(window);
const $document = $(document);
// 绑定视窗滚动事件
let defineHeight = $window.height() / 2;
$window.resize(
    () => {
        defineHeight = $window.height() / 2;
    }
);
let backTop = $('.back-top');
let toggleBackTop = () => {
    backTop.toggle($document.scrollTop() > defineHeight);
};
toggleBackTop();
$window.scroll(
    throttle(
        toggleBackTop,
        300
    )
);

backTop.click(
    () => {
        $document.scrollTop(0);
    }
);

if (window.location.hostname.indexOf('ai.baidu.com') >= 0) {
    // 渲染底部新闻
    new News({
        selector: '.footer-nav .news-container',
        newsCounter: 5
    }).render();

    // 绑定合作咨询模态框
    let consultationModal = new ConsultationModal();
    $('.consult').on('click',
        e => {
            e.stopPropagation();
            consultationModal.show();
        }
    );

    // 绑定邮件订阅模态框
    let subscriptionModal = new SubscriptionModal();
    $('.email-subscribe').click(
        e => {
            e.stopPropagation();
            subscriptionModal.show();
        }
    );
}
