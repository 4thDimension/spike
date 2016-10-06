import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import css from '../styles/navigation.scss';

const propTypes = {
  location: PropTypes.object,
  login: PropTypes.func
};

/* eslint jsx-a11y/href-no-hash: 0 */
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.handleLoginAction = ::this.handleLoginAction;
  }
  handleLoginAction() {
    this.props.login();
  }
  render() {
    return (
      <nav className="nav" styleName="headerNav">
        <div className="nav-left">
          <span
            className="nav-item is-brand" styleName="login"
            onClick={this.handleLoginAction}
          >
            Login
          </span>
          <Link className="nav-item" to="/search">
            <span className="icon">
              <i className="fa fa-about" />
            </span>
            <span> About </span>
          </Link>
        </div>
      </nav>
    );
  }
}

Navigation.propTypes = propTypes;
export default CSSModules(Navigation, css);
