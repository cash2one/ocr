/**
 * @file demo API接口定义
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';

export function scanIDCard({image = null, imageUrl = null, success = $.noop, fail = $.noop}) {
    $.post('http://ai.baidu.com/aidemo', {
        type: 'idcard',
        image: image,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

export function scanBankCard({image = null, imageUrl = null, success = $.noop, fail = $.noop}) {
    $.post('http://ai.baidu.com/aidemo', {
        type: 'bankcard',
        image: image,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

export function scanGeneralText({image = null, imageUrl = null, success = $.noop, fail = $.noop}) {
    $.post('http://ai.baidu.com/aidemo', {
        type: 'commontext',
        image: image,
        'image_url' : 'http://ai.bdstatic.com/dist/1488185410/ai_images/technology/ocr-general/demo-card-3.png'
        // 'image_url': imageUrl
    }).success(success).fail(fail);
}

export function scanFace({image = null, imageUrl = null, success = $.noop, fail = $.noop}) {
    $.post('http://ai.baidu.com/aidemo', {
        type: 'face',
        image: image,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

export function scanPornography({image = null, imageUrl = null, success = $.noop, fail = $.noop}) {
    $.post('http://ai.baidu.com/aidemo', {
        type: 'pornography',
        image: image,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

export function getHeader({imageUrl = null, type, success = $.noop, fail = $.noop}) {
    $.post('http://ai.baidu.com/aidemo', {
        action: 'getHeader',
        type: type,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

export function evaluateWakeWords({words = null, success = $.noop, fail = $.noop}) {
    $.post('http://ai.baidu.com/aidemo', {
        type: 'wakescore',
        kw: words
    }).success(success).fail(fail);
}

export function exportWakeWords({words = null, success = $.noop}) {
    window.open('/aidemo?type=wakedownload&kw=' + words, '_blank');
    success();
}

export function synthesizeSpeech({data = {}, success = $.noop, fail = $.noop}) {
    $.post('http://ai.baidu.com/aidemo', {
        type: 'tts',
        speed: data.speed,
        vol: data.vol,
        person: data.person,
        text: data.text
    }).success(success).fail(fail);
}
