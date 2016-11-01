/**
 * @file voice.js
 */
/*(function () {
 $(document).ready(function () {
 $('#nav-' + (location.pathname.split('/')[1] || 'home')).addClass('active');
 //$('#nav-voice').addClass('active');
 });
 })();*/
/*

 window.voice = (function () {
 return {
 init: function () {
 }
 };
 })();
 exports.init = window.voice.init;
 */


var duration = 4000;
var count = 6;
var speed = 1000;
var state = {
    set index(val) {
        var me = this;
        clearTimeout(me.timeout);
        clearTimeout(me.transitionTimeout);
        val = val % (count + 1);
        $('.scroll').css({
            // transform: 'translate(-' + val + '00%,0)',
            marginLeft: '-' + val + '00%',
            transition: 'all ' + (speed / 1000) + 's'
        });
        val = val % count;
        $('.tip-btn').removeClass('on').eq(val).addClass('on');

        this.transitionTimeout = setTimeout(function () {
            $('.scroll').css({
                transition: ''
            });
            if (val === 0) {
                $('.scroll').css({
                    // transform: ''
                    marginLeft: ''
                })
            }
            me.transitionTimeout = null;
        }, speed);

        this.timeout = setTimeout(function () {
            me.index = 1 + me._index;
        }, duration);

        this._index = val;
    },
    get index() {
        return this._index;
    },
    pause: function () {
        if (this.transitionTimeout) {
            return;
        }
        clearTimeout(this.timeout);
    },
    resume: function () {
        var me = this;
        this.timeout = setTimeout(function () {
            me.index++;
        }, duration);
    },
    timeout: null
};

state.index = 0;

$('.tip-btn').each(function (index, el) {
    $(el).on('click', function () {
        state.index = index;
    });
});

$('.scroll').on('mouseenter', function () {
    state.pause();
}).on('mouseleave', function () {
    state.resume();
});