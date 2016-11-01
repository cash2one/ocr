(function () {
    var q = query();
    var detailUrl = 'http://cp01-bdg-rp-2015q4-68.epc.baidu.com:8580/news?action=detail2&source='+ q['source'] +'&id=' + q['id'];
    var url = 'http://cp01-bdg-rp-2015q4-68.epc.baidu.com:8580/news?action=update';
    $.get(detailUrl, undefined, undefined, 'json')
        .then(function (d) {
            var content = d.data['content'];
            var title = d.data['title'];
            var family = d.data['link'];
            var author = d.data['author'];
            var time = d.data['time'];

            $('[name=title]').val(title);
            $('[name=author]').val(author);
            $('[name=link]').val(family);
            $('[name=time]').val(time);
            CKEDITOR.instances.content.setData(content);
        });

    var css = document.currentScript.src.split('/');
    css.pop();
    css.push('editor.css');
    css = css.join('/');
    console.log(css);
    CKEDITOR.replace('content', {
        contentsCss: css,
        enterMode: CKEDITOR.ENTER_DIV,
        filebrowserUploadUrl: '/news?action=pic'
    });
    $(document.body).on('click', '.submit', function () {
        var json = $('.frm input').toArray().reduce(function (json, element) {
            json[element.name] = $(element).val();
            return json;
        }, {});
        json['content'] = CKEDITOR.instances.content.getData();
        console.log(json['content'].replace(/\r|\n|<[^>]*?>/g, ''));
        console.log('---');
        console.log(json['content'].replace(/&[^;]*?;|\r|\n|<[^>]*?>/g, '').substring(0, 78));
        json['abs'] = json['content'].replace(/&[^;]*?;|\r|\n|<[^>]*?>/g, '').substring(0, 78) + '...';
        json['id'] = q['id'];
        json['time'] = json['time'] ? (function () {
            var time = new Date(json['time']);
            return parseInt(time.getTime() / 1000, 10);
        })() : parseInt((new Date).getTime() / 1000, 10);
        json['source'] = q['source'] || 'int';
        confirm('确认?') && submit(json);
    });

    function submit(json) {
        $.post(url, json, undefined, 'json').then(function (d) {
            alert(d['msg']);
        });
    }

    function check(elements) {
        var ret = true;
        for (var i = 0; i < elements.length; i++) {
            var r = elements[i].check(elements[i].val);
            if (!r)
                alert(elements[i].errmsg);
            ret = ret && r;
        }
        return ret;
    }

    function notNull(val) {
        return !!$.trim(val);
    }
})();


function query() {
    var arr = location.search.substring(1).split('&');
    var ret = {};
    arr.forEach(function (i) {
        ret[i.split('=')[0]] = i.split('=')[1];
    });
    return ret;
}