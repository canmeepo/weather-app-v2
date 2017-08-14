const API_KEY = '7e76d39fbd4ed676341427f1e95f89ca';
const ROOT_URL = `https://api.openweathermap.org/data/2.5`;

export const ADD_PLACE = 'ADD_PLACE';
export const REMOVE_PLACE = 'REMOVE_PLACE';
export const GET_LOCATION = 'GET_LOCATION';

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
