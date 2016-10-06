import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../auth';
import Navigation from '../components/Navigation';

const mapStateToProps = (state) => ({
  authInfo: state.authReducer
});

const NavigationContainer = (props) => (
  <Navigation {...props} />
);

export default connect(mapStateToProps, actions)(NavigationContainer);
