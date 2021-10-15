import { SELECT_CINEMA } from './types';

export const actSelectCinema = (cinema) => ({
  type: SELECT_CINEMA,
  payload: cinema,
});
