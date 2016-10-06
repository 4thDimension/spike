import React from 'react';
import CSSModules from 'react-css-modules';
import css from '../styles/home.scss';

const Home = () => (
  <div>
    <section className="hero is-fullheight" styleName="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            Next <span className="icon is-medium">
              <i className="fa fa-home" />
            </span>ome
          </h1>
          <h2 className="subtitle">
            Next Generation Renting App
          </h2>
        </div>
      </div>
    </section>
  </div>
);

export default CSSModules(Home, css);

