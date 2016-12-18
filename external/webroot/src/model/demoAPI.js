/**
 * @file demo API接口定义
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';

export function scanIDCard({image = null, imageUrl = null, success = $.noop, fail = $.noop}) {
    $.post('/aidemo', {
        type: 'idcard',
        image: image,
        'image_url': imageUrl
    }).success(success).fail(fail);
}