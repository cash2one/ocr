var React = require('react');
var ReactDOM = require('react-dom');

// base components
var Carousel = require('../component/common/Carousel');

var carouselContent = [{
    label: '搜索知识问答', image: '/internal/images/knowledge-scroll-1@2x.jpg'
}, {
    label: '搜索推荐', image: '/internal/images/knowledge-scroll-2@2x.jpg'
}, {
    label: '实体卡片', image: '/internal/images/knowledge-scroll-3@2x.jpg'
}, {
    label: '闪投广告触发优化', image: '/internal/images/knowledge-scroll-4@2x.jpg'
}, {
    label: '糯米酒店样式优化', image: '/internal/images/knowledge-scroll-5@2x.jpg'
}, {
    label: '凤巢天问项目', image: '/internal/images/knowledge-scroll-6@2x.jpg'
}];

ReactDOM.render(
    <Carousel content={carouselContent}/>,
    document.getElementById('carousel-container')
);

document.querySelector('#knowledge-graph').className='active';
