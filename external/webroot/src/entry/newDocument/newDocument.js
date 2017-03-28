/**
 * @file 百度大脑文档模块入口
 * @author FranckChen(chenfan02@baidu.com)
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

// route container
import main from './route/main.vue';

// highlight.js皮肤
import 'highlight.js/styles/color-brewer.css';

Vue.use(VueRouter);

// 挂载路由
const routes = [
    {
        // 在这里设置默认打开的文档
        path: '/',
        redirect: '/Beginner-AccessProcess/top'
    },
    {
        path: '/:doc/:anchor',
        name: 'doc'
    },
    {
        // 锚点是选填参数, 默认到顶部
        path: '/:doc',
        redirect: '/:doc/top'
    }
];

new Vue({
    el: '#app',
    router: new VueRouter({
        routes
    }),
    render(h) {
        return h(main);
    }
});
