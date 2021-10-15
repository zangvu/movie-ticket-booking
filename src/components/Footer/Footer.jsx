import React, { Component } from "react";
import "./Footer.scss";
export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="myContainer">
          <div className="footer__top">
            <ul className="footer__list">
              <li className="footer__item">
                <a href="#">Câu hỏi thường gặp</a>
              </li>
              <li className="footer__item">
                <a href="#">Trung tâm hỗ trợ</a>
              </li>
              <li className="footer__item">
                <a href="#">Tài khoản</a>
              </li>
              <li className="footer__item">
                <a href="#">Quan hệ với nhà đầu tư</a>
              </li>
              <li className="footer__item">
                <a href="#">Việc làm</a>
              </li>
              <li className="footer__item">
                <a href="#">Điều khoản sử dụng</a>
              </li>
              <li className="footer__item">
                <a href="#">Quyền riêng tư</a>
              </li>
              <li className="footer__item">
                <a href="#">Thông tin đối tác</a>
              </li>
              <li className="footer__item">
                <a href="#">Liên hệ với chúng tôi</a>
              </li>
              <li className="footer__item">
                <a href="#">Thông báo pháp lý</a>
              </li>
            </ul>
          </div>
          <div className="footer__bottom">
            <div className="row">
              <div className="col-1">
                <a href="#">
                  <img className="imgZion" src="/images/zion.jpg" />
                </a>
              </div>
              <div className="col-9">
                <span className="">
                  TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION
                </span>
                <span>
                  Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp.
                  Hồ Chí Minh, Việt Nam.
                </span>
                <span>
                  Giấy chứng nhận đăng ký kinh doanh số: 0101659783,
                  <br />
                  đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở
                  kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
                </span>
                <span>Số Điện Thoại (Hotline): 1900 545 436</span>
                <span>
                  Email: <a href="#!">support@tix.vn</a>
                </span>
              </div>
              <div className="col-2">
                <a href="#">
                  <img className="imgBCT" src="/images/bocongthuong.png" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
