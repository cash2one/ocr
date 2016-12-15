/**
 * @file 技术咨询接口定义
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';

export const checkQRCode = function ({code, success = $.noop, fail = $.noop}) {
    $.post('/index/seccode', {
        action: 'check',
        code: code
    }).success(success).fail(fail);
};

export const sendConsultation = function ({data, success = $.noop, fail = $.noop}) {
    data.action = 'add';
    $.post('/index/case', data)
        .success(success).fail(fail);
};