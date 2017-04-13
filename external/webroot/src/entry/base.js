/**
 * @file 模板脚本入口
 * @author shiliang@baidu.com
 */

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

if (window.location.hostname.indexOf('cloud.baidu.com') < 0) {
    // 种track
    const searchStr = window.location.search.split('?')[1];
    const query = {};
    if (searchStr) {
        const temp = searchStr.split('&');
        temp.forEach(data => {
            const [key, value] = data.split('=');
            query[key] = value || '';
        });
    }
    if (query.hasOwnProperty('t') || query.hasOwnProperty('track')) {
        const iframe = $('<iframe class="ai-track"></iframe>');
        const iframeURL = 'https://cloud.baidu.com/helper/x.html' + location.search + '&stamp=' + new Date().getTime();
        iframe.attr('src', iframeURL);
        $('body').append(iframe);
    }
    // 渲染底部新闻
    new News({
        selector: '.footer-nav .news-container',
        newsCounter: 5
    }).render();

    // 绑定合作咨询模态框
    let consultationModal = new ConsultationModal();
    $('.consult').on('click',
        () => {
            // e.stopPropagation();
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

// FIXME 临时方案，很脏，有风险
$('a.ai-redirect').on('click', e => {
    const $target = $(e.target);
    e.preventDefault();

    let url = '';
    let originUrl = $target.attr('href');
    if (location.hostname.indexOf('ai.baidu.com') >= 0) {
        url = `http://ai.baidu.com/redirect?url=${encodeURI(originUrl)}`;
    }
    else {
        url = originUrl;
    }

    window.open(url);
});
