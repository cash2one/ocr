/**
 * @file 最新新闻容器
 * @author shiliang@baidu.com
 */

import $ from 'jquery';
import {getNews} from '../../model/news';

import newsTpl from 'partials/news.hbs';

export default class News {
    constructor({selector, newsCounter}) {
        this.selector = selector;
        this.newsCounter = newsCounter;
    }

    render() {
        let convertTimeFormat = seconds => {
            let date = new Date(seconds * 1000);
            let fillZero = function (number) {
                return (number < 10 ? '0' : '') + number;
            };
            return [
                date.getFullYear(),
                fillZero(date.getMonth() + 1),
                fillZero(date.getDate())
            ].join('-');
        };

        getNews({
            pageNum: 0,
            limit: this.newsCounter,
            success: res => {
                if (res.errno !== 0) {
                    throw ('获取新闻数据接口发生错误，error msg: ' + res.msg);
                }
                res.data.forEach((e, i) => e.time = convertTimeFormat(e.time));
                const html = newsTpl({news: res.data});
                $(this.selector).html(html);
            },
            fail: res => {throw ('获取新闻数据接口发生错误，error msg: ' + res.msg);}
        });
    }
}
