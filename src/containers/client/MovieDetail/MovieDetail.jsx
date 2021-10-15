import { Col, Row, Spin } from 'antd';
import React, { Component } from 'react';
import theaterApi from '../../../apis/theaterApi';
import './MovieDetail.scss';
import { Tabs } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { getYoutubeThumbnail } from '../../../utils/getImgFromLink';
import Loading from '../../../components/Loading/Loading';
const { TabPane } = Tabs;

export default class MovieDetail extends Component {
  state = {
    movie: null,
    selectedSystem: null,
    cinema: null,
    loading: true,
  };
  // getThisWeekDates() {
  //   var weekDates = [];
  //   for (var i = 1; i <= 7; i++) {
  //     weekDates.push(moment().day(i));
  //   }

  //   return weekDates;
  // }
  render() {
    if (this.state.loading) return <Loading />;
    const { movie, selectedSystem } = this.state;
    const days = {
      Monday: 'Thứ Hai',
      Tuesday: 'Thứ Ba',
      Wednesday: 'Thứ Tư',
      Thursday: 'Thứ Năm',
      Friday: 'Thứ Sáu',
      Saturday: 'Thứ Bảy',
      Sunday: 'Chủ Nhật',
    };
    let strDate = '';
    let dates = null;

    if (movie) {
      const dd = new Date(movie.ngayKhoiChieu);
      strDate =
        dd.getDate() + '/' + (dd.getMonth() + 1) + '/' + dd.getFullYear();

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
      <>
        {movie ? (
          <div className='info'>
            <div
              className='info__blur'
              style={{
                backgroundImage: `url(${getYoutubeThumbnail(movie.trailer)})`,
              }}
            ></div>
            <div className='info__background'></div>
            <div className='info__container'>
              <h2 style={{ marginLeft: '20px' }}>{movie.tenPhim}</h2>
              <Row>
                <Col span={6}>
                  <div className='info__poster'>
                    <img src={movie.hinhAnh} alt='anhanh' />
                  </div>
                </Col>
                <Col span={14}>
                  <div className='info__detail'>
                    <h2>{movie.tenPhim}</h2>
                    <p>{movie.moTa}</p>
                    {movie.heThongRapChieu.length > 0 && (
                      <p>
                        Thời lượng:
                        {
                          movie.heThongRapChieu[0].cumRapChieu[0]
                            .lichChieuPhim[0].thoiLuong
                        }
                      </p>
                    )}

                    <p>Ngày khởi chiếu: {strDate}</p>
                    {movie.heThongRapChieu.length > 0 && (
                      <p>
                        Giá vé:
                        {
                          movie.heThongRapChieu[0].cumRapChieu[0]
                            .lichChieuPhim[0].giaVe
                        }
                      </p>
                    )}
                    <button className='info__button'>XEM TRAILER</button>
                    <button className='info__button'>MUA VÉ NGAY</button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        ) : (
          <Spin />
        )}
        {movie && movie.heThongRapChieu.length > 0 ? (
          <div className='time'>
            <Row>
              <Col span={6}>
                <div className='time__system'>
                  {movie.heThongRapChieu.map((system) => {
                    return (
                      <div
                        className={`time__item ${
                          selectedSystem.maHeThongRap === system.maHeThongRap
                            ? 'active'
                            : ''
                        }`}
                        key={system.maHeThongRap}
                        onClick={async () => {
                          const { data } =
                            await theaterApi.fetchCinemaBySystemApi(
                              system.maHeThongRap
                            );
                          this.setState({
                            selectedSystem: system,
                            cinema: data,
                          });
                        }}
                      >
                        <img src={system.logo} alt='loogoo' />
                        <span>{system.tenHeThongRap}</span>
                      </div>
                    );
                  })}
                </div>
              </Col>
              <Col span={18}>
                <div className='time__week'>
                  {dates ? (
                    <Tabs
                      defaultActiveKey='1'
                      centered
                      onTabClick={this.onTabClick}
                    >
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
                            {selectedSystem &&
                            selectedSystem.cumRapChieu.length > 0
                              ? selectedSystem.cumRapChieu.map((cinema) => {
                                  const length = cinema.lichChieuPhim.length;
                                  let check = false;
                                  return (
                                    <div
                                      className='time__cinema'
                                      key={cinema.maCumRap}
                                    >
                                      <Row>
                                        <Col
                                          span={4}
                                          style={{ textAlign: 'center' }}
                                        >
                                          <img
                                            src={
                                              cinema.hinhAnh
                                                ? cinema.hinhAnh
                                                : 'https://i2.wp.com/www.dasym.com/wp-content/uploads/2017/07/Cinema-Image-by-Alexandre-Chassignon-on-Flickr.jpg?fit=2304%2C1728&ssl=1'
                                            }
                                            alt='cinemaimage'
                                          />
                                        </Col>
                                        <Col
                                          span={20}
                                          className='time__content'
                                        >
                                          <span>{cinema.tenCumRap}</span>
                                          <br />
                                          <span>
                                            {
                                              _.find(this.state.cinema, [
                                                'maCumRap',
                                                cinema.maCumRap,
                                              ]).diaChi
                                            }
                                          </span>
                                          <br />
                                          {cinema.lichChieuPhim.map(
                                            (item, i) => {
                                              const t = new Date(
                                                item.ngayChieuGioChieu
                                              );
                                              const c = new Date(date.format());
                                              const tomorrow = new Date(c);
                                              tomorrow.setDate(
                                                tomorrow.getDate() + 1
                                              );
                                              tomorrow.setHours(0, 0, 0, 0);

                                              if (t >= c && t <= tomorrow) {
                                                check = true;
                                                return (
                                                  <Link
                                                    to={`/booking/${item.maLichChieu}`}
                                                    className='time__showtime'
                                                    key={item.maLichChieu}
                                                  >
                                                    {t.getHours()}:
                                                    {t.getMinutes()}{' '}
                                                  </Link>
                                                );
                                              }
                                              if (length - 1 === i && !check) {
                                                return (
                                                  <p key='1'>
                                                    Hiện đã hết suất chiếu
                                                  </p>
                                                );
                                              }
                                              return null;
                                            }
                                          )}
                                        </Col>
                                      </Row>
                                    </div>
                                  );
                                })
                              : 'Không có suất chiếu nào'}
                          </TabPane>
                        );
                      })}
                    </Tabs>
                  ) : (
                    'Hiện không có suất chiếu nào'
                  )}
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <Spin />
        )}
      </>
    );
  }
  async componentDidMount() {
    try {
      const { data } = await theaterApi.fetchMovieByApi(
        this.props.match.params.movieId
      );
      let selectedSystem = null;
      let cinema = null;
      if (data.heThongRapChieu && data.heThongRapChieu.length > 0) {
        selectedSystem = data.heThongRapChieu[0];
        const result = await theaterApi.fetchCinemaBySystemApi(
          selectedSystem.maHeThongRap
        );
        cinema = result.data;
      }
      this.setState({ movie: data, selectedSystem, cinema, loading: false });
    } catch (err) {
      console.log(err);
    }
  }
}
