import React from 'react';
import CSSModules from 'react-css-modules';
// import { Jumbotron, Button } from 'react-bootstrap';
import css from '../styles/home.scss';

/* eslint jsx-a11y/href-no-hash:0 */
const Home = () => (
  <div>
    <div style={{ position: 'relative' }}>
      <div styleName="overlay" />
      <div className="jumbotron" styleName="hero">
        <div className="container">
          <h1 className="display-3">
            Next Home
          </h1>
          <p className="lead">
            Next Generation Renting APP,
            No More Paper Work.
          </p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#">
              Learn more
            </a>
          </p>
        </div>
      </div>
    </div>
    <div styleName="tenantSection">
       No More Paper Work
    </div>
  </div>
);

export default CSSModules(Home, css);

