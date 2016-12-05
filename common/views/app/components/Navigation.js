import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import css from '../styles/navigation.scss';

const propTypes = {
  location: PropTypes.object,
  login: PropTypes.func,
  authInfo: PropTypes.object
};

/* eslint jsx-a11y/href-no-hash: 0 */
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.handleLoginAction = ::this.handleLoginAction;
  }
  componentDidMount() {
  }

  handleLoginAction() {
    this.props.login();
  }
  render() {
    const { isAuthenticated, profile } = this.props.authInfo;
    const { username } = profile || {};
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Next Home </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem>What</NavItem>
          <NavItem>Why</NavItem>
          <NavItem>Who</NavItem>
          <NavItem>
            <span className="nav-item" onClick={this.handleLoginAction}>
              {
                isAuthenticated
                  ? username
                  : 'Login'
              }
            </span>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

Navigation.propTypes = propTypes;
export default CSSModules(Navigation, css);
