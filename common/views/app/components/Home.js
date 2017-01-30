import React from 'react';
import CSSModules from 'react-css-modules';
// import { Jumbotron, Button } from 'react-bootstrap';
import css from '../styles/home.scss';

/* eslint jsx-a11y/href-no-hash:0 */
const Home = () => (
  <div>
    <div style={{ position: 'relative' }}>
      <div styleName="blackOverlay" />
      <div styleName="overlay" />
      <div className="text-center" styleName="hero">
        <div className="container" styleName="middleContent">
          <h1 styleName="heading">
            SMARTER WAY TO <span className="aqua"> RENT </span> A <span className="aqua">HOME</span>
          </h1>
          <h3>
            Next Generation Renting APP, No More Paper Work.
          </h3>
          <div className="clearfix">
            <div>
              <i className="fa fa-map-marker" aria-hidden="true" />
            </div>
            <div>
              <input type="text" styleName="search" className="search" placeholder="Enter City, or Location" />
            </div>
            <div>
              <button styleName="findit"> FIND IT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div styleName="tenantSection">
       No More Paper Work
    </div>
    <div styleName="tenantSection">
      No More Paper Work
    </div>
    <div styleName="tenantSection">
      No More Paper Work
    </div>
  </div>
);

export default CSSModules(Home, css);

