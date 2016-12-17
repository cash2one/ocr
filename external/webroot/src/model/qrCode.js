/**
 * @file 二维码接口定义
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';

export function checkQRCode({code, success = $.noop, fail = $.noop}) {
    $.post('/index/seccode', {
        action: 'check',
        code: code
    }).success(success).fail(fail);
};