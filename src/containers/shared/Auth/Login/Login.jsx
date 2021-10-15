import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './Login.scss';
import { actLogin } from '../module/actions';
import { connect } from 'react-redux';
import Loading from '../../../../components/Loading/Loading';

class Login extends Component {
  render() {
    return (
      <div className='login'>
        {this.props.loading ? (
          <Loading />
        ) : (
          <div className='login__container'>
            <img
              src='https://tix.vn/app/assets/img/login/group@2x.png'
              alt='login-logo'
            />
            <div className='login__form'>
              <Formik
                initialValues={{ taiKhoan: '', matKhau: '' }}
                validationSchema={Yup.object({
                  taiKhoan: Yup.string().required(
                    'Vui lòng nhập tài khoản của bạn'
                  ),
                  matKhau: Yup.string().required(
                    'Vui lòng nhập mật khẩu của bạn'
                  ),
                })}
                onSubmit={(values) => {
                  this.props.login(values);
                }}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    {/* <label htmlFor='username'>Username</label> */}
                    <input
                      id='username'
                      type='username'
                      placeholder='Tài khoản'
                      {...formik.getFieldProps('taiKhoan')}
                    />
                    {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                      <div className='login__error'>
                        {formik.errors.taiKhoan}
                      </div>
                    ) : null}

                    {/* <label htmlFor='password'>Mật khẩu</label> */}
                    <input
                      id='password'
                      type='password'
                      placeholder='Mật khẩu'
                      {...formik.getFieldProps('matKhau')}
                    />
                    {formik.touched.matKhau && formik.errors.matKhau ? (
                      <div className='login__error'>
                        {formik.errors.matKhau}
                      </div>
                    ) : null}
                    {this.props.error ? (
                      <p style={{ color: 'red' }}>
                        Tài khoản hoặc mật khẩu của bạn không đúng
                      </p>
                    ) : null}
                    <button type='submit' style={{ color: '#fff' }}>
                      Đăng nhập
                    </button>
                    <p style={{ color: '#fff' }}>
                      Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông
                      tin!
                    </p>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapDisptchToProps = (dispatch) => ({
  login: (user) => dispatch(actLogin(user)),
});
const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
  loading: state.authReducer.loading,
  error: state.authReducer.error,
});

export default connect(mapStateToProps, mapDisptchToProps)(Login);
// // export default connect(null,{})(Login)
// export default Login;
