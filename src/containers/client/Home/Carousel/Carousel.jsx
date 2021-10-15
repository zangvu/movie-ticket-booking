import React, { Component } from 'react';
import './Carousel.scss';
import Slider from 'react-slick';
import movieApi from '../../../../apis/movieApi';
import { getYoutubeThumbnail } from '../../../../utils/getImgFromLink';
import PlayButton from '../../../../components/PlayButton/PlayButton';
import { Link } from 'react-router-dom';
import TrailerModal from '../../../../components/TrailerModal/TrailerModal';

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isModalVisible: false,
      trailer: '',
    };
    this.myRef = React.createRef();
  }

  showTrailer = (trailer) => {
    this.setState({ isModalVisible: true, trailer });
  };
  handleCancel = () => {
    this.myRef.current.src = '';
    this.setState({ trailer: '', isModalVisible: false });
  };
  render() {
    return (
      <div className='slider'>
        <TrailerModal
          isModalVisible={this.state.isModalVisible}
          handleCancel={this.handleCancel}
          myRef={this.myRef}
          src={this.state.trailer}
        />
        <Slider>
          {this.state.movies.map((movie) => {
            let img = getYoutubeThumbnail(movie.trailer);
            return (
              <div key={movie.maPhim} className='carousel__item'>
                <Link to={`/movie-detail/${movie.maPhim}`}>
                  <img src={img} alt='img' />
                </Link>
                <PlayButton
                  className='carousel__play'
                  size='5rem'
                  onClick={() => {
                    this.showTrailer(movie.trailer);
                  }}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
  async componentDidMount() {
    try {
      const { data } = await movieApi.fetchMovieWithPaginationApi(1, 4);
      this.setState({ movies: data.items });
    } catch (err) {
      console.log(err);
    }
  }
}
