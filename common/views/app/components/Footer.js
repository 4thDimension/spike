import React from 'react';
import CSSModules from 'react-css-modules';
import css from '../styles/footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="content has-text-centered">
        Copyright© 2016. Fourth Dimension Pvt Ltd
      </div>
    </div>
  </footer>
);

export default CSSModules(Footer, css);
