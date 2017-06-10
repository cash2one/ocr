define('brain:widget/home/old.home.js', function(require, exports, module){ /**
 * @file home.js
 * @author huanglinhao
 */


function bindEvent() {
    $(window).resize(function () {
        $('#toggle').css('left', (window.innerWidth - 100) + 'px');
        if ($('.tabindex').css('left') !== '0px') {
            $('.tabindex').css('left', window.innerWidth + 'px');
            $('#tab-border').css('left', window.innerWidth + 'px');
        }
    });
    $('#toggle').click(function () {
        if ($('.tabindex').css('left') === '0px') {
            $('.tabindex').animate({left: window.innerWidth + 'px'}, 'slow');
            $('#tab-border').animate({left: window.innerWidth + 'px'}, 'slow');
        } else {
            $('.tabindex').animate({left: 0}, 'slow');
            $('#tab-border').animate({left: 0}, 'slow');
        };
    });
    $('#menu li').each(function () {
        var id = '#brain-' + $(this).attr('data-menuanchor');
        if ($(this).hasClass('active') === true) {
            $(id).show();
            if ($(this).attr('data-menuanchor') === 'home') {
                $('.tabindex').delay(3000).animate({left: window.innerWidth + 'px'}, 'slow');
                $('#tab-border').delay(3000).animate({left: window.innerWidth + 'px'}, 'slow');
            }
        } else {
            $(id).hide();
        }
    });
    $('#menu li').hover(
        function () {
            var alink = $(this).find('a');
            alink.each(function () {
                $(this).css('opacity', 1);
                if ($(this).hasClass('word') === true) {
                    $(this).css('display', 'inline');
                }
            });
            $(this).addClass('hover');
        },
        function () {
            var alink = $(this).find('a');
            alink.each(function () {
                $(this).css('opacity', .5);
                if ($(this).hasClass('word') === true) {
                    $(this).css('display', 'none');
                }
            });
            $(this).removeClass('hover');
        }
    );

    $('#how-to-start').click(function () {
        var dom = $('#how-to-start').find('.hts');
        $('.ai').slideToggle();
        if (dom.hasClass('up-arrow')) {
            dom.removeClass('up-arrow');
            dom.addClass('down-arrow');
        } else {
            dom.addClass('up-arrow');
            dom.removeClass('down-arrow');
        }
    });
}

window.home = (function () {
    return {
        init: function () {
            $(document).ready(function () {
                bindEvent();
                $('#toggle').css('left', (window.innerWidth - 100) + 'px');
                $('.main').fullpage({
                    anchors: ['home', 'ml', 'bd', 'ocr', 'vic', 'up', 'scene'],
                    menu: '#menu',
                    keyboardScrolling: true,
                    scrollingSpeed: 700,
                    onLeave: function (index, nextIndex, direction) {
                        switch (index) {
                            case 1:
                                $('#brain-home').hide();
                                $('.messagebar').css('opacity', 0);
                                $('.ai').hide();
                                $('.hts').removeClass('down-arrow');
                                $('.hts').addClass('up-arrow');
                                break;
                            case 2:
                                $('#brain-ml').hide();
                                break;
                            case 3:
                                $('#brain-bd').hide();
                                break;
                            case 4:
                                $('#brain-ocr').hide();
                                break;
                            case 5:
                                $('#brain-vic').hide();
                                break;
                            case 6:
                                $('#brain-up').hide();
                                break;
                            case 7:
                                $('#brain-scene').hide();
                                break;
                        }
                        switch (nextIndex) {
                            case 1:
                                $('#brain-home').show();
                                $('.tabindex').css('left', 0);
                                $('#tab-border').css('left', 0);
                                $('.tabindex').delay(3000).animate({left: window.innerWidth + 'px'}, 'slow');
                                $('#tab-border').delay(3000).animate({left: window.innerWidth + 'px'}, 'slow');
                                $('.messagebar').delay(500).animate({opacity: 1}, 'slow');
                                break;
                            case 2:
                                $('#brain-ml').show();
                                $('.tabindex').css('left', window.innerWidth + 'px');
                                $('#tab-border').css('left', window.innerWidth + 'px');
                                break;
                            case 3:
                                $('#brain-bd').show();
                                $('.tabindex').css('left', window.innerWidth + 'px');
                                $('#tab-border').css('left', window.innerWidth + 'px');
                                break;
                            case 4:
                                $('#brain-ocr').show();
                                $('#ocr-scan').css('opacity', 0);
                                $('#ocr-scan').delay(1500).animate({opacity: 1});
                                $('.tabindex').css('left', window.innerWidth + 'px');
                                $('#tab-border').css('left', window.innerWidth + 'px');
                                break;
                            case 5:
                                $('#brain-vic').show();
                                $('.tabindex').css('left', window.innerWidth + 'px');
                                $('#tab-border').css('left', window.innerWidth + 'px');
                                break;
                            case 6:
                                $('#brain-up').show();
                                $('.tabindex').css('left', window.innerWidth + 'px');
                                $('#tab-border').css('left', window.innerWidth + 'px');
                                break;
                            case 7:
                                $('#brain-scene').show();
                                $('.tabindex').css('left', window.innerWidth + 'px');
                                $('#tab-border').css('left', window.innerWidth + 'px');
                                break;
                        }
                    }
                });
            });
        }
    };
})();

exports.init = window.home.init;
 
});