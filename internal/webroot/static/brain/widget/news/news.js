define('brain:widget/news/news.js', function(require, exports, module){

require('brain:widget/pager/pager.js');
var countPerPage = 10,
    page = $('.pg').page({pageNum: countPerPage});

    var url = '/internal/news?action=list&pn=0&rn=9999999';
var dom = $('.lst');

$.get(url, undefined, undefined, 'json')
    .then(function (d) {
        return d.data.map(function (item) {
            return {
                title: item.title,
                desc: item.abs,
                time: transformTime(parseInt(item.time, 10) * 1000),
                href: '/internal/news?action=detail&id=' + item.id
            }
        });
    }, function () {
        return []
    })
    .always(function (d) {
        r(d.slice(0, countPerPage));
        page.onChange(function (o) {
            r(d.slice(o.index * countPerPage, o.index * countPerPage + countPerPage));
            document.documentElement.scrollTop = 0;
        });
        page(d.length);
    });

function r(d) {
    var s = '';
    for (var i in d) {
        s += '<div class="lst-block"><a href="' + d[i]['href'] + '">';
        s += '<div class="block-title"><span class="block-title-text" style="margin-right: 10px">' + d[i]['title'] + '</span><span>[' + d[i]['time'] + ']</span></div>';
        s += '<div class="block-desc">' + d[i]['desc'] + '</div>';
        s += '</a></div>';
    }
    dom.html(s);
}

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

});