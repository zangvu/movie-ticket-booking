import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import withLayout from '../hocs/withLayout';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class ClientLayout extends Component {
  render() {
    return this.props.currentUser &&
      this.props.currentUser.maLoaiNguoiDung === 'QuanTri' ? (
      <Redirect to='/admin' />
    ) : (
      <>
        <Header />
        {this.props.children}
        <Footer />
      </>
    );
  }
  // render() {
  //   return (
  //     <>
  //       <Header />
  //       {this.props.children}
  //       <Footer />
  //     </>
  //   );
  // }
}
const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
});
export default withLayout(connect(mapStateToProps)(ClientLayout));
