/**
 * @file 模板脚本入口
 * @author wangjiedong@baidu.com
 */

import $ from 'jquery';
import marked from 'marked';
import 'code-prettify';
import debounce from 'lodash.debounce';

import '../../component/widget/docAccordionMenu';

// 上次浏览的md文件名,用于防止连续点击造成的重复提交
let previousMdFile = '';

// markdown容器
const $mdContainer = $('#md_container');
// breadcrumb
const $breadcrumb = $('.doc-breadcrumb .crumb');
// 左侧列表节点 TODO 选择命中的节点太多了，需要优化
const $sideBarElement = $('.sidebar li');

const setFaqAnchorId = function () {
    $mdContainer.find('p').each(function (i) {
        $(this).attr('id', 'Q' + (i + 1));
    });
};

// 处于开头的锚点，不需要跳转
const titleAnchorList = [
    '简介', '接入指南', '鉴权认证机制', '常见问题',
    '账号问题', '接口调用', '其他'
];

const enableInlineAnchor = function () {
    // 为每个标题添加id,为锚点跳转做准备
    $mdContainer.find('h1, h2').each(
        function (i, element) {
            const $element = $(element);
            // TODO id居然是中文的
            $element.attr('id', $element.text());
        }
    );

    // 处理文档内指定的本页面内锚点跳转, TODO 实际上这个功能是挂的
    $mdContainer.find('a[href]').each(function (i, element) {
        const $aTag = $(element);
        if ($aTag.attr('href').indexOf('#') !== 0) {
            $aTag.attr('target', '_blank');
        }
    });
};

let renderMdPage = function (mdName) {
    /* eslint-disable */
    const promise = $.Deferred();
    /* eslint-enable */

    $.ajax({
        type: 'GET',
        url: '/data/' + mdName + '.md',
        // TODO fail处理
        success(markdownContent) {
            previousMdFile = mdName;

            // md解析
            $mdContainer.html(marked(markdownContent));

            // 代码高亮
            $('code').addClass('prettyprint');
            /* eslint-disable */
            PR.prettyPrint();
            /* eslint-enable */

            // 激活所有文档内通过a标签完成文档内锚点跳转的链接
            enableInlineAnchor();

            // 常见问题内部锚点，和文档锚点区别是以p标签为单位
            if (mdName.indexOf('FAQ') > 0) {
                setFaqAnchorId();
            }

            promise.resolve();
        }
    });

    return promise;
};

const renderBreadCrumb = function (data) {
    let htmlMakeup = [];

    data.forEach((element, index) => {
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
            `    <span>${element}</span>`,
            '</li>'
        ];
    });

    $breadcrumb.html(htmlMakeup.join('\r'));
};

const moveToAnchor = function (anchorName) {
    const $anchorTitle = $(`#${anchorName}`);
    if ($anchorTitle.length > 0) {
        $anchorTitle.first()[0].scrollIntoView({block: 'start', behavior: 'smooth'});
    }
};

// 目录激活
const enableCatalogue = function () {
    // 所有涉及掉文档跳转的节点，包括文档内锚点跳转和文档间跳转,是个a标签
    $('.leaf, .sdk-node, .guide-node')
        .filter('[data-md]')
        .on(
            'click',
            function (e) {
                const $currentTarget = $(e.currentTarget);
                const $target = $(this);

                if ($target.hasClass('active')) {
                    return;
                }

                // 这个节点需要用到的md文件
                const requestMd = $currentTarget.attr('data-md');

                // 点击的节点高亮, 其他的节点取消高亮
                $sideBarElement.removeClass('active');
                $target.addClass('active');
                // 上级的非叶子节点激活
                $target.closest('.root').addClass('active');

                const breadcrumbData = [];
                $target
                    .parents('.non-leaf, .root')
                    .andSelf()
                    .find('>a')
                    .each(function (index, element) {
                        breadcrumbData.push($(element).text().trim());
                    });
                renderBreadCrumb(breadcrumbData);

                // 如果是在同文档内跳转，那就是跳转锚点
                const anchorName = $target.text().trim();
                if (requestMd !== previousMdFile) {
                    renderMdPage(requestMd).then(() => {
                        // 切换页面时，第一个锚点不需要跳转
                        if (titleAnchorList.indexOf(anchorName) < 0) {
                            moveToAnchor(anchorName);
                        }
                    });
                }
                else {
                    moveToAnchor(anchorName);
                }
            }
        );
};

const initAccordion = function () {
    // 大类
    const $category = $('.sidebar > h1');

    $category.click(
        debounce(
            e => {
                const $currentTarget = $(e.currentTarget);
                // TODO html结构重新整理
                // 大类别旁边的加减号
                $currentTarget.find('.pm-button').toggleClass('active');
                $currentTarget.next().find('>ul').toggle(300);
            },
            300,
            {
                leading: true,
                tailing: false
            }
        )
    );
};

const unfoldSidebar = function (docName) {
    // 文档在列表中对应的节点，注意取第一个是因为锚点的存在，一个文档可能在列表中有多个节点
    // 如果是这种场景，则文档从头浏览，激活的也一定是第一个节点
    const $docListNode = $(`[data-md=${docName}]`).first();

    const breadCrumbData = [];
    // 展开所有父级节点
    $docListNode
        .parents('.submenu')
        .css({
            display: 'block'
        })
        .end()
        .parents('.non-leaf, .root')
        .andSelf()
        .find('>a')
        .each((index, element) => {
            // 记录下上层级路径名
            breadCrumbData.push($(element).text().trim());
        });
    renderBreadCrumb(breadCrumbData);

    // 对应的节点高亮
    $docListNode.addClass('active');

    // 顶层节点高亮
    $docListNode.parents('.root').addClass('active');
};

$('#jquery-accordion-menu').docAccordionMenu();

initAccordion();
enableCatalogue();

// 加载文档, 如果有锚点则跳转到对应的锚点位置
export default function (docName, anchorId = null) {
    unfoldSidebar(docName);

    renderMdPage(docName).then(() => {
        if (anchorId) {
            let questionElement = $(`#${anchorId}`);

            if (questionElement.length > 0) {
                questionElement[0].scrollIntoView();
            }
        }
    });
}
