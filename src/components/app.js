import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PlacesContainer from '../containers/placesContainer';
import Search from './search';

class App extends Component {
  constructor(props) {
    super(props);

    this.updatePlaces = this.props.updatePlaces;
  }

  componentDidMount() {
    if (Object.keys(this.props.places).length) return;

    // function synchronousCode() {
    //   const lat = synchronousCode.loc.split(',')[0];
    //   const lon = synchronousCode.loc.split(',')[1];
    //   const city = synchronousCode.city;
    // }
    // fetch('https://ipinfo.io/json')
    //   .then(function(res) {
    //     return res.json();
    //   })
    //   .then(synchronousCode)
    //   .catch(function(ex) {
    //     console.log('parsing failed', ex);
    //   });
    // console.log(synchronousCode.lat);
    // this.updatePlaces(getLocation.lat, getLocation.lon, getLocation.city);
  }

  render() {
    return (
      <div>
        <Search updatePlaces={this.updatePlaces} />
        <PlacesContainer />
      </div>
    );
  }
}
App.propTypes = {
  places: PropTypes.shape({
    id: PropTypes.number,
    place: PropTypes.object
  }),
  updatePlaces: PropTypes.func.isRequired,
  fetchLocation: PropTypes.object
};

export default App;
