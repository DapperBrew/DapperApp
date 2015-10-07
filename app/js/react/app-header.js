var React = require('react');
var ReactDOM = require('react-dom');


var AppHeader = React.createClass({
  render: function() {
    return (
      <div>
        <button className="addrecipe__button"><i className="fa fa-plus"></i>Add Recipe</button>
        <a href="#0" className="nav-trigger">Menu<span></span></a>
        <nav className="top-nav">
          <ul className="top-nav__menu">
            <li className="side-nav__title">Admin Menu</li>
            <li className="top-nav__item">
              <a className="top-nav__link top-nav__link--notification" href="#">
                <i className="fa fa-bell-o"></i>
                <span className="badge badge-up">3</span>
                <span className="mobile-only">Notifications</span>
              </a>
            </li>
            <li className="top-nav__item">
              <a className="top-nav__link top-nav__link--user" href="#">
                <img className="user__photo" src="https://randomuser.me/api/portraits/thumb/men/49.jpg" />
                <span className="user__name">John Doe </span> <i className="fa fa-caret-down"></i>
              </a>
            </li>
          </ul> {/* top-nav__menu */}
        </nav>
      </div>
    );
  }
});

ReactDOM.render(
  <AppHeader />, 
  document.getElementById('header')

);
