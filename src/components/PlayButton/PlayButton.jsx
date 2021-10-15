import { PlayCircleOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import './PlayButton.scss';

export default class PlayButton extends Component {
  render() {
    return (
      <div>
        <PlayCircleOutlined
          className={`playbutton ${this.props.className}`}
          style={{ fontSize: `${this.props.size}` }}
          onClick={this.props.onClick}
        />
      </div>
    );
  }
}
PlayButton.defaultProps = {
  className: '',
  size: '1em',
  onClick: () => {},
};
