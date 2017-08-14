import { updateStorage } from '../utils/storage';
import { pickBy, isEqual } from 'lodash';

const API_KEY = '7e76d39fbd4ed676341427f1e95f89ca';
const ROOT_URL = `https://api.openweathermap.org/data/2.5`;

export const ADD_PLACE = 'ADD_PLACE';
export const REMOVE_PLACE = 'REMOVE_PLACE';
export const GET_LOCATION = 'GET_LOCATION';
export const UPDATE_PLACE = 'UPDATE_PLACE';
export const DEFAULT_PLACE = {
  lat: 55.75,
  lon: 37.61,
  placeName: 'Moscow, Russia'
};

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
export function updatePlaces(lat, lon, placeName) {
  return (dispatch, getState) => {
    return dispatch(getPlace(lat, lon, placeName)).then(() => updateStorage('places', getState()));
  };
}
export function updatePlaceById(id, places) {
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
}

export function updatePlace(id) {
  return (dispatch, getState) => {
    const state = getState();

    return dispatch(updatePlaceById(id, state)).then(() => updateStorage('places', state));
  };
}

export const getLocation = () => {
  const geolocation = navigator.geolocation;
  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }
    geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      () => {
        reject(new Error('Permission denied'));
      }
    );
  });
  return {
    type: GET_LOCATION,
    payload: location
  };
};
