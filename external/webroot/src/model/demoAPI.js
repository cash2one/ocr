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

export function evaluateWakeWords({words = null, success = $.noop, fail = $.noop}) {
    $.post('/aidemo', {
        type: 'wakescore',
        kw: words
    }).success(success).fail(fail);
}

export function exportWakeWords({words = null, success = $.noop}) {
    window.open('/aidemo?type=wakedownload&kw=' + words, '_blank');
    success();
}

export function synthesizeSpeech({data = {}, success = $.noop, fail = $.noop}) {
    $.post('/aidemo', {
        type: 'tts',
        speed: data.speed,
        vol: data.vol,
        person: data.person,
        text: data.text
    }).success(success).fail(fail);
}