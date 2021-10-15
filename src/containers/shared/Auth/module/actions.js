import userApi from '../../../../apis/userApi';
import history from '../../../../utils/history';
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from './types';

const actLoginRequest = () => ({
  type: LOGIN_REQUEST,
});
const actLoginSuccess = (currentUser) => ({
  type: LOGIN_SUCCESS,
  payload: currentUser,
});
const actLoginFail = (error) => ({
  type: LOGIN_FAIL,
  payload: error,
});

export const actLogin = (user) => async (dispatch) => {
  try {
    dispatch(actLoginRequest());
    const { data } = await userApi.loginApi(user);
    dispatch(actLoginSuccess(data));
    history.push('/');
  } catch (err) {
    dispatch(actLoginFail('Unable to login!'));
  }
};
export const actLogout = () => ({ type: LOGOUT, payload: null });
