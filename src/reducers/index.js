import { pickBy, isEqual } from 'lodash';
import { ADD_PLACE, REMOVE_PLACE } from '../actions';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        [action.id]: action.place
      };

    case REMOVE_PLACE:
      return pickBy(state, (value, key) => !isEqual(parseInt(key, 10), action.id));

    default:
      return state;
  }
}
