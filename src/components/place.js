import React from 'react';
import PropTypes from 'prop-types';

export default function Place(props) {
  const { place: currentPlace, removePlace } = props;
  const { placeName } = props;
  const { temp } = currentPlace.main;

  return (
    <div style={{ border: '1px solid black', margin: '10px 20px' }}>
      <div className="place-inner-item place-name">
        {placeName}
      </div>
      <div className="place-inner-item">
        Temp.: {Math.ceil(temp)} &deg;C
      </div>
      <button onClick={removePlace} tabIndex="0" title="Remove place">
        delete
      </button>
    </div>
  );
}

Place.propTypes = {
  placeName: PropTypes.string.isRequired,
  removePlace: PropTypes.func.isRequired,
  updatePlace: PropTypes.func.isRequired
};
