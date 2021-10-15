import React, { Component } from 'react';
import Loading from '../../../components/Loading/Loading';
import TheaterInfo from './TheaterInfo/TheaterInfo';
import TheaterShowtime from './TheaterShowtime/TheaterShowtime';

export default class TheaterDetail extends Component {
  state = { loading: true };
  render() {
    if (this.state.loading) return <Loading />;
    return (
      <>
        <TheaterInfo />
        <TheaterShowtime />
      </>
    );
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 300);
  }
}
