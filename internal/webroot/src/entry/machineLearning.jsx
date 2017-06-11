var React = require('react');
var ReactDOM = require('react-dom');

// base components
var Carousel = require('../component/common/Carousel');

var carouselContent = [{
    label: '凤巢广告优化', image: '/internal/images/machine-scroll-1@2x.jpg'
}, {
    label: '网页搜索相关性', image: '/internal/images/machine-scroll-2@2x.jpg'
}, {
    label: '网盟Nova-APP', image: '/internal/images/machine-scroll-3@2x.jpg'
}, {
    label: '图文问答', image: '/internal/images/machine-scroll-4@2x.jpg'
}];

ReactDOM.render(
    <Carousel content={carouselContent}/>,
    document.getElementById('carousel-container')
);

document.querySelector('#machine-learning').className='active';
