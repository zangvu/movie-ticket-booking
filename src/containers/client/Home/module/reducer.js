import { SELECT_CINEMA } from './types';

const initialState = {
  selectedCinema: null,
};

const homeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SELECT_CINEMA:
      return { ...state, selectedCinema: payload };

    default:
      return state;
  }
};

export default homeReducer;
