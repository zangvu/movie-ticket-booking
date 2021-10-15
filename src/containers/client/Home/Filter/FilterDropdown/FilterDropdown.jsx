import React, { Component } from 'react';
import { Dropdown, Button, Menu, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export default class FilterDropdown extends Component {
  // handleButtonClick(e) {
  //   message.info('Click on left button.');
  //   console.log('click left button', e);
  // }

  handleMenuClick = (e) => {
    this.props.onSelectedItem(e);
  };
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {this.props.data ? (
          this.props.data.map((item) => (
            <Menu.Item key={item[this.props.id]}>
              {item[this.props.item]}
            </Menu.Item>
          ))
        ) : (
          <Menu.Item key='1'>{this.props.msg}</Menu.Item>
        )}
      </Menu>
    );
    return (
      <div style={{ borderRight: '1px solid #f3f3f3', width: '50%' }}>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button
            type='link'
            style={{
              color: '#000000',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <span>{this.props.label}</span>
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    );
  }
}
