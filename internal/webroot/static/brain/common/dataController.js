/**
 * @file datacontroller.js
 */
var CONFIG = {
    ajaxUrl: '/load/',
    ajaxApi: {
        // 测试接口
        upload: 'upload/uploadfile',
        historyList: 'api/filelist',
        manageData: 'upload/manageupload',
        login: '',
        list: ''
    },
    uploadArgs: {},
    loginArgs: {
        // 登录请求默认参数配置 按需补充
        'sample': ''
    },
    listArgs: {},
    dialog: {
        // loading: $('#loading-dialog'),
        // nodata: $('#nodata-dialog'),
        // mask: $('#dialog-mask'),
        // error: $('#error-dialog')
    }
};

var dataController = (function (config) {
    var args = {
        // upload: config.uploadArgs,
        // list: config.listArgs
    };
    var dom = {
        // loading: config.dialog.loading,
        // nodata: config.dialog.nodata,
        // error: config.dialog.error,
        // mask: config.dialog.mask
    };
    function getPara(args) {
        var argArr = [];
        $.each(args, function (objKey, objValue) {
            argArr.push(objKey + '=' + encodeURI(objValue));
        });
        return argArr.join('&');
    }

    function getData(apiUrl, args, callback) {
        return $.ajax({
                type: 'GET',
                url: config.ajaxUrl + apiUrl,
                data: getPara(args),
                dataType: 'json',
                success: function (data) {
                    callback(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    showError();
                }
            });
    }

    function postData(apiUrl, args, beforeSend, success, fail, xhr) {
        return $.ajax({
            type: 'POST',
            url: config.ajaxUrl + apiUrl,
            data: args,
            dataType: 'json',
            beforeSend: function () {
                beforeSend();
            },
            success: function (data) {
                success(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                showError();
                fail();
            }
        });
    }

    function postDataWithProgress(args, success, fail, progress) {
        postData(config.ajaxUrl + config.ajaxApi.upload,
            args,
            function () {},
            success,
            fail,
            function () {
                var xhr = $.ajaxSettings.xhr();
                xhr.upload.addEventListener('progress', progress, false);
                return xhr;
            });
    }

    function validData(data) {
        if (data.error === 0) {
            return true;
        } else {
            showError();
            return false;
        }
    }

    function clear() {
        // dom.loading.hide();
        // dom.nodata.hide();
        // dom.error.hide();
        // dom.mask.hide();
    }

    function showLoading() {
        clear();
        dom.loading.show();
        showMask();
    }

    function hideLoading() {
        dom.loading.hide();
        hideMask();
    }

    function showNodata() {
        clear();
        dom.nodata.show();
        showMask();
    }

    function hideNodata() {
        dom.nodata.hide();
        hideMask();
    }

    function showError() {
        // clear();
        // dom.error.show();
        // showMask();
    }

    function hideError() {
        dom.error.hide();
        hideMask();
    }

    function showMask() {
        dom.mask.show();
    }

    function hideMask() {
        dom.mask.hide();
    }

    return {
        getList: function (cate, callback) {
            // var data = getData(args.list, function (data) {
            //     if (validData(data)) {
            //         callback(data.loca);
            //     }
            // });
        },
        getFileHistoryList: function (param, callback) {
            getData(config.ajaxApi.historyList, param, callback);
        },
        postUpload: function (datatype, interval, callback) {
            // showLoading();
            // var dataArr = [];
            // getData(args.upload, function (data) {
            //     if (!validData(data)) {
            //         return false;
            //     }
            //     hideLoading();
            //     callback(data);
            // });
        },
        postDataWithProgress: function (args, success, fail, progress) {
            $.ajax({
                type: 'POST',
                url: config.ajaxUrl + config.ajaxApi.upload,
                data: args,
                processData: false,
                contentType: false,
                dataType: 'json',
                xhr: function () {
                    var xhr = $.ajaxSettings.xhr();
                    xhr.upload.addEventListener('progress', progress, false);
                    return xhr;
                },
                success: function (data) {
                    success(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    showError();
                    fail();
                }
            });
        },
        ignoreDuplicated: function (newId, success, fail) {
            postData(config.ajaxApi.manageData,
                {
                    action: 'ignore',
                    newId: newId
                },
                function () {}, success, fail, function () {});
        },
        mergeDuplicated: function (newId, success, fail) {
            postData(config.ajaxApi.manageData,
                {
                    action: 'merge',
                    newId: newId
                },
                function () {}, success, fail, function () {});
        }
    };
})(CONFIG);