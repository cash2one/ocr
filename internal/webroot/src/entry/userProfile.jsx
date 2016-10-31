var React = require('react');
var ReactDOM = require('react-dom');

// base components
var Carousel = require('../component/common/Carousel');

var carouselContent = [{
    label: '个性化补贴方案', image: '../images/user-scroll-1@2x.jpg'
}, {
    label: '个性化广告', image: '../images/user-scroll-2@2x.jpg'
}, {
    label: '新用户拓展', image: '../images/user-scroll-3@2x.jpg'
}, {
    label: '个性化排序及推荐', image: '../images/user-scroll-4@2x.jpg'
}, {
    label: 'WISE小说-猜你喜欢', image: '../images/user-scroll-5@2x.jpg'
}];

ReactDOM.render(
    <Carousel content={carouselContent}/>,
    document.getElementById('carousel-container')
);

document.querySelector('#user-profile').className='active';
