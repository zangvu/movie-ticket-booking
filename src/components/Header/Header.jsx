import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Header.scss";
import {
  UserOutlined,
  UserAddOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import history from "../../utils/history";
import { connect } from "react-redux";
import { actLogout } from "../../containers/shared/Auth/module/actions";

class Header extends Component {
  onClick = ({ key }) => {
    if (key === "2") {
      this.props.logout();
      history.push("/");
    }
  };
  menu = (
    <Menu onClick={this.onClick}>
      <Menu.Item key="1">
        <Link to="/thongTinNGuoiDung">Thông tin cá nhân</Link>
      </Menu.Item>
      <Menu.Item key="2">Đăng xuất</Menu.Item>
    </Menu>
  );

  render() {
    return (
      <div className="header">
        <img
          src="https://tix.vn/app/assets/img/icons/web-logo.png"
          alt="logo"
          onClick={() => {
            history.push("/");
          }}
        />
        <ul className="header__nav">
          <li>
            <Link to="/">Lịch chiếu</Link>
          </li>
          <li>
            <Link to="/">Cụm rạp</Link>
          </li>
          <li>
            <Link to="/">Tin tức</Link>
          </li>
          <li>
            <Link to="/">Ứng dụng</Link>
          </li>
        </ul>
        <div className="header__private">
          {this.props.currentUser ? null : (
            <div className="header__item">
              <Link to="/register">
                <Avatar icon={<UserAddOutlined />} />
                <span className="header__text">Đăng ký</span>
              </Link>
            </div>
          )}
          <div className="header__item">
            {this.props.currentUser ? (
              <Dropdown
                // to='/'
                // onClick={() => {
                //   this.props.logout();
                // }}
                overlay={this.menu}
              >
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <Avatar icon={<UserOutlined />} />
                  <span className="header__text">
                    Chào!, {this.props.currentUser.hoTen}
                  </span>
                  <CaretDownOutlined />
                </a>
              </Dropdown>
            ) : (
              <Link to="/login">
                <Avatar icon={<UserOutlined />} />
                <span className="header__text">Đăng nhập</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actLogout()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
