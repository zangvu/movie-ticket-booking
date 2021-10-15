import { Modal } from 'antd';
import React, { Component } from 'react';

export default class TrailerModal extends Component {
  render() {
    return (
      <Modal
        visible={this.props.isModalVisible}
        footer={null}
        maskClosable={true}
        onCancel={this.props.handleCancel}
        width={1000}
        bodyStyle={{ height: '500px' }}
      >
        <iframe
          ref={this.props.myRef}
          width='100%'
          height='100%'
          src={this.props.src}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        ></iframe>
      </Modal>
    );
  }
}
