define('common:widget/sidebar/sidebar.async.js', function(require, exports, module){ exports.run = function(){
    $('html').toggleClass('expanded');
}; 
});