import React, { Component } from 'react';
import Carousel from './Carousel/Carousel';
import Filter from './Filter/Filter';
import Showtime from './Showtime/Showtime';
import './Home.scss';
import MovieList from './MovieList/MovieList';
import Loading from '../../../components/Loading/Loading';

export default class Home extends Component {
  state = { loading: true };
  render() {
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
          <>
            <Carousel />
            <Filter />
            <MovieList />
            <Showtime />
          </>
        )}
      </div>
    );
  }
  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 300);
  }
}
