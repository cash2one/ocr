require('brain:widget/pager/pager.js');
var countPerPage = 10,
    page = $('.pg').page({pageNum: countPerPage});
var q = query();
var url = 'http://cp01-bdg-rp-2015q4-68.epc.baidu.com:8580/news?action=list&source=' + q['source'] + '&pn=0&rn=9999999';
var dom = $('.lst');
$(document.body).on('click', '.del', function (e) {
    e.preventDefault();
    alert('确定删除？');
    $.get($(this).prop('href')).then(function () {
        alert('成功');
        location.reload();
    })
});
$.get(url, undefined, undefined, 'json')
    .then(function (d) {
        return d.data.map(function (item) {
            return {
                title: item.title,
                desc: item.abs,
                time: transformTime(parseInt(item.time, 10) * 1000),
                href: '/news?action=delete&source=' + q['source'] + '&id=' + item.id
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
        s += '<div class="lst-block"><a class="del" href="' + d[i]['href'] + '">';
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
function query() {
    var arr = location.search.substring(1).split('&');
    var ret = {};
    arr.forEach(function (i) {
        ret[i.split('=')[0]] = i.split('=')[1];
    });
    return ret;
}
/*
 $('#nav-contact').prop('href', './home#contact-us');*/
