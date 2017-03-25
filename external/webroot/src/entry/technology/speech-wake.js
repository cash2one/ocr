/**
 * @file speech-语音合成脚本入口
 * @author shiliang@baidu.com
 */

import EJS from 'ejs';
import $ from 'jquery';
import {evaluateWakeWords, exportWakeWords} from '../../model/demoAPI';
import AlertModal from '../../component/widget/alertModal';
import ConfirmModal from '../../component/widget/confirmModal';

import 'less/technology/speech-wake.less';

/* eslint-disable */
import '!file-loader?name=./../../template/cloud/[name].html!extract-loader!html-loader!view/technology/speech-wake.html';
/* eslint-enable */

$(document).ready(function () {
    // case点击效果
    $('.case-indicator > li').click(function () {
        $('.case-indicator > li').each((i, e) => {
            $(e).toggleClass('active', i === $(this).index());
        });
        $('.case-item').each((i, e) => {
            $(e).toggleClass('active', i === $(this).index());
        });
    });

    // 收缩规则内容
    $('.rule-toggle').click(function () {
        let isCollapsed = $('.demo-rule').hasClass('collapsed');
        $('.demo-rule').toggleClass('collapsed', !isCollapsed);
        $(this).html(isCollapsed ? '收起内容' : '展开内容');
    });

    // copy from yuyin.baidu.com  wakeTry.js
    let test = function (e, t) {
        let n = {
            star: 0,
            desc: '',
            length: 0,
            zl: 0
        };
        let r = 0;
        let i = '得分低于60, 不可用作唤醒词';
        let s = '';
        let o = [
            '拍照', '茄子', '增大音量', '减小音量', '播放',
            '停止', '暂停', '上一首', '下一首', '打开电灯',
            '关闭电灯', '增大亮度', '减小亮度', '打开手电筒', '关闭手电筒'
        ];
        if ($.inArray(e, o) >= 0) {
            n.zl = 1;
            r = 5;
        }
        else if (/\d+/.test(e)) {
            r = 1;
        }
        else {
            let u = !1;
            let a = 0;
            let f = 0;
            for (let l = 0; l < e.length; l++) {
                e.charAt(l).match(/^[a-zA-Z]$/) !== null && a++,
                e.charAt(l).match(/^[\u4e00-\u9fa5a-zA-Z]$/) === null && f++;
            }
            a > 2 && (u = !0,
                r = 1,
                s = '一个唤醒词最多只能包含两个英文字母，且唤醒词中暂时不支持英文单词，请更换别的唤醒词。'),
            f > 0 && (u = !0,
                r = 1,
                s = '唤醒词不可包含汉字和英文字母以外的字符，请使用相应的汉字作为唤醒词，如非常6+7，建议您使用“非常六加七”');
            if (u === !1) {
                if (e.length === 4) {
                    t < 500 ? r = 5 : t >= 500 && t < 1e3 ? r = 4 : t >= 1e3 < 1500 && (r = 3);
                }
                else if (e.length === 3 || e.length === 5) {
                    t < 500 ? r = 3 : t >= 500 && t < 1e3 ? r = 2 : r = 1;
                }
            }
        }
        switch (r) {
            case 5:
                i = '非常适用于作为唤醒词。';
                break;
            case 4:
                i = '可以用作唤醒词，唤醒词只允许3-5个字, 并且推荐4个字。';
                break;
            case 3:
                i = '不建议用作唤醒词，唤醒词只允许3-5个字, 并且推荐4个字。';
                break;
            default:
                i = '不可用作唤醒词，唤醒词只允许3-5个字, 并且推荐4个字。';
        }
        return s !== '' && (i = s),
            n.star = r,
            n.desc = i,
            n.length = e.length,
            n;
    };

    let downloadChanceCount = 0;

    const EVALUATED_WORD_ITEM = [
        '<li data-star="<%=score.star%>">',
            '<div class="word"><%=word%></div>',
            '<div class="clear-float">',
                '<div class="word-score">',
                '<% for (var i = 1; i <= 5; i++) { %>',
                '<div class="<%=score.star >= i ? \'star\' : \'no-star\'%>"></div>',
                '<%}%>',
                '</div>',
                '<div class="word-desc"><%=score.desc%></div>',
            '</div>',
        '</li>'
    ].join('');

    let insertEvaluatedWords = function (word, score) {
        $('#evaluated-words').append(
            EJS.render(EVALUATED_WORD_ITEM, {word, score})
        );
    };

    // 开始评估唤醒词
    $('#evaluate').click(function () {
        let words = $('#demo-wake-word').val();
        if (!words) {
            return  false;
        }
        evaluateWakeWords({
            words: words,
            success(res) {
                if (res.errno === 1) {
                    new AlertModal('访问接口出错，请登陆百度账号后再尝试该项服务！');
                    return false;
                }
                else if (res.errno !== 0) {
                    new AlertModal('访问接口出错，请稍候再试！');
                    return false;
                }
                $('#demo-wake-word').val('');
                $('.evaluated-result').show();
                downloadChanceCount = res.data.sCount;

                Object.keys(res.data.sData).forEach(word => {
                    let score = test(word, res.data.sData[word]);
                    insertEvaluatedWords(word, score);
                });
            }
        });
    });

    // 勾选唤醒词
    $('#evaluated-words').on('click', 'li', function () {
        let star = $(this).attr('data-star');
        if (star <= 3) {
            new AlertModal('你好，只能导出三星以上唤醒词！');
            return false;
        }
        $(this).toggleClass('checked');
    });

    $('#export-evaluated-words').click(function (e) {
        e.stopPropagation();
        let selectedWords = $('#evaluated-words').find('li.checked');
        if (selectedWords.length > 10) {
            new AlertModal('对不起，您只能选择10个以内的唤醒词！');
            return false;
        }
        else if (selectedWords.length === 0) {
            new AlertModal('对不起，您未选择任何唤醒词！');
            return false;
        }
        let existedWord = [
            '拍照', '茄子', '增大音量', '减小音量', '播放',
            '停止', '暂停', '上一首', '下一首', '打开电灯',
            '关闭电灯', '增大亮度', '减小亮度', '打开手电筒', '关闭手电筒'
        ];
        let twoWordCounter = 0;
        let customizedWordCounter = 0;
        let words = [];
        selectedWords.each(function (i, e) {
            let word = $(e).find('.word').html();
            words.push(word);
            twoWordCounter += (word.length === 2 ? 1 : 0);
            customizedWordCounter += (existedWord.indexOf(word) === -1 ? 1 : 0);
        });
        if (twoWordCounter > 3) {
            new AlertModal('对不起，您最多可以设置3个两字指令唤醒词!');
            return false;
        }
        if (customizedWordCounter > 3) {
            new AlertModal('对不起，您最多可以设置3个自定义唤醒词!');
            return false;
        }
        if (downloadChanceCount >= 3) {
            new AlertModal('对不起，您本月已导出3次唤醒词，无法再使用该服务!');
            return false;
        }

        words = words.join(',');
        new ConfirmModal(
            '确认导出',
            '您好，您本次选择提的交唤醒词是[' + words + ' ]，您本月还有' + (3 - downloadChanceCount) + '次提交机会，请确认提交！',
            function () {
                exportWakeWords({words});
                $('.evaluated-result').hide();
                $('#evaluated-words').empty();
            }
        );
    });
});
