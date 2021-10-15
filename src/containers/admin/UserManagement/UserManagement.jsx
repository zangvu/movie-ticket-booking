import { Button } from "antd";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Space, Table, Input } from "antd";
import userApi from "../../../apis/userApi";
import { connect } from "react-redux";
import UpdateUser from "./UpdateUser/UpdateUser";

const { Search } = Input;
class UserManagement extends Component {
  state = {
    listUsers: null,
    selectUser: null,
    visible: false,
  };

  onModalClick = async (selectUser) => {
    this.setState({ visible: true, selectUser });
  };
  updateList = async () => {
    try {
      const { data } = await userApi.fetchAllUserAdmin();
      this.setState({ listUsers: data });
    } catch (error) {
      console.log(error);
    }
  };
  deleteUser = async (taikhoan) => {
    const token = this.props.currentUser.accessToken;
    try {
      await userApi.deleteUserAdmin(taikhoan, token);
      const { data } = await userApi.fetchAllUserAdmin();
      this.setState({ listUsers: data });
    } catch (error) {
      console.log(error);
    }
  };

  onSearch = async (value) => {
    try {
      const { data } = await userApi.searchUser(value);
      this.setState({ listUsers: data });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const columns = [
      {
        title: "Tài Khoản",
        dataIndex: "taiKhoan",
        key: "taiKhoan",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Họ Tên",
        dataIndex: "hoTen",
        key: "hoTen",
      },
      {
        title: "Số Điện Thoại",
        dataIndex: "soDt",
        key: "soDt",
        render: (text) => <div className="dashboard__table">{text}</div>,
      },
      {
        title: "Email ",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Mã Loại Người Dùng ",
        dataIndex: "maLoaiNguoiDung",
        key: "maLoaiNguoiDung",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Button type="primary" onClick={() => this.onModalClick(record)}>
              Sửa
            </Button>

            <button
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm("bạn có muốn xóa tài khoản này không")) {
                  this.deleteUser(record.taiKhoan);
                }
              }}
            >
              X
            </button>
          </Space>
        ),
      },
    ];
    return (
      <div>
        <UpdateUser
          visible={this.state.visible}
          onOk={() => {
            this.setState({ visible: false });
          }}
          onCancel={() => {
            this.setState({ visible: false });
          }}
          user={this.state.selectUser}
          listUsers={this.state.listUsers}
          updateList={this.updateList}
        />

        <Link to="/admin/add-user">
          <Button className="mb-3">Thêm người dùng</Button>
        </Link>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={this.onSearch}
          className="mb-4"
        />
        <Table columns={columns} dataSource={this.state.listUsers} />
      </div>
    );
  }
  async componentDidMount() {
    try {
      const { data } = await userApi.fetchAllUserAdmin();
      this.setState({ listUsers: data });
    } catch (error) {
      console.log(error);
    }
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
});

export default connect(mapStateToProps, null)(UserManagement);
