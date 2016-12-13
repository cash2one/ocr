/**
 * @file: brain.js
 * ver: 1.0
 * update: 2016/05/10
 */

(function () {
    $('[data-anim]').each(function (index, elem) {
        elem = $(elem);
        var delay = parseInt(elem.data('anim-delay'), 10) || 0;
        elem.addClass(elem.data('anim')).css({
            animationPlayState: 'paused'
        });
        setTimeout(function () {
            elem.css({
                animationPlayState: ''
            });
        }, delay * 1000);
    });

    $.get('./news?action=list&pn=0&rn=9999999', undefined, undefined, 'json')
        .then(function (d) {
            var dom = $('.add-news');
            var length = d.data.length;
            d.data = d.data.slice(0, 3);
            d.data.forEach(function (item) {
                dom.append(
                    '<a target="_blank" href="'
                    + './news?action=detail&id=' + item['id']
                    + '" title="' + item['title']
                    + '"><span class="js-content-item">'
                    + (item['title'].length > 20 ? item['title'].substring(0, 20) + '...' : item['title'])
                    + '[' + transformTime(1000 * item['time']) + ']</span></a>'
                );
            });

            dom.append('<a target="_blank" href="'
            + './news'
            + '"><span class="js-content-item">'
            + '更多>'
            + '</span></a>')
        });


    function transformTime(time) {
        var t = new Date(),
            year, month, date;
        t.setTime(time);
        year = t.getFullYear();
        month = t.getMonth() + 1;
        month = month < 10 ? ('0' + month) : month;
        date = t.getDate();
        date = date < 10 ? ('0' + date) : date;
        return [year, month, date].join('-');
    }


})();