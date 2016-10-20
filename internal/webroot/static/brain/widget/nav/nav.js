define('brain:widget/nav/nav.js', function(require, exports, module){

/**
 * @file nav.js
 */
(function () {
    $(document).ready(function () {
        $('#nav-' + (location.pathname.split('/')[1] || 'home')).addClass('active');
        //$('#nav-voice').addClass('active');
        $('#hts-btn').hover(function (){
            $('#hts-detail').slideToggle();
        }, function (){});
        $('#hts-detail').mouseleave(function () {
            $('#hts-detail').slideToggle();
        });
    });
})();




});