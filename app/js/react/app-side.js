var React = require('react');
var ReactDOM = require('react-dom');


var AppSide = React.createClass({
  render: function() {
    return (
      <div>
        <a href="#" className="logo"><img src="http://placehold.it/150x150" alt="Logo" /></a>
        <ul>
          <li className="side-nav__title">Menu</li>
          <li><a className="side-nav__link" href="#"><i className="fa fa-home side-nav__icon"></i>Dashboard</a></li>
          <li><a className="side-nav__link" href="#"><i className="fa fa-book side-nav__icon "></i>Recipes</a></li>
          <li><a className="side-nav__link" href="#"><i className="fa fa-suitcase side-nav__icon "></i>Equipment</a></li>
          <li><a className="side-nav__link" href="#"><i className="fa fa-calculator side-nav__icon r"></i>Tools</a></li>
          <li><a className="side-nav__link" href="#"><i className="fa fa-leaf side-nav__icon "></i>Ingredients</a></li>
          <li><a className="side-nav__link" href="#"><i className="fa fa-beer side-nav__icon "></i>Brew Day</a></li>
        </ul> 
      </div>
    );
  }
});

ReactDOM.render(
  <AppSide />, 
  document.getElementById('side')

);
