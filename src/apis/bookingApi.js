import callApi from '../utils/callApi';

const bookingApi = {
  createShowtimeApi(data, token) {
    return callApi(`QuanLyDatVe/TaoLichChieu`, 'POST', data, token);
  },
  getBoxList(bookingId) {
    return callApi(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${bookingId}`);
  },
  bookTicket(data, token) {
    return callApi(`QuanLyDatVe/DatVe`, 'POST', data, token);
  },
};

export default bookingApi;
