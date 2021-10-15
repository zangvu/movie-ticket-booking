import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from './types';

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, currentUser: payload, loading: false };
    case LOGIN_FAIL:
      return { ...state, loading: false, error: payload };
    case LOGOUT:
      return { ...state, loading: false, error: null, currentUser: null };
    default:
      return state;
  }
};

export default authReducer;
