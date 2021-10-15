import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import "./Signup.scss";
import Loading from "../../../../components/Loading/Loading";
import userApi from "../../../../apis/userApi";
import history from "../../../../utils/history";
import { message } from "antd";

const signUpSchema = yup.object().shape({
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
export default class Signup extends Component {
  state = {
    isSuccess: false,
  };
  handleSubmit = async (values) => {
    console.log(values);
    try {
      await userApi.signupApi(values);
      const key = "updatable";
      this.setState({ isSuccess: true }, () =>
        setTimeout(() => {
          message.success({ content: "Tác vụ thành công", key, duration: 2 });
        }, 1000)
      );
      // alert("Đăng ký thành công");
      history.push("/login");
    } catch (error) {
      console.log(error.response?.data);
    }
  };
  render() {
    return (
      <div className="signup">
        {this.props.loading ? (
          <Loading />
        ) : (
          <div className="signup__container">
            <img
              src="https://tix.vn/app/assets/img/login/group@2x.png"
              alt="login-logo"
            />
            <div className="signup__form">
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
                validationSchema={signUpSchema}
                onSubmit={this.handleSubmit}
                render={(formik) => (
                  <Form className="form">
                    <div class="form-group">
                      <label>Tài Khoản</label>
                      <Field
                        type="text"
                        name="taiKhoan"
                        class="form-control"
                        // placeholder="Tài khoản"
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

                    <button className="btn btn-primary mt-2">Đăng ký</button>
                  </Form>
                )}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
