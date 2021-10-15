import React, { Component } from "react";
import { connect } from "react-redux";
import userApi from "../../../apis/userApi";

import "./LichSuDatVe.scss";
import UpdateProfile from "../UpadateProfile/UpdateProfile";
import { Button } from "antd";

class LichSuDatVe extends Component {
  state = {
    thongTinNguoiDung: "",
    visible: false,
  };
  onModalClick = () => {
    this.setState({ visible: true });
  };
  updateUser = async () => {
    try {
      const { data } = await userApi.layThongTinNguoiDung({
        taiKhoan: this.props.currentUser.taiKhoan,
      });
      this.setState({ thongTinNguoiDung: data });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    // console.log(this.state.thongTinNguoiDung);
    return (
      <>
        <div className="container-fluid lichSuDatVe">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 text-left ">
              <h2>Thông Tin Người Dùng</h2>
              <div>
                <p>
                  <span className="font-weight-bold">Họ Tên</span> :{" "}
                  {this.state.thongTinNguoiDung.hoTen}
                </p>
                <p>
                  <span className="font-weight-bold">Tài Khoản</span> :{" "}
                  {this.state.thongTinNguoiDung.taiKhoan}
                </p>
                <p>
                  <span className="font-weight-bold">Email</span> :{" "}
                  {this.state.thongTinNguoiDung.email}
                </p>
                <p>
                  <span className="font-weight-bold">Số Điện Thoại</span> :{" "}
                  {this.state.thongTinNguoiDung.soDT}
                </p>
              </div>
              <Button
                onClick={() => {
                  this.onModalClick();
                }}
              >
                Cập nhật thông tin
              </Button>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  ">
              <h2>Lịch Sử Đặt Vé</h2>
              <div className="row">
                {this.state.thongTinNguoiDung.thongTinDatVe?.map((ve, idx) => {
                  return (
                    <>
                      <div
                        className="col-3 mb-3"
                        style={{ border: "1px solid black" }}
                      >
                        <p>
                          <span className="font-weight-bold">Tên Phim</span> :{" "}
                          {ve.tenPhim}
                        </p>
                        <p>
                          <span className="font-weight-bold">Giá Vé</span> :{" "}
                          {ve.giaVe}
                        </p>
                        <p>
                          <span className="font-weight-bold">Mã Vé</span> :{" "}
                          {ve.maVe}
                        </p>
                        <p>
                          <span className="font-weight-bold">Ngày Đặt</span> :{" "}
                          {ve.ngayDat}
                        </p>
                        <p>
                          <span className="font-weight-bold">
                            Thời Lượng Phim
                          </span>{" "}
                          : {ve.thoiLuongPhim} Phút
                        </p>
                      </div>

                      <div
                        className="col-3 mb-3"
                        style={{ border: "1px solid black" }}
                      >
                        {ve.danhSachGhe?.map((ghe, index) => {
                          return (
                            <div key={index}>
                              <p className="text-black">
                                Ghế {ghe.tenGhe}-{ghe.tenCumRap}-
                                {ghe.tenHeThongRap}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Update profile */}
        <UpdateProfile
          user={this.state.thongTinNguoiDung}
          visible={this.state.visible}
          onOk={() => {
            this.setState({ visible: false });
          }}
          onCancel={() => {
            this.setState({ visible: false });
          }}
          updateUser={this.updateUser}
        />
      </>
    );
  }

  componentDidMount() {
    // console.log(this.props.currentUser);
    userApi
      .layThongTinNguoiDung({ taiKhoan: this.props.currentUser.taiKhoan })
      .then((res) => {
        // console.log(res.data);
        this.setState({
          thongTinNguoiDung: res.data,
        });
      })
      .catch((error) => {
        console.log(error.response?.data);
      });
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
});

export default connect(mapStateToProps)(LichSuDatVe);
