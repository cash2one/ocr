define('brain:widget/nav/nav.js', function(require, exports, module){

/**
 * @file nav.js
 */
(function () {
    $(document).ready(function () {
        // $('#nav-' + (location.pathname.split('/')[1] || 'home')).addClass('active');
        var find = location.pathname.split('/').reduce(function (prev, now) {
            var $item = $('#nav-' + now);
            $item.addClass('active');
            return prev || ($item.length > 0);
        }, false);
        if (!find)
            $('#nav-home').addClass('active');

        //$('#nav-voice').addClass('active');
        $('#hts-btn').hover(function () {
            $('#hts-detail').slideToggle();
        }, function () {
        });
        $('#hts-detail').mouseleave(function () {
            $('#hts-detail').slideToggle();
        });
    });
})();




});