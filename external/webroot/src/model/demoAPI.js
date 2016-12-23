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

export function scanBankCard({image = null, imageUrl = null, success = $.noop, fail = $.noop}) {
    $.post('/aidemo', {
        type: 'bankcard',
        image: image,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

export function scanGeneralText({image = null, imageUrl = null, success = $.noop, fail = $.noop}) {
    $.post('/aidemo', {
        type: 'commontext',
        image: image,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

export function scanFace({image = null, imageUrl = null, success = $.noop, fail = $.noop}) {
    $.post('/aidemo', {
        type: 'face',
        image: image,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

export function scanPornography({image = null, imageUrl = null, success = $.noop, fail = $.noop}) {
    $.post('/aidemo', {
        type: 'pornography',
        image: image,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

export function getHeader({imageUrl = null, success = $.noop, fail = $.noop}) {
    $.post('/aidemo', {
        action: 'getHeader',
        'image_url': imageUrl
    }).success(success).fail(fail);
}