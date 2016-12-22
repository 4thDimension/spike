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
    const { nickname } = profile || {};
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">next Home</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem>TENANT</NavItem>
            <NavItem>AGENT</NavItem>
            <NavItem>LANDLORD</NavItem>
            <NavItem eventKey={1} href="#">
              <span className="nav-item" styleName="auth" onClick={this.handleLoginAction}>
                {
                  isAuthenticated
                    ? nickname
                    : 'LOGIN'
                }
              </span>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navigation.propTypes = propTypes;
export default CSSModules(Navigation, css);
