import React, { Component } from 'react';
import FilterDropdown from './FilterDropdown/FilterDropdown';
import './Filter.scss';
import { Button, message } from 'antd';
import movieApi from '../../../../apis/movieApi';
import theaterApi from '../../../../apis/theaterApi';
import _ from 'lodash';
import history from '../../../../utils/history';

export default class Filter extends Component {
  state = {
    movies: null,
    theater: null,
    date: null,
    showtime: null,
    showtimeList: null,
    selectedMovie: null,
    selectedTheater: null,
    selectedDate: null,
    selectedShowtime: null,
  };
  onSelectedMovie = async (e) => {
    try {
      const { data } = await theaterApi.fetchTheaterOnMovieApi(e.key);
      if (!_.isEmpty(data)) {
        const result = data.heThongRapChieu;
        const theaterSystem = _.map(result, 'cumRapChieu');
        const theater = theaterSystem.flat();
        const selectedMovie = e.domEvent.target.innerText;
        this.setState({
          selectedMovie,
          theater,
          date: null,
          showtime: null,
          selectedTheater: null,
          selectedDate: null,
          selectedShowtime: null,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  onSelectedTheater = (e) => {
    const selectedTheater = _.find(this.state.theater, ['maCumRap', e.key]);
    if (!selectedTheater) {
      return;
    }

    const dateArr = selectedTheater.lichChieuPhim;
    const curDate = new Date();
    const showtimeList = [];

    _.forEach(dateArr, (item) => {
      const flag = new Date(item.ngayChieuGioChieu);

      if (flag >= curDate) {
        const content = `${flag.getDate()}/${
          flag.getMonth() + 1
        }/${flag.getFullYear()}`;
        showtimeList.push({ ...item, content });
      }
    });
    const date = _.uniqBy(showtimeList, 'content');
    this.setState({
      selectedTheater: selectedTheater.tenCumRap,
      showtimeList,
      date,
      showtime: null,
      selectedDate: null,
      selectedShowtime: null,
    });
  };
  onSelectedDate = (e) => {
    const selectedDate = e.key;
    if (!_.isEmpty(this.state.showtimeList)) {
      // const showtime = _.filter(this.state.showtimeList, ['content', e.key]);
      const showtime = [];
      _.forEach(this.state.showtimeList, (item) => {
        if (item.content === e.key) {
          const time = new Date(item.ngayChieuGioChieu).toLocaleTimeString();
          showtime.push({ ...item, time });
        }
      });

      this.setState({ selectedDate, showtime });
    }
  };
  onSelectedShowtime = (e) => {
    const showtimeId = e.key;
    if (!_.isEmpty(this.state.showtime)) {
      const selectedShowtime = _.find(this.state.showtime, [
        'maLichChieu',
        showtimeId,
      ]);
      this.setState({ selectedShowtime });
    }
  };
  render() {
    return (
      <div className='filter'>
        <FilterDropdown
          label={this.state.selectedMovie ? this.state.selectedMovie : 'Phim'}
          msg='Không có phim nào được chiếu'
          data={this.state.movies}
          id='maPhim'
          item='tenPhim'
          onSelectedItem={this.onSelectedMovie}
        />
        <FilterDropdown
          label={
            this.state.selectedTheater ? this.state.selectedTheater : 'Rạp'
          }
          msg='Vui lòng chọn phim'
          data={this.state.theater}
          id='maCumRap'
          item='tenCumRap'
          onSelectedItem={this.onSelectedTheater}
        />
        <FilterDropdown
          label={this.state.selectedDate ? this.state.selectedDate : 'Ngày xem'}
          msg='Vui lòng chọn rạp và phim'
          data={this.state.date}
          id='content'
          item='content'
          onSelectedItem={this.onSelectedDate}
        />
        <FilterDropdown
          label={
            this.state.selectedShowtime
              ? this.state.selectedShowtime.time
              : 'Suất chiếu'
          }
          msg='Vui lòng chọn phim, rạp và ngày xem'
          data={this.state.showtime}
          id='maLichChieu'
          item='time'
          onSelectedItem={this.onSelectedShowtime}
        />
        <Button
          className='filter__button'
          style={{
            margin: '0 10px',
            backgroundColor: '#4a4a4a',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
          }}
          onClick={() => {
            if (!this.state.selectedShowtime.maLichChieu) {
              const key = 'updatable';
              this.setState({ isSuccess: false }, () =>
                setTimeout(() => {
                  message.error({
                    content: 'Vui lòng chọn lịch chiếu',
                    key,
                    duration: 2,
                  });
                }, 2000)
              );
            } else {
              history.push(
                `/booking/${this.state.selectedShowtime.maLichChieu}`
              );
            }
          }}
        >
          MUA VÉ NGAY
        </Button>
      </div>
    );
  }

  async componentDidMount() {
    try {
      const { data } = await movieApi.fetchAllMovieApi();
      const curDate = new Date();
      const movies = data.filter((item) => {
        return new Date(item.ngayKhoiChieu) <= curDate;
      });
      this.setState({ movies });
    } catch (err) {
      console.log(err);
    }
  }
}
