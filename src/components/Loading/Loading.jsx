import React, { Component } from 'react';
import './Loading.scss';

export default class Loading extends Component {
  render() {
    return (
      <div className='loading'>
        <img src='https://i.stack.imgur.com/kOnzy.gif' alt='' />
      </div>
    );
  }
}
