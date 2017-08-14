import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PlacesContainer from '../containers/placesContainer';
import Search from './search';
import { DEFAULT_PLACE } from '../actions';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.updatePlaces = this.props.updatePlaces;
  }

  componentDidMount() {
    if (Object.keys(this.props.places).length) return;

    this.updatePlaces(DEFAULT_PLACE.lat, DEFAULT_PLACE.lon, DEFAULT_PLACE.placeName);
  }

  render() {
    return (
      <div>
        <Search />
        <PlacesContainer />
      </div>
    );
  }
}
