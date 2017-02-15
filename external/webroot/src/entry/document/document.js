/**
 * @file 模板脚本入口
 * @author wangjiedong@baidu.com
 */

'use strict';

import $ from 'jquery';
import marked from 'marked';
import {prettyPrint} from 'code-prettify/src/prettify';

import '../../component/widget/docAccordionMenu';

import 'less/document/document.less';

// 上次浏览的md文件名,用于防止连续点击造成的重复提交
let lastMdName = '';

// markdown容器
const $mdContainer = $('#md_container');
// breadcrumb
const $breadcrumb = $('.doc-breadcrumb .crumb');

let setFaqAnchorId = function (tagname) {
    if (tagname.indexOf('FAQ') > 0) {
        $mdContainer.find('p').each(function (i) {
            $(this).attr('id', 'Q' + (i + 1));
        });
    }
};

// 挂载锚点和文档跳转
let enableList = function (clickNode, type) {
    let scrollToLeafNodeH1 = function (index) {
        let offset = Math.abs($('#md_container>h1').eq(0).offset().top
            - $('#md_container>h1').eq(index).offset().top);

        $mdContainer.scrollTop(offset);
    };

    // fixme
    let docNodes = clickNode.parent().find('>ul>li');
    docNodes.each(function (index, element) {
        $(element).click(function () {
            let requestMd = $(this).attr('data-md');
            if (requestMd === lastMdName) {
                scrollToLeafNodeH1(index);
            }
            else {
                renderMdPage(requestMd, $(this), type);
            }
        });
    });
};

let renderALinkTag = function () {
    $('#md_container h1, #md_container h2').each(function (i, element) {
        $(element).attr('id', $(element).text());
    });

    $mdContainer.find('a').each(function (i, element) {
        let aTag = $(element);
        let href = aTag.attr('href');

        if (href.length) {
            if (href[0] !== '#') {
                aTag.attr('target', '_blank');
            }
        }
    });
};

let renderMdPage = function (tagName, clickNode, mdType) {
    // 防止多次提交
    if (lastMdName === tagName) {
        return;
    }

    $.ajax({
        type: 'GET',
        url: '/data/' + tagName + '.md',
        // TODO fail处理
        success(res) {
            lastMdName = tagName;

            // md解析
            $mdContainer.html(marked(res));

            // 代码高亮
            $('code').addClass('prettyprint');
            prettyPrint();

            // md切换后滚至顶部
            $mdContainer.scrollTop(0);

            renderALinkTag();
            setFaqAnchorId(tagName);

            // 文档页有都有锚点，在加载完成后调整锚点
            if (mdType === 'api-doc') {
                // enableList(clickNode, mdType);
            }
        }
    });
};

let bindAllNodeClick = function () {
    // 所有涉及掉文档跳转的节点，包括文档内锚点跳转和文档间跳转
    const $docHref = $('.doc-href');

    // TODO click-node和叶子节点整合
    $docHref.click(function () {
        const $this = $(this);
        // md文件名
        let mdName = $this.attr('data-md');

        if (mdName) {
            renderMdPage(mdName, $this, 'api-doc');
        }
    });

    let docNodes = $docHref.parent().find('>ul>li');
    docNodes.each(function (index, element) {
        $(element).click(function () {
            let requestMd = $(this).attr('data-md');
            if (requestMd === lastMdName) {
                // scrollToLeafNodeH1(index);
            }
            else {
                renderMdPage(requestMd, $(this), type);
            }
        });
    });

    $('.beginner.root .doc-href').click(function () {
        const $this = $(this);

        let mdName =  $this.attr('tag');
        if (mdName) {
            renderMdPage(mdName, $this, 'beginner');
        }
    });
};

/**
 * TODO
 *
 * *严格整理leaf,non-leaf太乱
 * *防止重复点击
 */
let renderBreadcrumb = function () {
    // 所有叶子，叶子的特点是加载新md，刷新breadcrumb
    const leaves = $('.sidebar')
        .find('.leaf, .sdk-node, .guide-node');
    const $sideBarElement = $('.sidebar li');

    // 左侧列表中任意一项的点击处理
    leaves.click(function () {
        let $target = $(this);

        // 点击的节点高亮
        $sideBarElement.removeClass('active');
        $target.addClass('active');
        // 上级的非叶子节点激活
        $target.closest('.root').addClass('active');

        // 拼接breadcrumb结构
        let htmlMakeup = [];

        $target
            .parents('.none-leaf, .root')
            .andSelf()
            .each(function (index, element) {
                // 屏蔽掉最左侧的箭头
                if (index > 0) {
                    // 箭头
                    htmlMakeup = [
                        ...htmlMakeup,
                        '<li>',
                        '    <span class="divider">&gt;</span>',
                        '</li>'
                    ];
                }

                htmlMakeup = [
                    ...htmlMakeup,
                    '<li>',
                    `    <span>${$(element).find('>a').text()}</span>`,
                    '</li>'
                ];
            });

        // 渲染breadcrumb
        $breadcrumb.html(htmlMakeup.join('\r'));
    });
};

let bindMinusPlus = function () {
    // 大类
    const $category = $('.sidebar > h1');
    // 大类别旁边的加减号
    const $categoryFolderIcon = $('.pm-button');

    $category.click(function (e) {
        // TODO html结构重新整理
        $categoryFolderIcon.toggleClass('active');
        $(e.currentTarget).next().find('>ul').toggle(300);
    });
};

let loadDefault = function () {
    $('.doc-wrap .beginner > li:eq(0)').click();
};

let clickOnce = true;
let unfoldSidebar = function (id) {
    let element = $('[name="' + id + '"]');
    let parentUl = element.parent();
    let parentLi = parentUl.parent();
    let firstClickNode = element.find('.click-node:eq(0)');

    let clickElement = function () {
        if (clickOnce) {
            element.find('>a').click();
            firstClickNode.click();
            let subUl = firstClickNode.siblings().eq(0);
            if (subUl.length) {
                subUl.find('>li:eq(0)').click();
            }
            clickOnce = false;
        }
    };
    clickElement();

    if (!parentUl.hasClass('submenu')) {
        clickOnce = true;
        return;
    }

    parentUl.show();

    if (parentLi.attr('id') === 'jquery-accordion-menu') {
        $('.pm-button:eq(1)').removeClass('active');
    }
    unfoldSidebar(parentLi.attr('name'));
};

let loadHashLocation = function () {
    let  hashId = window.location.hash;
    if (!hashId) {
        return;
    }
    hashId = hashId.split('#')[1];

    if (hashId.split('_').length === 1) {
        unfoldSidebar(hashId);
    }
    else {
        let hash = hashId.split('_')[0];
        let questionId = hashId.split('_')[1];
        // questionId = hash + '-' + questionId;
        unfoldSidebar(hash);
        setTimeout(function () {
            let questionElement = $('#md_container>#' + questionId);
            if (questionElement.length) {
                let offset = questionElement.offset().top;
                $('body').scrollTop(offset);
            }
        }, 500);
    }
};

$('#jquery-accordion-menu').docAccordionMenu();

bindMinusPlus();
renderBreadcrumb();
bindAllNodeClick();
loadDefault();
loadHashLocation();
