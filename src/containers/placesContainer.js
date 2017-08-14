import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { removePlace, updatePlace } from '../actions';
import PlaceList from '../components/placeList';

function mapStateToProps(state) {
  return { places: state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removePlace, updatePlace }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);
