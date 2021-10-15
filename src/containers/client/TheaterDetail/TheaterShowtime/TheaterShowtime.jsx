import { Col, Row, Tabs } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './TheaterShowtime.scss';
const { TabPane } = Tabs;

class TheaterShowtime extends Component {
  render() {
    const { selectedCinema } = this.props;
    const days = {
      Monday: 'Thứ Hai',
      Tuesday: 'Thứ Ba',
      Wednesday: 'Thứ Tư',
      Thursday: 'Thứ Năm',
      Friday: 'Thứ Sáu',
      Saturday: 'Thứ Bảy',
      Sunday: 'Chủ Nhật',
    };
    let dates = null;
    if (selectedCinema) {
      // value for render showtime
      const toDay = moment().subtract({ days: 1 });
      dates = [];
      for (let i = 0; i < 7; i++) {
        let flag = toDay.add({ days: 1 }).format();
        if (i !== 0) {
          flag = toDay.set({ h: 0, m: 0, s: 0 }).format();
        }
        dates.push(moment(flag));
      }
    }
    return (
      <div className='theatershow'>
        <div className='theatershow__week'>
          {dates ? (
            <Tabs defaultActiveKey='1' centered onTabClick={this.onTabClick}>
              {dates.map((date, i) => {
                return (
                  <TabPane
                    tab={
                      <div style={{ textAlign: 'center' }}>
                        {days[date.format('dddd')]}
                        <br />
                        {date.format('D')}
                      </div>
                    }
                    key={i + 1}
                  >
                    {selectedCinema &&
                      selectedCinema.danhSachPhim.map((movie) => {
                        const { lstLichChieuTheoPhim } = movie;
                        let check = false;
                        return (
                          <Row
                            key={movie.maCumRap}
                            className='theatershow__item'
                          >
                            <Col span={4}>
                              <img src={movie.hinhAnh} alt='anhaaa' />
                            </Col>
                            <Col span={20} className='theatershow__content'>
                              <span className='theatershow__name'>
                                {movie.tenPhim}
                              </span>
                              <br />
                              <span className='theatershow__price'>
                                {movie.lstLichChieuTheoPhim[0].giaVe} VNĐ
                              </span>
                              <br />
                              {lstLichChieuTheoPhim &&
                                lstLichChieuTheoPhim.map((showtime, i) => {
                                  const { ngayChieuGioChieu } = showtime;
                                  const d = new Date(ngayChieuGioChieu);
                                  const c = new Date(date.format());
                                  const tomorrow = new Date(c);
                                  tomorrow.setDate(tomorrow.getDate() + 1);
                                  tomorrow.setHours(0, 0, 0, 0);
                                  if (d >= date && d < tomorrow) {
                                    check = false;
                                    return (
                                      <Link
                                        className='theatershow__time'
                                        to={`/booking/${showtime.maLichChieu}`}
                                      >
                                        {d.getHours() + ':' + d.getMinutes()}
                                      </Link>
                                    );
                                  }
                                  if (
                                    !check &&
                                    lstLichChieuTheoPhim.length === i + 1
                                  )
                                    return 'Không có suất chiếu nào';
                                  return null;
                                })}
                            </Col>
                          </Row>
                        );
                      })}
                  </TabPane>
                );
              })}
            </Tabs>
          ) : (
            'Hiện không có suất chiếu nào'
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  selectedCinema: state.homeReducer.selectedCinema,
});
export default connect(mapStateToProps)(TheaterShowtime);
