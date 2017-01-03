/**
 * @file 新闻接口定义
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';

export function getNews({pageNum = 0, limit = 5, success = $.noop, fail = $.noop}) {
    $.get(
        '/support/news',
        {
            action: 'list',
            pn: pageNum,
            rn: limit
        }
    ).success(success).fail(fail);
}