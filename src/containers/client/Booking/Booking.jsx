import { Button } from 'antd/lib/radio';
import _ from 'lodash';
import React, { Component } from 'react';
import bookingApi from '../../../apis/bookingApi';
import Loading from '../../../components/Loading/Loading';
import { connect } from 'react-redux';
import './Booking.scss';
import { message } from 'antd';

class Booking extends Component {
  state = {
    booking: null,
    selectedChair: {},
  };
  bookTicket = async () => {
    if (!_.isEmpty(this.state.selectedChair)) {
      const chairArr = Object.values(this.state.selectedChair);
      const danhSachVe = _.map(chairArr, (item) =>
        _.pick(item, ['maGhe', 'giaVe'])
      );

      const data = {
        maLichChieu: this.state.booking.thongTinPhim.maLichChieu,
        danhSachVe,
        taiKhoanNguoiDung: this.props.currentUser.taiKhoan,
      };
      try {
        await bookingApi.bookTicket(data, this.props.currentUser.accessToken);
        const key = 'updatable';
        this.setState({ isSuccess: true }, () =>
          setTimeout(() => {
            message.success({ content: 'Đặt vé thành công', key, duration: 2 });
          }, 1000)
        );
        const result = await bookingApi.getBoxList(
          this.props.match.params.bookingId
        );
        this.setState({ booking: result.data, selectedChair: {} });
      } catch (err) {
        const key = 'updatable';
        this.setState({ modalLoading: false }, () =>
          setTimeout(() => {
            message.error({
              content: err.response.data,
              key,
              duration: 2,
            });
          }, 100)
        );
      }
    }
  };
  render() {
    const { booking, selectedChair } = this.state;
    return booking ? (
      <div className='booking'>
        <div className='main'>
          <div className='main__header'>
            <div className='main__info'>
              <img src={booking.thongTinPhim.hinhAnh} alt='pgimm' />
              <div className='main__theater'>
                <h6>{booking.thongTinPhim.tenCumRap}</h6>
                <p>
                  {booking.thongTinPhim.ngayChieu} -
                  {booking.thongTinPhim.gioChieu} -{' '}
                  {booking.thongTinPhim.tenRap}
                </p>
              </div>
            </div>
            <div className='main__timer'>
              <p>Thời gian giữ ghế</p>
              <h3>03:28</h3>
            </div>
          </div>
          <div className='main__screen'></div>
          Màn hình
          <div className='main__bookingchair'>
            {booking.danhSachGhe.map((ghe, i) => {
              if ((i + 1) % 16 === 0) {
                return (
                  <>
                    <span
                      className={`${ghe.loaiGhe === 'Vip' ? 'vip' : ''} ${
                        selectedChair[ghe.maGhe] ? 'selected' : ''
                      }  ${ghe.daDat ? 'sold' : ''}`}
                      onClick={() => {
                        if (!ghe.daDat) {
                          if (!selectedChair[ghe.maGhe]) {
                            const flag = { [ghe.maGhe]: ghe };
                            const selected = _.merge(selectedChair, flag);
                            this.setState({
                              selectedChair: selected,
                            });
                          } else {
                            delete selectedChair[ghe.maGhe];
                            this.setState({ selectedChair });
                          }
                        }
                      }}
                    ></span>
                    <br />
                  </>
                );
              }
              return (
                <span
                  className={`${ghe.loaiGhe === 'Vip' ? 'vip' : ''} ${
                    selectedChair[ghe.maGhe] ? 'selected' : ''
                  } ${ghe.daDat ? 'sold' : ''}`}
                  onClick={() => {
                    if (!ghe.daDat) {
                      if (!selectedChair[ghe.maGhe]) {
                        const flag = { [ghe.maGhe]: ghe };
                        const selected = _.merge(selectedChair, flag);
                        this.setState({
                          selectedChair: selected,
                        });
                      } else {
                        delete selectedChair[ghe.maGhe];
                        this.setState({ selectedChair });
                      }
                    }
                  }}
                ></span>
              );
            })}
          </div>
        </div>
        <div className='bookinginfo'>
          <h4>{booking.thongTinPhim.tenPhim}</h4>
          <p>{booking.thongTinPhim.tenCumRap}</p>
          <p>
            {booking.thongTinPhim.ngayChieu} - {booking.thongTinPhim.gioChieu} -{' '}
            {booking.thongTinPhim.tenRap}
          </p>
          {Object.keys(selectedChair).map((key) => {
            return (
              <div className='itemchair'>
                <span style={{ marginRight: '100px' }}>
                  Ghế {selectedChair[key].tenGhe}
                </span>
                <span>{selectedChair[key].giaVe}</span>
              </div>
            );
          })}
          <Button type='primary' onClick={this.bookTicket}>
            Đặt vé
          </Button>
        </div>
      </div>
    ) : (
      <Loading />
    );
  }
  async componentDidMount() {
    const { data } = await bookingApi.getBoxList(
      this.props.match.params.bookingId
    );

    const booking = data;
    console.log(booking);
    this.setState({ booking });
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
});
export default connect(mapStateToProps)(Booking);
