/**
 * @file speech-语音合成脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';
import {Howl} from 'howler';
import noUiSlider from 'nouislider';
import {synthesizeSpeech} from '../../model/demoAPI';

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

    // 修改语音的标准或情感设定
    $('.demo-settings .btn-normal').click(function () {
        $('.demo-settings .btn-normal').removeClass('selected');
        $(this).addClass('selected');
    });

    // 修改语音的速度设定
    $('.demo-speed > a').click(function () {
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
        $(volumeSlider).attr('data-volume', parseInt(values, 10));
    });

    // 监听输入框，并对字数进行限制
    $('#demo-text-content').keydown(function () {
        $('.demo-text').attr('data-counter', 200 - $(this).val().length);
    });

    let sound = null;

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
            success: function (res) {
                if (res.errno !== 0) {
                    throw res.msg;
                    return false;
                }
                player.removeClass('play').addClass('pause');
                sound = new Howl({
                    src: [res.data]
                });

                sound.once('load', function () {
                    sound.play();
                });

                sound.on('end', function () {
                    player.removeClass('pause').addClass('play');
                });
            }
        });
    });
    $('.demo-control').on('click', '.player.pause', function () {
        if (sound) {
            sound.pause();
        }
        $(this).removeClass('pause').addClass('play');
    });

});