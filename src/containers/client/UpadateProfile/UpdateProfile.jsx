import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "antd";
import * as yup from "yup";
import { Form, Field, Formik, ErrorMessage } from "formik";
import userApi from "../../../apis/userApi";

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
    .matches(/^[0-9]+$/, "Số điện thoại phải là số"),
  maNhom: yup.string().required("Vui lòng nhập mã nhóm"),
  maLoaiNguoiDung: yup.string().required("Vui lòng nhập loại người dùng"),
  hoTen: yup.string().required("Vui lòng nhập họ tên"),
});
class UpdateProfile extends Component {
  handleSubmit = async (values) => {
    console.log(values);
    try {
      await userApi.updateUser(values, this.props.currentUser.accessToken);
      alert("Cập nhật thành công");
    } catch (error) {
      console.log(error.response?.data);
    }
  };
  render() {
    // console.log(this.props.user);
    return (
      <>
        <Modal
          title="Cập nhật thông tin"
          centered
          visible={this.props.visible}
          onOk={() => {
            this.props.onOk();
          }}
          onCancel={() => {
            this.props.onCancel();
          }}
          afterClose={() => {
            this.props.updateUser();
          }}
        >
          <Formik
            enableReinitialize={true}
            initialValues={{
              matKhau: this.props.user?.matKhau,
              email: this.props.user?.email,
              soDt: this.props.user?.soDT,
              hoTen: this.props.user?.hoTen,
              maNhom: "GP14",
              maLoaiNguoiDung: "KhachHang",
              taiKhoan: this.props.user?.taiKhoan,
            }}
            validationSchema={addUserSchema}
            onSubmit={this.handleSubmit}
            render={(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <div class="form-group">
                  <label hidden>Tài Khoản</label>
                  <Field
                    type="text"
                    name="taiKhoan"
                    class="form-control"
                    onchange={formik.handleChange}
                    value={formik.values.taiKhoan}
                    disabled={true}
                    hidden={true}
                  />
                  <ErrorMessage name="taiKhoan">
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
                    value={formik.values.hoTen}
                  />
                  <ErrorMessage name="hoTen">
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
                    value={formik.values.matKhau}
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
                    value={formik.values.email}
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
                    value={formik.values.soDt}
                  />
                  <ErrorMessage name="soDt">
                    {(msg) => <div className="text-danger">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div class="form-group">
                  <label hidden>Mã Loại người dùng</label>
                  <Field
                    component="select"
                    type="text"
                    name="maLoaiNguoiDung"
                    class="form-control"
                    onchange={formik.handleChange}
                    value={formik.values.maLoaiNguoiDung}
                    hidden="true"
                  >
                    <option>QuanTri</option>
                    <option>KhachHang</option>
                  </Field>
                  <ErrorMessage name="maLoaiNguoiDung">
                    {(msg) => <div className="text-danger">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div class="form-group">
                  <label hidden>Mã nhóm</label>
                  <Field
                    component="select"
                    name="maNhom"
                    class="form-control"
                    onchange={formik.handleChange}
                    hidden={true}
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
                <div>
                  <button className="btn btn-primary">
                    Cập nhật thông tin
                  </button>
                </div>
              </Form>
            )}
          />
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
});

export default connect(mapStateToProps)(UpdateProfile);
