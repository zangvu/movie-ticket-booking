import React, { Component } from "react";
import userApi from "../../../../apis/userApi";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { message } from "antd";
import history from "../../../../utils/history";

const addUserSchema = yup.object().shape({
  taiKhoan: yup.string().required("Vui lòng nhập tài khoản"),
  matKhau: yup.string().required("Vui lòng nhập mật khẩu"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  soDt: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^[0-9]+$/),
  maNhom: yup.string().required("Vui lòng nhập mã nhóm"),
  maLoaiNguoiDung: yup.string().required("Vui lòng nhập loại người dùng"),
  hoTen: yup.string().required("Vui lòng nhập họ tên"),
});

class AddUser extends Component {
  state = {
    isSuccess: false,
  };

  handleSubmit = async (values) => {
    // console.log(values);
    try {
      await userApi.addUserAdmin(values, this.props.currentUser.accessToken);
      const key = "updatable";
      this.setState({ isSuccess: true }, () =>
        setTimeout(() => {
          message.success({ content: "Tác vụ thành công", key, duration: 2 });
        }, 1000)
      );
      history.push("/admin/user-management");
      // alert("Thêm thành công");
    } catch (error) {
      // console.log(error.response?.data);
      const key = "updatable";
      this.setState({ isSuccess: false }, () =>
        setTimeout(() => {
          message.error({
            content: error.response.data,
            key,
            duration: 2,
          });
        }, 2000)
      );
    }
  };
  render() {
    return (
      <div className="container">
        <h3>Thêm tài khoản</h3>
        <Formik
          initialValues={{
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maNhom: "GP14",
            maLoaiNguoiDung: "KhachHang",
            hoTen: "",
          }}
          validationSchema={addUserSchema}
          onSubmit={this.handleSubmit}
          render={(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <div class="form-group">
                <label>Tài Khoản</label>
                <Field
                  type="text"
                  name="taiKhoan"
                  class="form-control"
                  onchange={formik.handleChange}
                />
                <ErrorMessage name="taiKhoan">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div class="form-group">
                <label>Mật khẩu</label>
                <Field
                  type="password"
                  name="matKhau"
                  class="form-control"
                  onchange={formik.handleChange}
                />
                <ErrorMessage name="matKhau">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div class="form-group">
                <label>Email</label>
                <Field
                  type="text"
                  name="email"
                  class="form-control"
                  onchange={formik.handleChange}
                />
                <ErrorMessage name="email">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div class="form-group">
                <label>Số điện thoại</label>
                <Field
                  type="text"
                  name="soDt"
                  class="form-control"
                  onchange={formik.handleChange}
                />
                <ErrorMessage name="soDt">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div class="form-group">
                <label>Mã nhóm</label>
                <Field
                  component="select"
                  name="maNhom"
                  class="form-control"
                  onchange={formik.handleChange}
                >
                  <option>GP01</option>
                  <option>GP02</option>
                  <option>GP03</option>
                  <option>GP04</option>
                  <option>GP05</option>
                  <option>GP06</option>
                  <option>GP07</option>
                  <option>GP08</option>
                  <option>GP09</option>
                  <option>GP10</option>
                  <option>GP11</option>
                  <option>GP12</option>
                  <option>GP13</option>
                  <option>GP14</option>
                </Field>
                <ErrorMessage name="maNhom">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div class="form-group">
                <label>Mã Loại người dùng</label>
                <Field
                  component="select"
                  type="text"
                  name="maLoaiNguoiDung"
                  class="form-control"
                  onchange={formik.handleChange}
                >
                  <option>QuanTri</option>
                  <option>KhachHang</option>
                </Field>
                <ErrorMessage name="maLoaiNguoiDung">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div class="form-group">
                <label>Họ tên</label>
                <Field
                  type="text"
                  name="hoTen"
                  class="form-control"
                  onchange={formik.handleChange}
                />
                <ErrorMessage name="hoTen">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div>
                <button className="btn btn-primary">Thêm người dùng</button>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.authReducer.currentUser,
  };
};

export default connect(mapStateToProps)(AddUser);
