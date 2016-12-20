import React, { PropTypes } from 'react';
import NavigationContainer from './containers/NavigationContainer';
import Footer from './components/Footer';

const propTypes = {
  children: PropTypes.any
};

const App = (props) => (
  <div id="mainView">
    <NavigationContainer {...props} />
    {props.children}
    <Footer />
  </div>
);

App.propTypes = propTypes;
export default App;
