/**
 * @file 模板脚本入口
 * @author wangjiedong@baidu.com
 */
'use strict';

import $ from 'jquery';
import docAccordionMenu from '../../component/widget/docAccordionMenu';
import marked from 'marked';
import  '../../../bower_components/code-prettify/src/prettify';
window.$ = $;

let lastMdTag = '';
let anchorMap = {
    faceRecognition: {
        '使用须知': 'faceRecognition-1',
        '接口规范': 'faceRecognition-2',
        '错误信息格式': 'faceRecognition-3',
        '人脸识别接口': 'faceRecognition-4',
        'APP用户组信息接口': 'faceRecognition-5',
        '人脸属性': 'faceRecognition-6'
    }
};

let matchAnchor = function (className, cnName) {
    if (anchorMap[className]) {
        return anchorMap[className][cnName];
    }
    else {
        return '';
    }
};

let setAnchorId = function (arr) {
    if (!arr.length) {
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        $(arr[i]).attr('id', matchAnchor('faceRecognition', $(arr[i]).text()));
    }
};

let bindLeafNodeScroll = function (clickNode) {
    let scrollToLeafNodeH1 = function (index) {
        let offset = Math.abs($('#md_container>h1').eq(0).offset().top
            - $('#md_container>h1').eq(index).offset().top);
        $('#md_container').scrollTop(offset);
    };
    let leafNodes = clickNode.parent().find('>ul>li');
    leafNodes.each(function (i, element) {
        $(element).click(function () {
            scrollToLeafNodeH1(i);
        });
    });
};

let renderMdPage = function (tagName, clickNode, type) {
    if (lastMdTag === tagName) {
        return;
    }
    $.ajax({
        type: 'GET',
        url: '/data/' + tagName + '.md',
        success: function (res) {
            lastMdTag = tagName;
            $('#md_container').html(marked(res));
            $('code').addClass('prettyprint');
            window.PR.prettyPrint();
            if (type === 'node') {
                bindLeafNodeScroll(clickNode);
            }
        }
    });
};

let bindAllNodeClick = function () {
    $('.click-node').click(function () {
        let tagName =  $(this).attr('tag');
        if (tagName) {
            renderMdPage(tagName, $(this), 'node');
        }
    });
    $('.beginner.root .click-node').click(function () {
        let tagName =  $(this).attr('tag');
        if (tagName) {
            renderMdPage(tagName, $(this), 'beginner');
        }
    });
};

let bindAllLeafClick = function () {
    $('.leaf-node').click(function () {
        let tagName =  $(this).attr('tag');
        if (tagName) {
            renderMdPage(tagName, $(this), 'leaf');
        }
    });
};

$.ajax({
    type: 'GET',
    url: '/data/notice.md',
    success: function (res) {
        $('#md_container').html(marked(res));
        $('code').addClass('prettyprint');
        window.PR.prettyPrint();
    }
});
$(function () {
    $('#jquery-accordion-menu').docAccordionMenu();
});

let renderMenuActive = function () {
    $('.sidebar li').click(function () {
        let thisElement = $(this);
        $('.sidebar li.active').removeClass('active');
        $(this).addClass('active');
        let allParents = thisElement.parents();
        for (let i = 0; i < allParents.length; i++) {
            if ($(allParents[i]).hasClass('root')) {
                $(allParents[i]).addClass('active');
                break;
            }
        }
        if (thisElement.hasClass('leaf')) {
            let breadcrumbList = [thisElement.find('>a').text()];
            for (let i = 0; i < allParents.length; i++) {
                if ($(allParents[i]).hasClass('non-leaf') || $(allParents[i]).hasClass('root')) {
                    let text = $(allParents[i]).find('>a').text();
                    breadcrumbList.splice(0, 0, text);
                }
            }
            let html = '';
            for (let i = 0; i < breadcrumbList.length; i++) {
                html += '<li><span class="divider">&gt;</span></li><li><span class="">'
                        + breadcrumbList[i] + '</span></li>';
            }
            $('.doc-breadcrumb .crumb').hide().html(html);
            $('.doc-breadcrumb .crumb li:eq(0)').remove();
            $('.doc-breadcrumb .crumb').show();
        }
        else if (thisElement.parent().hasClass('beginner')) {
            let html = '<li><span>' + thisElement.text() + '</span></li>';
            $('.doc-breadcrumb .crumb').html(html);
        }
    });
};


let bindMinusPlus = function () {
    $('.sidebar .pm-button').click(function () {
        let button = $(this);
        if (button.hasClass('nav-plus1') && button.hasClass('active')) {
            button.removeClass('active');
            $('.toc.jquery-accordion-menu:eq(0)').show(500);
        } else if (button.hasClass('nav-plus1')) {
            button.addClass('active');
            $('.toc.jquery-accordion-menu:eq(0)').hide(500);
        } else if (button.hasClass('nav-plus2') && button.hasClass('active')) {
            button.removeClass('active');
            $('.toc.jquery-accordion-menu:eq(1)').show(500);
        }
        else {
            button.addClass('active');
            $('.toc.jquery-accordion-menu:eq(1)').hide(500);
        }
    });
};

$(function () {
    bindMinusPlus();
    renderMenuActive();
    bindAllNodeClick();
});
