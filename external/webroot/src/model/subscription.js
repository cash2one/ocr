/**
 * @file 邮件订阅接口定义
 * @author shiliang@baidu.com
 */

import $ from 'jquery';

export function subscribe({data, success = $.noop, fail = $.noop}) {
    $.post('/index/subscribe', data)
        .success(success).fail(fail);
}
