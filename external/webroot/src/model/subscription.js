/**
 * @file 邮件订阅接口定义
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';

export const subscribe = function ({data, success = $.noop, fail = $.noop}) {
    $.post('/index/subscribe', data)
        .success(success).fail(fail);
};