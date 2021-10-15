import { GROUP_ID } from "../settings/apiConfig";
import callApi from "../utils/callApi";
const userApi = {
  loginApi: (user) => callApi("QuanLyNguoiDung/DangNhap", "POST", user),
  signupApi: (user) => {
    return callApi("QuanLyNguoiDung/DangKy", "POST", user);
  },
  //List user
  fetchAllUserAdmin: () => {
    return callApi(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`);
  },

  //Add user
  addUserAdmin: (formData, token) => {
    return callApi("QuanLyNguoiDung/ThemNguoiDung", "POST", formData, token);
  },

  //Delete User
  deleteUserAdmin: (taiKhoan, token) => {
    return callApi(
      `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
      "DELETE",
      null,
      token
    );
  },
  //Search User
  searchUser: (taiKhoan) => {
    return callApi(
      `QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${taiKhoan}`
    );
  },

  //Update user
  updateUser: (formData, token) => {
    return callApi(
      `QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      "PUT",
      formData,
      token
    );
  },

  //Lấy thông tin người dùng
  layThongTinNguoiDung: (taiKhoan) => {
    return callApi("QuanLyNguoiDung/ThongTinTaiKhoan", "POST", taiKhoan);
  },
};

export default userApi;
