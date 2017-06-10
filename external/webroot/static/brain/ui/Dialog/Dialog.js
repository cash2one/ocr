/**
 * @file Dialog Component
 * Depend on jquery jquery.ui jquery.ui.dialog
 * @author lihao15@baidu.com
 */

function Dialog(options) {
    var defaultOptions = {
        width: 420,
        height: 'auto',
        showTitle: true,
        title: '',
        autoHide: 0,
        showSubmit: true,
        showCancel: true,
        buttonText: ['确定', '取消'],
        html: '',
        modal: true,
        selector: null,
        className: '',
        appendTo: 'body',
        onsubmit: null
    };
    this.options = $.extend(true, {}, defaultOptions, options);
    this._initDialog();
}
Dialog.prototype._initDialog = function () {
    var options = this.options;
    var dialogOptions = {
        appendTo: options.appendTo,
        autoFocus: false,
        autoOpen: false,
        close: $.proxy(this, '_onclose'),
        closeOnEscape: true,
        closeText: '关闭',
        dialogClass: options.showTitle ? options.className : options.className + ' hide-title',
        draggable: true,
        height: options.height,
        hide: null,
        maxHeight: false,
        maxWidth: false,
        minHeight: 115,
        minWidth: 115,
        modal: options.modal,
        position: {
            my: 'center',
            at: 'center',
            of: window
        },
        resizable: false,
        show: null,
        title: options.title,
        width: options.width
    };
    var btnArray = [];
    if (options.showSubmit) {
        btnArray.push({
            'text': options.buttonText[0],
            'click': $.proxy(this, '_onsubmit'),
            'class': 'submit-btn'
        });
    }
    if (options.showCancel) {
        btnArray.push({
            'text': options.buttonText[1],
            'click': $.proxy(this, 'close'),
            'class': 'cancel-btn'
        });
    }
    dialogOptions.buttons = btnArray;

    var dialog = null;
    if (options.selector) {
        dialog = $(options.selector);
        if (dialog.attr('type') === 'text/html') {
            dialog = $(dialog.html());
        }
    } else {
        dialog = $('<div>').html(options.html);
    }
    this._dialog = dialog.dialog(dialogOptions);
};
Dialog.prototype._onsubmit = function () {
    if ($.isFunction(this.options.onsubmit)) {
        this.options.onsubmit();
        this.close();
    }
    else {
        this.close();
    }
    // $.isFunction(this.options.onsubmit) && this.options.onsubmit();
};
Dialog.prototype.close = function () {
    this._st && clearTimeout(this._st);
    this._dialog.dialog('close');
    return this;
};
Dialog.prototype.open = function () {
    this._dialog.dialog('option', 'position', {
        my: 'center',
        at: 'center',
        of: window
    });
    this._dialog.dialog('open');
    this._focusTabbable();
    if (this.options.autoHide) {
        this._st = setTimeout($.proxy(this, 'close'), this.options.autoHide);
    }
    return this;
};
Dialog.prototype.destory = function () {
    this._st && clearTimeout(this._st);
    this._dialog.dialog('destory');
    return this;
};
Dialog.prototype.isOpen = function () {
    return this._dialog.dialog('isOpen');
};
Dialog.prototype._focusTabbable = function () {
    var hasFocus = this._dialog.find('[autofocus]');
    if (!hasFocus.length) {
        hasFocus = this._dialog.find(':tabbable');
    }
    if (!hasFocus.length) {
        hasFocus = this._dialog.parent().find('.ui-dialog-buttonpane').find(':tabbable');
    }
    if (!hasFocus.length) {
        hasFocus = this._dialog.parent().find('.ui-dialog-titlebar').find(':tabbable');
    }
    if (!hasFocus.length) {
        hasFocus = this._dialog;
    }
    hasFocus.eq(0).focus();
};
Dialog.prototype._onclose = function (event) {
    event.stopPropagation();
};
