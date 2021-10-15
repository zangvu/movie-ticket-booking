import {
  Button,
  Modal,
  Form,
  Select,
  DatePicker,
  Input,
  Row,
  Col,
  message,
} from 'antd';
import { Table } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import bookingApi from '../../../../apis/bookingApi';
import movieApi from '../../../../apis/movieApi';
import theaterApi from '../../../../apis/theaterApi';

class Showtime extends Component {
  state = {
    systems: null,
    cinemas: null,
    rooms: null,
    showtimes: null,
    modalLoading: true,
    selectedMovie: null,
  };
  flattenObj = (obj, parent, res = {}) => {
    for (let key in obj) {
      let propName = parent ? parent + '_' + key : key;
      if (typeof obj[key] == 'object') {
        this.flattenObj(obj[key], propName, res);
      } else {
        res[propName] = obj[key];
      }
    }
    return res;
  };
  handleSystemsMenuClick = async (value) => {
    const { data } = await theaterApi.fetchCinemaBySystemApi(value);
    this.setState({ cinemas: data, rooms: null });
  };
  handleCinemasMenuClick = (value) => {
    const cinema = this.state.cinemas.find((cinema) => {
      return value === cinema.maCumRap;
    });
    this.setState({ rooms: cinema.danhSachRap });
  };
  handleRoomsMenuClick = (maRap) => {};
  onFinish = async (values) => {
    this.setState({ modalLoading: true });
    const showtime = values.ngayChieuGioChieu;
    const ngayChieuGioChieu = showtime.format('DD/MM/YYYY HH:mm:ss');
    const formData = {
      maPhim: this.props.movie.maPhim,
      ngayChieuGioChieu,
      maRap: values.maRap,
      giaVe: parseInt(values.giaVe),
    };
    try {
      await bookingApi.createShowtimeApi(
        formData,
        this.props.currentUser.accessToken
      );
      const showtimes = [];
      const { data } = await movieApi.fetchMovieById(this.props.movie.maPhim);
      let { lichChieu } = data;
      lichChieu.forEach((item) => {
        const curDate = new Date();
        const d = new Date(item.ngayChieuGioChieu);
        if (d >= curDate) {
          const flag = this.flattenObj(item, '');
          showtimes.push(flag);
        }
      });
      this.setState({
        showtimes,
        modalLoading: false,
      });
    } catch (err) {
      const key = 'updatable';
      this.setState({ modalLoading: false }, () =>
        setTimeout(() => {
          message.error({
            content: err.response.data,
            key,
            duration: 2,
          });
        }, 100)
      );
    }
  };
  onFinishFail = (value) => {
    console.log(value);
  };
  async componentDidMount() {
    const { data } = await theaterApi.fetchSystems();

    this.setState({
      systems: data,
    });
  }
  async componentDidUpdate(prevProps) {
    if (
      this.props.movie &&
      prevProps.movie.maPhim !== this.props.movie.maPhim
    ) {
      const showtimes = [];
      const { data } = await movieApi.fetchMovieById(this.props.movie.maPhim);
      let { lichChieu } = data;
      lichChieu.forEach((item) => {
        const curDate = new Date();
        const d = new Date(item.ngayChieuGioChieu);
        if (d >= curDate) {
          const flag = this.flattenObj(item, '');
          showtimes.push(flag);
        }
      });
      this.setState({
        selectedMovie: this.props.movie,
        showtimes,
        modalLoading: false,
      });
    }
  }
  render() {
    const { Option } = Select;
    const columns = [
      {
        title: 'Mã lịch chiếu',
        dataIndex: 'maLichChieu',
        key: 'maLichChieu',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Hệ thống rạp',
        dataIndex: 'thongTinRap_tenHeThongRap',
        key: 'thongTinRap_tenHeThongRap',
      },
      {
        title: 'Cụm rạp',
        dataIndex: 'thongTinRap_tenCumRap',
        key: 'thongTinRap_tenCumRap',
      },
      {
        title: 'Ngày giờ chiếu',
        dataIndex: 'ngayChieuGioChieu',
        key: 'ngayChieuGioChieu',
        render: (text) => moment(text).format('DD/MM/YYYY HH:mm:ss'),
      },
      {
        title: 'Giá vé',
        dataIndex: 'giaVe',
        key: 'giaVe',
      },
      {
        title: 'Thời lượng',
        dataIndex: 'thoiLuong',
        key: 'thoiLuong',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Button type='primary' danger>
            Hủy
          </Button>
        ),
      },
    ];

    return (
      <Modal
        title='Tạo lịch chiếu phim'
        centered
        visible={this.props.visible}
        onOk={() => {
          this.props.onOk();
          this.setState({ modalLoading: true });
        }}
        onCancel={() => {
          this.props.onCancel();
          this.setState({ modalLoading: true });
        }}
        width={1000}
      >
        <Form
          name='basic'
          initialValues={{ remember: false }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          autoComplete='off'
        >
          <Row>
            <Col span={6} style={{ marginLeft: '20px' }}>
              <Form.Item
                name='maHeThongRap'
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder='Chọn hệ thống rạp'
                  onChange={this.handleSystemsMenuClick}
                >
                  {this.state.systems
                    ? this.state.systems.map((system) => {
                        return (
                          <Option value={system.maHeThongRap}>
                            {system.tenHeThongRap}
                          </Option>
                        );
                      })
                    : null}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} style={{ marginLeft: '20px' }}>
              <Form.Item
                name='maCumTap'
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder='Chọn cụm rạp'
                  onChange={this.handleCinemasMenuClick}
                >
                  {this.state.cinemas
                    ? this.state.cinemas.map((cinema) => {
                        return (
                          <Option value={cinema.maCumRap}>
                            {cinema.tenCumRap}
                          </Option>
                        );
                      })
                    : null}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} style={{ marginLeft: '20px' }}>
              <Form.Item
                name='maRap'
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder='Chọn rạp'
                  onChange={this.handleRoomsMenuClick}
                >
                  {this.state.rooms
                    ? this.state.rooms.map((room) => {
                        return (
                          <Option value={room.maRap}>{room.tenRap}</Option>
                        );
                      })
                    : null}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} style={{ marginLeft: '20px' }}>
              <Form.Item
                name='ngayChieuGioChieu'
                {...{
                  rules: [
                    {
                      type: 'object',
                      required: true,
                      message: 'Please select time!',
                    },
                  ],
                }}
              >
                <DatePicker
                  placeholder='Chọn ngày chiếu giờ chiếu'
                  showTime
                  format='DD/MM/YYYY HH:mm:ss'
                />
              </Form.Item>
            </Col>
            <Col span={6} style={{ marginLeft: '20px' }}>
              <Form.Item
                name='giaVe'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập giá vé',
                  },
                  {
                    pattern: '^[1-9]+[0-9]*$',
                    message: 'Vui lòng nhập đúng giá vé',
                  },
                ]}
              >
                <Input
                  placeholder='Nhập giá vé'
                  type='number'
                  min='75000'
                  max='200000'
                />
              </Form.Item>
            </Col>

            <Col span={6} style={{ marginLeft: '20px' }}>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Thêm
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          columns={columns}
          dataSource={this.state.showtimes}
          loading={this.state.modalLoading}
        />
      </Modal>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
});
export default connect(mapStateToProps)(Showtime);
