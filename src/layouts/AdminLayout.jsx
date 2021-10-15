import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import withLayout from '../hocs/withLayout';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import { actLogout } from '../containers/shared/Auth/module/actions';
import history from '../utils/history';
import { Link } from 'react-router-dom';
import './Layout.scss';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
class AdminLayout extends Component {
  onClick = ({ key }) => {
    if (key === '2') {
      this.props.logout();
      history.push('/');
    }
  };
  menu = (
    <Menu onClick={this.onClick}>
      <Menu.Item key='2'>Đăng xuất</Menu.Item>
    </Menu>
  );
  render() {
    const { pathname } = history.location;
    return this.props.currentUser &&
      this.props.currentUser.maLoaiNguoiDung === 'QuanTri' ? (
      <Layout>
        <Sider style={{ minHeight: '100vh' }}>
          <div className='logo' />
          <div className={`link ${'/admin' === pathname && 'active'}`}>
            <Link to='/admin'>Quản lý phim</Link>
          </div>
          <div
            className={`link ${
              '/admin/user-management' === pathname && 'active'
            }`}
          >
            <Link to='/admin/user-management'>Quản lý người dùng</Link>
          </div>
          {/* <Menu theme="dark" defaultSelectedKeys={["3"]} mode="inline">
            <Menu.Item key="3" icon={<VideoCameraOutlined />}>
              <Link to="/admin">Quản lý phim</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link to="/admin/user-management">Quản lý người dùng</Link>
            </Menu.Item>
          </Menu> */}
        </Sider>
        <Layout>
          <Header
            className='site-layout-sub-header-background'
            style={{ padding: 0 }}
          >
            <Dropdown overlay={this.menu}>
              <a
                className='ant-dropdown-link'
                onClick={(e) => e.preventDefault()}
              >
                <Avatar icon={<UserOutlined />} />
                <span style={{ color: '#fff', marginLeft: '10px' }}>
                  Chào!, {this.props.currentUser.hoTen}
                </span>
                <CaretDownOutlined style={{ color: '#fff' }} />
              </a>
            </Dropdown>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              className='site-layout-background'
              style={{ padding: 24, minHeight: 360 }}
            >
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    ) : (
      <Redirect to='/' />
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
});
export default withLayout(
  connect(mapStateToProps, { logout: actLogout })(AdminLayout)
);
