/**
 * @file 词法分析demo
 * @author Franck Chen(chenfan02@baidu.com)
 */
import $ from 'jquery';

/* eslint-disable */
const sentences = [
    '2003年10月15日，杨利伟乘由长征二号F火箭运载的神舟五号飞船首次进入太空，象征着中国太空事业向前迈进一大步，起到了里程碑的作用。',
    '1996年，曾经是微软员工的加布·纽维尔和麦克·哈灵顿一同创建了Valve软件公司。他们在1996年下半年从id software取得了雷神之锤引擎的使用许可，用来开发半条命系列。'
];
/* eslint-enable */

const segments = [
    [
        {
            block: '2013',
            type: 't'
        },
        {
            block: ',',
            type: 'w'
        },
        {
            block: '杨利伟',
            type: 'nr'
        },
        {
            block: '乘',
            type: 'v'
        },
        {
            block: '由',
            type: 'p'
        },
        {
            block: '长征二号F火箭',
            type: 'nz'
        },
        {
            block: '运载',
            type: 'v'
        }
    ],
    [
        {
            block: '1996年',
            type: 't'
        },
        {
            block: ',',
            type: 'w'
        },
        {
            block: '曾经',
            type: 'd'
        },
        {
            block: '是',
            type: 'v'
        },
        {
            block: '微软',
            type: 'nt'
        }
    ]
];

const termsData = [
    [
        {
            block: '2003年10月15日',
            type: 'TIME'
        },
        {
            block: '杨利伟',
            type: 'PER'
        },
        {
            block: '中国',
            type: 'LOC'
        }
    ],
    [
        {
            block: '1996年',
            type: 'TIME'
        },
        {
            block: '微软',
            type: 'ORG'
        },
        {
            block: '加布·纽维尔',
            type: 'PER'
        },
        {
            block: '麦克·哈灵顿',
            type: 'PER'
        },
        {
            block: 'Valve软件公司',
            type: 'ORG'
        },
        {
            block: '1996年下半年',
            type: 'TIME'
        },
        {
            block: 'id software',
            type: 'ORG'
        }
    ]
];

// 词性对照表
const typeNameRef = {
    t: '时间词',
    w: '标点符号',
    nr: '人名',
    v: '动词',
    p: '介词',
    nz: '其他专名',
    nt: '机构团体',
    d: '副词'
};

// 专名对应表
const termRef = {
    TIME: '时间',
    PER: '人名',
    LOC: '地名',
    ORG: '机构'
};

// 总case数
const caseCount = segments.length;
// 当前看到的是第几个case
let currentCaseNum = 0;

// jQuery对象
const $segmentation = $('#segmentation');
const $wordType = $('#word-type');
const $demoSwitch = $('#demo-switch');
const $demoCase = $('#demo-case');
const $lexerDemoTabLabel = $('#lexer-demo-tab');
const $lexerDemoTab = $('[data-tab-id]');
const $termDemoTab = $('.lexer-demo-term-tab');

/**
 * 绘制demo视图
 *
 * @param {number} demoNum 当前要展示的是第几个demo
 */
const paintDemo = demoNum => {
    // 分词结果集合
    let segmentationArr = [];
    // 词类集合
    let wordTypeArr = [];
    // 记录已存在的分类 TODO，使用set类型优化
    let existType = [];
    // 已存在的term
    let existTerm = [];

    // 填充case文字
    $demoCase.text(sentences[demoNum]);

    // 填充词性识别
    segments[demoNum].forEach(({type, block}) => {
        // 分词模板
        const segmentationHTML = `<div class="lexer-demo-block" data-word-type="${type}">${block}</div>`;

        if (existType.indexOf(type) < 0) {
            existType.push(type);

            /* eslint-disable */
            // 词性模板
            const wordTypeHTML = [
                `<div class="lexer-demo-block word-type" data-word-type="${type}">`,
                `    ${typeNameRef[type]}`,
                `</div>`
            ].join('\r');
            /* eslint-enable */
            wordTypeArr.push(wordTypeHTML);
        }

        segmentationArr.push(segmentationHTML);
    });

    // 生成DOM
    $segmentation.html(segmentationArr.join('\r'));
    $wordType.html(wordTypeArr.join('\r'));

    // 绑定词性识别相关事件
    $wordType
        .find('.word-type')
        .on('click', ({target}) => {
            const $target = $(target);
            const wordType = $target.attr('data-word-type');

            $target
                .siblings()
                .removeClass('selected')
                .end()
                .addClass('selected');

            // 复合词性的词随动
            $segmentation
                .children()
                .removeClass('selected')
                .end()
                .find(`[data-word-type="${wordType}"]`)
                .addClass('selected');
        });

    let termTmp = {};
    // 填充专业名词
    termsData[demoNum].forEach(({type, block}) => {
        if (existTerm.indexOf(type) < 0) {
            existTerm.push(type);

            // 每个名字种类创建一个数组
            termTmp[type] = [];
        }

        // 专业名次入数据结构中
        termTmp[type].push(block);
    });

    let termTabContentHTML = [];
    // 拼接术语HTML
    for (let termNameEng of Object.keys(termTmp)) {
        // 顺序生成分词html完成拼接
        const blocks = termTmp[termNameEng]
            .map(
                block => {
                    return `<div class="lexer-demo-block">${block}</div>`;
                }
            )
            .join('\r');

        /* eslint-disable */
        // 一个术语块
        const termHTML = [
            `<div class="lexer-demo-term">`,
            `    <div class="lexer-demo-left-side">`,
            `        <div class="lexer-demo-term-name">${termRef[termNameEng]}</div>`,
            `        <div class="lexer-demo-term-name-eng">${termNameEng}</div>`,
            `    </div>`,
            `    <div class="lexer-demo-term-box">`,
            `        ${blocks}`,
            `    </div>`,
            `</div>`
        ].join('\r');
        /* eslint-enable */

        termTabContentHTML.push(termHTML);
    }

    // 填充专业名词部分
    $termDemoTab.html(termTabContentHTML.join('\r'));
};

// 切换tab
$lexerDemoTabLabel
    .find('.lexer-demo-tab-label')
    .on('click', ({target}) => {
        const $target = $(target);

        $target
            .addClass('label-selected')
            .siblings()
            .removeClass('label-selected');

        const tabTarget = $target.attr('data-tab-for');

        $lexerDemoTab
            .removeClass('tab-show')
            .filter(`[data-tab-id="${tabTarget}"]`)
            .addClass('tab-show');
    });

// 切换demo
$demoSwitch.on('click', () => {
    let nextCaseNum = currentCaseNum + 1;

    if (nextCaseNum >= caseCount) {
        nextCaseNum = 0;
    }

    paintDemo(nextCaseNum);

    currentCaseNum = nextCaseNum;
});

// 首屏
paintDemo(currentCaseNum);

// case点击效果
$('.case-indicator > li').click(function () {
    $('.case-indicator > li').each((i, e) => {
        $(e).toggleClass('active', i === $(this).index());
    });
    $('.case-item').each((i, e) => {
        $(e).toggleClass('active', i === $(this).index());
    });
});
