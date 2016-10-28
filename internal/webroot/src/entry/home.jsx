var React = require('react');
var ReactDOM = require('react-dom');

// base components
var Broadcast = require('../component/home/NewsBroadcast');

ReactDOM.render(
    <Broadcast/>,
    document.getElementById('news-broadcast-container')
);

document.querySelector('#home').className='active';
