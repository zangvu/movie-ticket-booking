import React, { Component } from 'react';
import { Spin, Tabs } from 'antd';
import './MovieList.scss';
import { Row, Col } from 'antd';
import movieApi from '../../../../apis/movieApi';
import PlayButton from '../../../../components/PlayButton/PlayButton';
import Slider from 'react-slick';
import _ from 'lodash';
import history from '../../../../utils/history';
import TrailerModal from '../../../../components/TrailerModal/TrailerModal';
import axios from 'axios';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentMovies: null,
      upcomingMovies: null,
      trailer: '',
    };

    this.myRef = React.createRef();
  }

  callback = async () => {
    const { recentMovies, upcomingMovies } = this.state;
    if (recentMovies === null || upcomingMovies === null) {
      try {
        const curDate = new Date();
        // past 2 year
        const flag = curDate.getFullYear() + 2;

        // get movie from 'from' date
        const to = '01%2F01%2F' + flag;

        // get movie to 'to' date
        const day = `${curDate.getDate()}`.padStart(2, '0');
        const month = `${curDate.getMonth() + 1}`.padStart(2, '0');
        const year = curDate.getFullYear();
        const from = [day, month, year].join('%2F');

        const { data } = await movieApi.fetchMovieOnDateApi(from, to, 1, 100);
        this.setState({ upcomingMovies: data });
      } catch (err) {
        console.log(err);
      }
    }
  };

  showTrailer = (trailer) => {
    this.setState({ isModalVisible: true, trailer });
  };
  handleCancel = () => {
    this.myRef.current.src = '';
    this.setState({ trailer: '', isModalVisible: false });
  };
  renderTemplate = (movies, idx) => {
    return (
      <div className='movielist__collection' key={idx}>
        <TrailerModal
          isModalVisible={this.state.isModalVisible}
          handleCancel={this.handleCancel}
          myRef={this.myRef}
          src={this.state.trailer}
        />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} key={idx}>
          {movies.map((movie) => (
            <Col className='gutter-row' span={6} key={movie.maPhim}>
              <div className='movielist__item'>
                <div className='movielist__img'>
                  <img src={movie.hinhAnh} alt='hinhAnh' />
                  <div className='movielist__rating'></div>
                  <div
                    className='movielist__overlay'
                    onClick={() => {
                      history.push(`/movie-detail/${movie.maPhim}`);
                    }}
                  ></div>
                  <PlayButton
                    className='movielist__button'
                    size='3em'
                    onClick={() => {
                      this.showTrailer(movie.trailer);
                    }}
                  />
                </div>
                <div className='movielist__content'>
                  <h6>
                    <span className='label'>C18</span>
                    <span className='title'>{movie.tenPhim}</span>
                  </h6>
                  {/* <p style={{ color: '#919191', fontWeight: '500' }}>
                127 phút - 6.2 IMDb
              </p> */}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  };
  renderMovieItem = (movies) => {
    const fragments = _.chunk(movies, 8);
    const result = fragments.map((fragment, idx) =>
      this.renderTemplate(fragment, idx)
    );
    return result;
  };

  render() {
    const settings = {
      dots: true,
      // fade: true,
      infinite: true,
      // speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };
    if (!this.state.recentMovies)
      return (
        <div className='spinner'>
          <Spin />
        </div>
      );
    return (
      <Tabs
        defaultActiveKey='1'
        onChange={this.callback}
        centered
        className='movielist'
        animated={{ inkBar: true, tabPane: true }}
      >
        <Tabs.TabPane tab='Đang chiếu' key='1'>
          <div>
            <Slider {...settings}>
              {this.state.recentMovies
                ? this.renderMovieItem(this.state.recentMovies)
                : null}
            </Slider>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Sắp chiếu' key='2'>
          {this.state.upcomingMovies ? (
            <Slider {...settings}>
              {this.state.upcomingMovies
                ? this.renderMovieItem(this.state.upcomingMovies)
                : null}
            </Slider>
          ) : (
            <div className='spinner'>
              <Spin />
            </div>
          )}
        </Tabs.TabPane>
      </Tabs>
    );
  }
  async componentDidMount() {
    try {
      const curDate = new Date();
      // past 2 year
      const flag = curDate.getFullYear() - 2;

      // get movie from 'from' date
      const from = '01%2F01%2F' + flag;

      // get movie to 'to' date
      const day = `${curDate.getDate()}`.padStart(2, '0');
      const month = `${curDate.getMonth() + 1}`.padStart(2, '0');
      const year = curDate.getFullYear();
      const to = [day, month, year].join('%2F');

      const { data } = await movieApi.fetchMovieOnDateApi(from, to, 1, 100);

      this.setState({ recentMovies: data });
    } catch (err) {
      console.log(err);
    }
  }
}
