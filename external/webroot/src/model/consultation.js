/**
 * @file 技术咨询接口定义
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';

export function sendConsultation({data, success = $.noop, fail = $.noop}) {
    data.action = 'add';
    $.post('/index/case', data)
        .success(success).fail(fail);
};