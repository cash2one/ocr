/**
 * @file nlp评论抽取demo
 * @author Franck Chen(chenfan02@baidu.com)
 */

import $ from 'jquery';

const ATTITUDE = {
    NEGATIVE: 0,
    POSITIVE: 1,
    NONE: 2
};

// 原始物料
const sentencesGroup = [
    [
        '位置很好找，房间很干净。',
        '环境不错不过价格有点贵，而且前台推荐的旅游线路也是偏贵。地理位置超棒！',
        '周边交通方便，房间安静卫生，性价比高',
        '卫生好，设施好，环境好，服务好',
        '价格比较便宜，交通便利，没有洗澡的',
        '整体房间还好，客房服务这块也还不错。',
        '交通便利，酒店设施一般，性价比一般',
        '房间比较大，环境还可以',
        '房间挺温馨的，采光好，超市、市场、车站都在附近，很方便',
        '服务态度不好，交通不是太方便，其他还好'
    ],
    [

    ]
];

const scopes = [
    [
        [
            {
                // 内容块
                scope: '位置很好',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '位置'
            },
            {
                scope: '房间很干净',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '房间'
            }
        ],
        [
            {
                scope: '环境不错',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '环境'
            },
            {
                scope: '地理位置超棒',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '位置'
            }
        ],
        [
            {
                scope: '交通方便',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '交通'
            },
            {
                scope: '周边交通方便',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '交通'
            },
            {
                scope: '房间安静',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '房间'
            },
            {
                scope: '性价比高',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '性价比'
            }
        ],
        [
            {
                scope: '卫生好',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '环境'
            },
            {
                scope: '设施好',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '设施'
            },
            {
                scope: '环境好',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '环境'
            },
            {
                scope: '服务好',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '服务'
            }
        ],
        [
            {
                scope: '价格比较便宜',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '性价比'
            },
            {
                scope: '交通便利',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '交通'
            }
        ],
        [
            {
                scope: '房间还好',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '房间'
            },
            {
                scope: '客房服务这块也还不错',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '客房服务'
            }
        ],
        [
            {
                scope: '交通便利',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '交通'
            },
            {
                scope: '酒店设施一般',
                attitude: ATTITUDE.NEGATIVE,
                weight: 2,
                tag: '设施'
            },
            {
                scope: '设施一般',
                attitude: ATTITUDE.NEGATIVE,
                weight: 2,
                tag: '设施'
            }
        ],
        [
            {
                scope: '房间比较大',
                attitude: ATTITUDE.NEGATIVE,
                weight: 2,
                tag: '房间'
            },
            {
                scope: '环境还可以',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '环境'
            }
        ],
        [
            {
                scope: '房间挺温馨',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '房间'
            },
            {
                scope: '采光好',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '采光'
            }
        ],
        [
            {
                scope: '服务态度不好',
                attitude: ATTITUDE.NEGATIVE,
                weight: 2,
                tag: '服务'
            },
            {
                scope: '态度不好',
                attitude: ATTITUDE.NEGATIVE,
                weight: 2,
                tag: '服务'
            },
            {
                scope: '交通不是太方便',
                attitude: ATTITUDE.NEGATIVE,
                weight: 2,
                tag: '交通'
            }
        ]
    ],
    []
];

// 评论列表容器
const $demoCaseContainer = $('#demo-case-container');
const $tagListContainer  = $('#tag-list-container');

// 当前demo序号
let currentDemoNum = 0;

/**
 * 渲染demo
 *
 * @param {number} demoNum 需要展示的demo的序号
 */
const paintDemo = demoNum => {
    // 关键词数据
    let existTagData = {};
    // 一个demo多个句子，最终分析结果数据结合，每个成员是一个句子
    let sentenceDataArray = [];
    // 正负向最大累计值
    let topValue = 0;
    sentencesGroup[demoNum].forEach((sentence, sentenceIndex) => {
        // 句子逐字转化为数据对象
        const sentenceData = [].map.call(
            sentence,
            word => {
                return {
                    // 文字
                    word,
                    // 文字的情感, 默认每个字没情感
                    attitude: ATTITUDE.NONE
                };
            }
        );

        // 当前这条评论的分析结果
        const analyzeResult = scopes[demoNum][sentenceIndex];

        // 逐一过分析结果段落
        for (let {scope, attitude, tag, weight} of analyzeResult) {
            // 根据分析结果，为这个字填充上情感标识
            const startPos = sentence.indexOf(scope);
            const scopeLength = scope.length;
            for (let i = startPos; i < startPos + scopeLength; i++) {
                sentenceData[i].attitude = attitude;
            }

            // 唯一化关键词数据
            if (!existTagData.hasOwnProperty(tag)) {
                // 初始化
                existTagData[tag] = {
                    [ATTITUDE.POSITIVE]: {
                        value: 0
                    },
                    [ATTITUDE.NEGATIVE]: {
                        value: 0
                    }
                };

                // 填上第一个值
                existTagData[tag][attitude].value = weight;
            }
            else {
                existTagData[tag][attitude].value += weight;
            }

            const tempValue = existTagData[tag][attitude].value;
            if (existTagData[tag][attitude].value > topValue) {
                topValue = tempValue;
            }
        }

        sentenceDataArray.push(sentenceData);
    });

    // 左侧评论列表HTML集合
    let caseList = [];
    sentenceDataArray.forEach((sentenceData, caseIndex) => {
        // 一条评论的html
        const commentHTML = sentenceData
            .map(
                ({word, attitude}) => `<span class="attitude-${attitude}">${word}</span>`
            )
            .join('');

        caseList.push(`<div class="comment-demo-case">${caseIndex + 1}.${commentHTML}</div>`);
    });

    // 对比图html集合，待拼接
    const contrastHTMLArr = [];
    // 右侧绘图
    for (let tagName of Object.keys(existTagData)) {
        // 一个tag的正反向值
        const positiveValue = existTagData[tagName][ATTITUDE.POSITIVE].value;
        const negativeValue = existTagData[tagName][ATTITUDE.NEGATIVE].value;

        // bar长度，单位是百分比
        const positivePercentage = `${(positiveValue / topValue) * 100}%`;
        const negativePercentage = `${(negativeValue / topValue) * 100}%`;

        const commentHTML = [
            '<div class="comment-tag-item">',
            '    <div class="comment-negative-bar">',
            `        <div class="comment-negative-value" style="width: ${negativePercentage}"></div>`,
            '    </div>',
            `    <div class="comment-tag-name">${tagName}</div>`,
            '    <div class="comment-positive-bar">',
            `        <div class="comment-positive-value" style="width: ${positivePercentage}"></div>`,
            '    </div>',
            '</div>'
        ].join('\r');

        contrastHTMLArr.push(commentHTML);
    }

    // 一次渲染，生成DOM结构，避免重复DOM操作
    $demoCaseContainer.html(caseList.join('\r'));
    $tagListContainer.html(contrastHTMLArr.join('\r'));
};

// 渲染首个demo case
paintDemo(currentDemoNum);

// case点击效果
$('.case-indicator > li').click(function () {
    $('.case-indicator > li').each((i, e) => {
        $(e).toggleClass('active', i === $(this).index());
    });
    $('.case-item').each((i, e) => {
        $(e).toggleClass('active', i === $(this).index());
    });
});
