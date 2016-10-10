import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import css from '../styles/navigation.scss';
import { post } from '../../../utils/fetch';

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
    // GraphQL client test
    const query = `query NextHomeQuery($id: String!) {
      Tenant(id: $id) {
        _id,
        name
      }
    }`;

    post('/graphql', {
      query,
      variables: { id: '57fae83ef3cf1c1fba1a3134' }
    });
  }

  handleLoginAction() {
    this.props.login();
  }
  render() {
    const { isAuthenticated, profile } = this.props.authInfo;
    const { username } = profile || {};
    return (
      <nav className="nav" styleName="headerNav">
        <div className="nav-left">
          <div className="nav-item">
            <h2>
              Next
              <span className="icon is-medium">
                <i className="fa fa-home" />
              </span>
              ome
            </h2>
          </div>
        </div>
        <div className="nav-right nav-menu">
          <Link className="nav-item" to="/why">
            What
          </Link>
          <Link className="nav-item" to="/who">
            Who
          </Link>
          <a className="nav-item" onClick={this.handleLoginAction}>
            {
              isAuthenticated
                ? username
                : 'Login'
            }
          </a>
        </div>
      </nav>
    );
  }
}

Navigation.propTypes = propTypes;
export default CSSModules(Navigation, css);
