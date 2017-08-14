import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updatePlaces } from '../actions';
import App from '../components/app';

function mapStateToProps(state) {
  return { places: state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updatePlaces }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
