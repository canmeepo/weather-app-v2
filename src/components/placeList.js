import React from 'react';
import PropTypes from 'prop-types';

import Place from './place';

export default function PlaceList(props) {
  let places = [];
  const isNotEmpty = Object.keys(props.places).length > 0;

  if (props.places && isNotEmpty) {
    places = Object.keys(props.places).map(key => {
      const { place, placeName } = props.places[key];

      return (
        <Place
          key={place.id}
          id={place.id}
          place={place}
          placeName={placeName}
          removePlace={() => props.removePlace(place.id)}
        />
      );
    });
  } else {
    places = <h3>No places to show.</h3>;
  }

  return (
    <div>
      {places}
    </div>
  );
}

PlaceList.propTypes = {
  places: PropTypes.shape({
    id: PropTypes.number
  })
};
