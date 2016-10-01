import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import css from '../styles/navigation.scss';

const propTypes = {
  location: PropTypes.object
};
/* eslint jsx-a11y/href-no-hash: 0 */
const Navigation = () => (
  <nav className="nav" styleName="headerNav">
    <div className="nav-left">
      <Link className="nav-item is-brand" to="/">
        Logo
      </Link>
      <Link className="nav-item" to="/search">
        <span className="icon">
          <i className="fa fa-about" />
        </span>
        <span> About </span>
      </Link>
    </div>
  </nav>
);

Navigation.propTypes = propTypes;
export default CSSModules(Navigation, css);
