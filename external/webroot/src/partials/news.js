/**
 * @file 最新新闻模板
 * @author shiliang@baidu.com
 */
'use strict';

export const NEWS_TMPL = [
    '<ul>',
        '<% if (!news.length) { %>',
        '<li><a href="#">暂无新闻</a></li>',
        '<% } else {%>',
        '<% for (var i = 0, len = news.length; i < len; i++) {%>',
        '<li>',
            '<a href="/support/news?action=detail&id=<%= news[i].id %>" target="_blank" title="<%= news[i].title %>">',
                '<%= "[" + news[i].time + "] " + news[i].title %>',
            '</a>',
        '</li>',
        '<% } %>',
        '<% } %>',
    '</ul>'
].join('');