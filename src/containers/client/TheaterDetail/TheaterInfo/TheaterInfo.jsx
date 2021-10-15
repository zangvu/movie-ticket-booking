import { Col, Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TheaterInfo.scss';

class TheaterInfo extends Component {
  render() {
    const { selectedCinema } = this.props;
    return (
      <div className='theaterinfo'>
        <div className='theaterinfo__blur'></div>
        <div className='theaterinfo__background'></div>
        <div className='theaterinfo__container'>
          <Row>
            <Col md={12} lg={6} xl={6} className='theaterinfo__img'>
              <img
                src='https://img.freepik.com/free-vector/cinema-festival-vertical-poster_1284-22583.jpg?size=338&ext=jpg'
                alt='rap chieu phim'
              />
            </Col>
            <Col md={12} lg={18} xl={18} className='theaterinfo__content'>
              <h3>{selectedCinema.tenCumRap}</h3>
              <p>{selectedCinema.diaChi}</p>
              <button>Mua vé</button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  selectedCinema: state.homeReducer.selectedCinema,
});
export default connect(mapStateToProps)(TheaterInfo);
