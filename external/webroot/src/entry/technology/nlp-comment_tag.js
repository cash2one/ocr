/**
 * @file nlp评论抽取demo
 * @author Franck Chen(chenfan02@baidu.com)
 */

import $ from 'jquery';

import 'less/technology/nlp-comment_tag.less';

/* eslint-disable */
import '!file-loader?name=./../../template/cloud/[name].html!extract-loader!html-loader!view/technology/nlp-comment_tag.html';
/* eslint-enable */

const ATTITUDE = {
    NEGATIVE: 0,
    POSITIVE: 1,
    NONE: 2
};

/* eslint-disable */
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
        '真的非常好，是冲着评论去的，味道非常好，态度也好',
        '不错哦#烧春鸡# 很不错，环境也不错啊！服务也很好，小妹也漂亮',
        '价格实惠 口感不错 品质出众',
        '当地的朋友带去玩的 环境不太好 但是烧烤很好吃 非常入味 虾也很新鲜',
        '味道很不错，很喜欢吃。服务也很好感觉很亲切，吃的很舒服，谢谢',
        '奶茶很好喝，炸鸡也很好吃，下次还会买',
        '团购划算 优惠活动多 店面不错',
        '菜量很足，味道很辣，也很美味，环境一般了。服务态度很好。',
        '性价比非常高，东西也好吃，环境非常好',
        '位置很好找，正好修地铁，车很少，还比较安静，周围的吃饭的地方很多，下楼就要，环境不错，卫生'
    ],
    [
        '服务态度不好，让调个温度等了好长时间，以后再也不来了',
        '环境不错，新歌很多！音响也好',
        '音质很好，非常不错哦，环境也很好',
        '还不错，比较实惠。不过里面的环境不是很好！音响还可以！',
        '环境非常好，服务非常好，音效非常好',
        '音乐效果很好，新装修的环境不错，服务也好！！！',
        '里面环境很好，服务态度也好，音响效果也不错，送的蓝莓李很好吃',
        '5分，环境还不错，服务态度有待提高',
        '麦克风不错 音效出色 团购价划算',
        '好好好好，服务好，设备好，环境好'
    ],
    [
        '如果要提油耗日系车当然低，这是他们的优势。车身轻安全性能低是他们的死穴！牧马人的内饰谈不上精致，但是相对给男人来开显得粗狂大气，动力足！户外撒野绝对给力！普拉高速不稳定，属于城市SUV如果越野就坑爹了。。综合性能比较，牧马人性价比高。',
        '个人觉得福克斯好，外观漂亮年轻，动力和操控性都不错',
        '空间挺大的   油耗也很低   我磨合期7.4L/KM  相信过了磨合期会更低',
        '个人感觉骊威不如POLO，对车了解的不多，买车的话可以推荐你参加石家庄乐 购汽车网的团购，价格比较实惠，比自己买省不少。',
        '外观不错，流线做得很好，看起来比较大方。车内空间算比较大，就是价格有点高。中国第一百货办的“三子抽奖”，车子免费送，免费的，谁不想要啊！',
        '建议5000公里，更换机油和三滤，桑塔纳的配件很便宜，汽油滤清器和空气滤清器加一起也不超过50元，一年下来也多花不了多少，但是对车一定是有好处的。',
        '性能挺好的啊，性价比也还可以，你是做什么用途啊？',
        'MG7本身的车身行车稳定已经做的很好了,开过你就知道。装ESP就相当于给会游泳的人塞上个救生圈。',
        '北斗星更好些，油耗低，皮实，保养维修费用低。',
        '客观的说同为日本车，FIT无论从品牌保值，油耗，空间，操控等等都是马2不能比的，马2小气，空间狭小，飞度实用性强，后备箱同级卓越，再看看保有量，飞度满街飞，马2机会看不到，所以飞度完胜！'
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
    [
        [
            {
                // 内容块
                scope: '味道非常好',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '味道'
            },
            {
                scope: '态度也好',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '态度'
            }
        ],
        [
            {
                // 内容块
                scope: '环境也不错',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '环境'
            },
            {
                scope: '服务也很好',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '服务'
            }
        ],
        [
            {
                // 内容块
                scope: '价格实惠',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '价格'
            },
            {
                scope: '口感不错',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '口感'
            }
        ],
        [
            {
                // 内容块
                scope: '环境不太好',
                // 态度
                attitude: ATTITUDE.NEGATIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '环境'
            },
            {
                scope: '烧烤很好吃',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '烧烤'
            },
            {
                scope: '虾也很新鲜',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '虾'
            }
        ],
        [
            {
                // 内容块
                scope: '味道很不错',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '味道'
            },
            {
                scope: '服务也很好',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '服务'
            }
        ],
        [
            {
                // 内容块
                scope: '奶茶很好',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '奶茶'
            },
            {
                scope: '炸鸡也很好吃',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '炸鸡'
            }
        ],
        [
            {
                // 内容块
                scope: '团购划算',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '团购价格'
            },
            {
                scope: '活动多',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '优惠活动'
            },
            {
                scope: '优惠活动多',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '优惠活动'
            },
            {
                scope: '店面不错',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '店面'
            }
        ],
        [
            {
                // 内容块
                scope: '菜量很足',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '份量'
            },
            {
                scope: '量很足',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '份量'
            },
            {
                scope: '味道很辣',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '味道'
            },
            {
                scope: '环境一般',
                attitude: ATTITUDE.NEGATIVE,
                weight: 2,
                tag: '环境'
            }
        ],
        [
            {
                // 内容块
                scope: '性价比非常高',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '性价比'
            },
            {
                scope: '东西也好吃',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '东西'
            },
            {
                scope: '环境非常好',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '环境'
            }
        ],
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
                scope: '环境不错',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '环境'
            }
        ]
    ],
    [
        [
            {
                // 内容块
                scope: '服务态度不好',
                // 态度
                attitude: ATTITUDE.NEGATIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '服务态度'
            },
            {
                scope: '态度不好',
                attitude: ATTITUDE.NEGATIVE,
                weight: 2,
                tag: '服务态度'
            }
        ],
        [
            {
                // 内容块
                scope: '环境不错',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '环境'
            },
            {
                scope: '音响也好',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '音响'
            }
        ],
        [
            {
                // 内容块
                scope: '音质很好',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '音质'
            }
        ],
        [
            {
                // 内容块
                scope: '环境不是很好',
                // 态度
                attitude: ATTITUDE.NEGATIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '环境'
            },
            {
                scope: '音响还可以',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '音效'
            }
        ],
        [
            {
                // 内容块
                scope: '环境非常好',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '环境'
            },
            {
                // 内容块
                scope: '服务非常好',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '服务'
            },
            {
                // 内容块
                scope: '音效非常好',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '音效'
            }
        ],
        [
            {
                // 内容块
                scope: '音乐效果很好',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '音乐效果'
            },
            {
                scope: '环境不错',
                attitude: ATTITUDE.NEGATIVE,
                weight: 2,
                tag: '环境'
            },
            {
                scope: '新装修',
                attitude: ATTITUDE.NEGATIVE,
                weight: 2,
                tag: '装修'
            },
            {
                scope: '服务也好',
                attitude: ATTITUDE.NEGATIVE,
                weight: 2,
                tag: '服务'
            }
        ],
        [
            {
                // 内容块
                scope: '环境很好',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '环境'
            },
            {
                scope: '服务态度也好',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '服务态度'
            },
            {
                scope: '效果也不错',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '效果'
            },
            {
                scope: '音响效果也不错',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '音效'
            }
        ],
        [
            {
                // 内容块
                scope: '环境还不错',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '环境'
            },
            {
                scope: '服务态度有待提高',
                attitude: ATTITUDE.NEGATIVE,
                weight: 2,
                tag: '服务态度'
            }
        ],
        [
            {
                // 内容块
                scope: '麦克风不错',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '麦克风'
            },
            {
                scope: '音效出色',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '音效'
            },
            {
                scope: '团购价划算',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '团购'
            },
            {
                scope: '团购价划算',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '团购'
            }
        ],
        [
            {
                // 内容块
                scope: '服务好',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '服务'
            },
            {
                scope: '设备好',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '印象'
            },
            {
                scope: '环境好',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '环境'
            }
        ]
    ],
    [
        [
            {
                // 内容块
                scope: '内饰谈不上精致',
                // 态度
                attitude: ATTITUDE.NEGATIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '内饰'
            },
            {
                scope: '动力足',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '动力'
            }
        ],
        [
            {
                // 内容块
                scope: '外观漂亮',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '外形'
            },
            {
                scope: '动力和操控性都不错',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '操控性'
            },
            {
                scope: '动力和操控性都不错',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '动力'
            }
        ],
        [
            {
                // 内容块
                scope: '空间挺大',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '空间'
            },
            {
                scope: '油耗也很低',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '耗油量'
            }
        ],
        [
            {
                // 内容块
                scope: '价格比较实惠',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '价钱'
            }
        ],
        [
            {
                // 内容块
                scope: '外观不错',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '外观'
            },
            {
                // 内容块
                scope: '车内空间算比较大',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '空间'
            },
            {
                // 内容块
                scope: '价格有点高',
                // 态度
                attitude: ATTITUDE.NEGATIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '价格'
            }
        ],
        [
            {
                // 内容块
                scope: '配件很便宜',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '配件'
            }
        ],
        [
            {
                // 内容块
                scope: '性能挺好',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '性能'
            },
            {
                scope: '性价比也还可以',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '性价比'
            }
        ],
        [
            {
                // 内容块
                scope: '车身行车稳定',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '车身'
            }
        ],
        [
            {
                // 内容块
                scope: '油耗低',
                // 态度
                attitude: ATTITUDE.POSITIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '耗油量'
            },
            {
                scope: '费用低',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '费用'
            }
        ],
        [
            {
                // 内容块
                scope: '空间狭小',
                // 态度
                attitude: ATTITUDE.NEGATIVE,
                // 情绪权重
                weight: 2,
                // 评论维度
                tag: '空间'
            },
            {
                scope: '实用性强',
                attitude: ATTITUDE.POSITIVE,
                weight: 2,
                tag: '实用性'
            }
        ]
    ]
];
/* eslint-enable */

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

        analyzeResult.forEach(({scope, attitude, tag, weight}) => {
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
        });

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
    Object.keys(existTagData).forEach(tagName => {
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
            '    <div class="comment-tag-name-container">',
            `        <div class="comment-tag-name">${tagName}</div>`,
            '    </div>',
            '    <div class="comment-positive-bar">',
            `        <div class="comment-positive-value" style="width: ${positivePercentage}"></div>`,
            '    </div>',
            '</div>'
        ].join('\r');

        contrastHTMLArr.push(commentHTML);
    });

    // 一次渲染，生成DOM结构，避免重复DOM操作
    $demoCaseContainer.html(caseList.join('\r'));
    $tagListContainer.html(contrastHTMLArr.join('\r'));
};

// 渲染首个demo case
paintDemo(currentDemoNum);

const $demoSwitch = $('#demo-switch');
const caseCount = sentencesGroup.length;
// 切换demo
$demoSwitch.on('click', () => {
    let nextCaseNum = currentDemoNum + 1;

    if (nextCaseNum >= caseCount) {
        nextCaseNum = 0;
    }

    paintDemo(nextCaseNum);

    currentDemoNum = nextCaseNum;
});

// case点击效果
$('.case-indicator > li').click(function () {
    $('.case-indicator > li').each((i, e) => {
        $(e).toggleClass('active', i === $(this).index());
    });
    $('.case-item').each((i, e) => {
        $(e).toggleClass('active', i === $(this).index());
    });
});
