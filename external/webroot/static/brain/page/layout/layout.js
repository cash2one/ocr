function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}
(function () {
    if (isIE() == 8) {
        $('<div style="font-size: 16px; z-index: 999; background: #F8EBCF; position: fixed; top: 0;left: 0;width: 100%; height: 50px;line-height: 50px; text-align: center">您的浏览器版本过低,为了更好的体验,建议升级到IE9或以上版本 </div>')
            .appendTo(document.body);
    }
})();