var React = require('react');
var ReactDOM = require('react-dom');


var MyTest = React.createClass({
  render: function() {
    return (
      <div>
        <div className="grid grid--1">1</div>
        <div className="grid grid--1">1</div>
        <div className="grid grid--1">1</div>
        <div className="grid grid--1">1</div>
        <div className="grid grid--1">1</div>
        <div className="grid grid--1">1</div>
        <div className="grid grid--1">1</div>
        <div className="grid grid--1">1</div>
        <div className="grid grid--1">1</div>
        <div className="grid grid--1">1</div>
        <div className="grid grid--1">1</div>
        <div className="grid grid--1">1</div>
        <div className="grid grid--2">2</div>
        <div className="grid grid--2">2</div>
        <div className="grid grid--2">2</div>
        <div className="grid grid--2">2</div>
        <div className="grid grid--2">2</div>
        <div className="grid grid--2">2</div>
        <div className="grid grid--3">3</div>
        <div className="grid grid--3">3</div>
        <div className="grid grid--3">3</div>
        <div className="grid grid--3">3</div>
        <div className="grid grid--4">4</div>
        <div className="grid grid--4">4</div>
        <div className="grid grid--4">4</div>
        <div className="grid grid--6">6</div>
        <div className="grid grid--6">6</div>
        <div className="grid grid--12">12</div>
      </div>
    );
  }
});

ReactDOM.render(
  <MyTest />, 
  document.getElementById('sample-grid')

);