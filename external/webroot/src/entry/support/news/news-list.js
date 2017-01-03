/* eslint-disable */
import $ from 'jquery';

import './pager.js';

const countPerPage = 10;
const page = $('.pg').page({pageNum: countPerPage});

const url = './news?action=list&pn=0&rn=9999999';
const dom = $('#news-container');

$.get(url, undefined, undefined, 'json')
    .then(
        function (d) {
            return d.data.map(function (item) {
                return {
                    title: item.title,
                    desc: item.abs,
                    time: transformTime(parseInt(item.time, 10) * 1000),
                    href: './news?action=detail&id=' + item.id
                };
            });
        },
        function () {
            return [];
        }
    )
    .always(function (d) {
        // 不管返回多少，只取10条
        r(d.slice(0, countPerPage));

        page.onChange(function (o) {
            r(d.slice(o.index * countPerPage, o.index * countPerPage + countPerPage));
            document.documentElement.scrollTop = 0;
        });

        page(d.length);
    });

function r(d) {
    const s = [];

    for (let {title, desc, time, href} of d) {
        const articleHTML = [
            '<div class="news-list">',
            `    <a href=${href}>`,
            `        <h2 class="block-title">${title}<span class="time">${time}</span></h2>`,
            '    </a>',
            `    <p>${desc}</p>`,
            '</div>'
        ].join('\r');

        s.push(articleHTML);
    }

    // 填充新闻列表
    dom.html(s.join('\r'));
}

function transformTime(time) {
    let t = new Date();
    t.setTime(time);
    const year = t.getFullYear();
    let month = t.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let date = t.getDate();
    date = date < 10 ? ('0' + date) : date;

    return [year, month, date].join('-');
}
/* eslint-enable */
