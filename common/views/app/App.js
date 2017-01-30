import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import NavigationContainer from './containers/NavigationContainer';
import Footer from './components/Footer';

const propTypes = {
  children: PropTypes.any
};

const App = (props) => (
  <div id="mainView">
    <Helmet
      htmlAttributes={{ lang: 'en', amp: undefined }} // amp takes no value
      title="Next Home, Next Generation Renting Application"
      meta={[
        { name: 'description', content: 'New Zeland Next Generation Renting Application, No More Paper Work' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'http://www.nexthome.co.nz' },
        { property: 'og:title', content: 'New Zeland Next Generation Renting Application, No More Paper Work' }
      ]}
      link={[
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto' }
      ]}
      noscript={[
        { innerHTML: '<link rel="stylesheet" type="text/css" href="foo.css" />' }
      ]}
      script={[
        {
          src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCB9JjUpkZ6xA2QwA07K_W7w3KeumUiYl4&libraries=places',
          type: 'text/javascript'
        }
      ]}
    />
    <NavigationContainer {...props} />
    {props.children}
    <Footer />
  </div>
);

App.propTypes = propTypes;
export default App;
