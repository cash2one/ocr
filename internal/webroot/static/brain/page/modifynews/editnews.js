(function () {
    var css = document.currentScript.src.split('/');
    css.pop();
    css.push('editor.css');
    css = css.join('/');
    console.log(css);
    CKEDITOR.replace('content', {
        contentsCss: css,
        enterMode: CKEDITOR.ENTER_DIV,
        filebrowserUploadUrl: '/internal/news?action=pic'
    });
    var url = '/internal/news?action=add';
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
        json['time'] = json['time'] ? (function () {
            var time = new Date(json['time']);
            return parseInt(time.getTime() / 1000, 10);
        })() : parseInt((new Date).getTime() / 1000, 10);
        confirm('确认?') && submit(json);
    });

    function submit(json) {
        $.post(url, json, undefined, 'json').then(function () {
            alert('提交成功');
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