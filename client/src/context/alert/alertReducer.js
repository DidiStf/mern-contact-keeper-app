import { SET_ALERT, REMOVE_ALERT } from '../types';

const alertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT: {
      const alert = action.payload;
      return [...state, alert];
    }
    case REMOVE_ALERT: {
      const id = action.payload;
      return state.filter((alert) => alert.id !== id);
    }
    default:
      return state;
  }
};

export default alertReducer;
