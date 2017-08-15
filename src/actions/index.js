import { pickBy, isEqual } from 'lodash';
import { updateStorage } from '../utils/storage';

const API_KEY = '7e76d39fbd4ed676341427f1e95f89ca';
const ROOT_URL = `https://api.openweathermap.org/data/2.5/weather`;

export const ADD_PLACE = 'ADD_PLACE';
export const REMOVE_PLACE = 'REMOVE_PLACE';
export const UPDATE_PLACE = 'UPDATE_PLACE';

export const url = (lat, lon) => {
  return `${ROOT_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
};

export const getPlace = (lat, lon, placeName) => {
  return dispatch => {
    return fetch(url(lat, lon)).then(response => response.json()).then(place => {
      dispatch({
        type: ADD_PLACE,
        id: place.id,
        place: {
          placeName,
          place
        }
      });
    });
  };
};

export const removePlaceById = id => {
  return dispatch => {
    return Promise.resolve().then(() =>
      dispatch({
        type: REMOVE_PLACE,
        id
      })
    );
  };
};

export const removePlace = id => {
  return (dispatch, getState) => {
    return dispatch(removePlaceById(id)).then(() => updateStorage('places', getState()));
  };
};
export const updatePlaces = (lat, lon, placeName) => {
  return (dispatch, getState) => {
    return dispatch(getPlace(lat, lon, placeName)).then(() => updateStorage('places', getState()));
  };
};

export const updatePlaceById = (id, places) => {
  const placeObj = pickBy(places, (value, key) => isEqual(parseInt(key, 10), id))[id];
  const { lat, lon } = placeObj.place.coord;
  const { placeName } = placeObj;

  return dispatch => {
    return fetch(url(lat, lon))
      .then(response => response.json())
      .then(place => {
        dispatch({
          type: UPDATE_PLACE,
          id,
          place: { placeName, place }
        });
      })
      .catch(error => console.warn(error));
  };
};

export const updatePlace = id => {
  return (dispatch, getState) => {
    const state = getState();

    return dispatch(updatePlaceById(id, state)).then(() => updateStorage('places', state));
  };
};
export const fetchLocation = () => {
  return function(dispatch) {
    let url = 'https://ipinfo.io/json';
    fetch(url).then(res => res.json()).then(out => {
      const lat = out.loc.split(',')[0];
      const lon = out.loc.split(',')[1];
      const city = out.city;
      dispatch(updatePlaces({ lat, lon, city }));
    });
  };
};
