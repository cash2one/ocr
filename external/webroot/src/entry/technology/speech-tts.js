/**
 * @file speech-语音合成脚本入口
 * @author shiliang@baidu.com
 */

import $ from 'jquery';
import {Howl} from 'howler';
import noUiSlider from 'nouislider';
import {synthesizeSpeech} from '../../model/demoAPI';
import AlertModal from '../../component/widget/alertModal';

import 'less/technology/speech-tts.less';

/* eslint-disable */
import '!file-loader?name=./../../template/cloud/[name].html!extract-loader!html-loader!view/technology/speech-tts.html';
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

    let sound = null;
    // 修改语音的标准或情感设定
    $('.demo-settings .btn-normal').click(function () {
        if (sound) {
            sound.stop();
        }
        $('.demo-settings .btn-normal').removeClass('selected');
        $(this).addClass('selected');
    });

    // 修改语音的速度设定
    $('.demo-speed > a').click(function () {
        if (sound) {
            sound.stop();
        }
        let currentSpeed = parseInt($('.demo-current-speed').attr('data-speed'), 10);

        if ($(this).hasClass('decrease')) {
            currentSpeed -= 2;
        }
        else if ($(this).hasClass('increase')) {
            currentSpeed += 2;
        }
        if (currentSpeed >= 1 && currentSpeed <= 9) {
            $('.demo-current-speed').attr('data-speed', currentSpeed);
        }
    });

    // 初始化音量滚动条
    let volumeSlider = document.querySelector('.volume-slider');
    noUiSlider.create(
        volumeSlider,
        {
            start: 5,
            connect: 'lower',
            step: 1,
            range: {
                min: 1,
                max: 9
            }
        }
    );

    volumeSlider.noUiSlider.on('update', function (values) {
        if (sound) {
            sound.stop();
        }
        $(volumeSlider).attr('data-volume', parseInt(values, 10));
    });

    // 监听输入框，并对字数进行限制
    $('#demo-text-content').on('keydown keyup change', function () {
        $('.demo-text').attr('data-counter', 200 - $(this).val().length);
    });


    $('.demo-control').on('click', '.player.play', function () {
        let speed = parseInt($('.demo-current-speed').attr('data-speed'), 10);
        let volume = parseInt($('.volume-slider').attr('data-volume'), 10);
        let person = parseInt($('.demo-settings .btn-normal.selected').attr('data-per'), 10);
        let text = $('#demo-text-content').val() || $('#demo-text-content').attr('placeholder');
        let player = $(this);
        synthesizeSpeech({
            data: {
                speed: speed,
                vol: volume,
                person: person,
                text: text
            },
            success(res) {
                if (res.errno === 1) {
                    new AlertModal('访问接口出错，请登陆百度账号后再尝试该项服务！');
                    return false;
                }
                else if (res.errno !== 0) {
                    new AlertModal('访问接口出错，请稍候再试！');
                    return false;
                }
                sound = new Howl({
                    src: [res.data]
                });
                player.removeClass('play').addClass('pause');
                sound.play();

                sound.once('stop', function () {
                    player.removeClass('pause').addClass('play');
                });
                sound.once('end', function () {
                    player.removeClass('pause').addClass('play');
                });
            },
            fail(xhr) {
                if (sound) {
                    sound.stop();
                }
                new AlertModal('接口发生错误：' + xhr.status + ' - ' + xhr.statusText);
            }
        });
    });

    $('.demo-control').on('click', '.player.pause', function () {
        if (sound) {
            sound.stop();
        }
    });
});
