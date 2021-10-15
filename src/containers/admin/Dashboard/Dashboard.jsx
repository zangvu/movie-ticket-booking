import { Button, Input, message, Space, Table } from 'antd';
import './Dashboard.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import movieApi from '../../../apis/movieApi';
import { connect } from 'react-redux';
import Showtime from './Showtime/Showtime';
import history from '../../../utils/history';

class Dashboard extends Component {
  state = {
    movies: null,
    visible: false,
    selectedMovie: { maPhim: '1327' },
    loading: true,
    visibleMovies: null,
  };
  onChange = (e) => {
    const searchValue = e.target.value;
    const visibleMovies = this.state.movies.filter((movie) => {
      return movie.tenPhim.toLowerCase().includes(searchValue.toLowerCase());
    });
    this.setState({ visibleMovies });
  };
  onModalClick = async (selectedMovie) => {
    this.setState({ visible: true, selectedMovie });
  };
  onDeleteClick = async (movieId) => {
    try {
      await movieApi.deleteMovie(movieId, this.props.currentUser.accessToken);
      const { data } = await movieApi.fetchAllMovieApi();
      this.setState({ movies: data });
    } catch (err) {
      const key = 'updatable';
      this.setState({ isSuccess: false }, () =>
        setTimeout(() => {
          message.error({
            content: err.response.data,
            key,
            duration: 2,
          });
        }, 2000)
      );
    }
  };
  render() {
    const columns = [
      {
        title: 'Mã phim',
        dataIndex: 'maPhim',
        key: 'id',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Tên phim',
        dataIndex: 'tenPhim',
        key: 'name',
      },
      {
        title: 'Hình ảnh',
        dataIndex: 'hinhAnh',
        key: 'image',
        render: (text) => (
          <img src={text} alt='anhhh' style={{ width: '50px' }} />
        ),
      },
      {
        title: 'Mô tả',
        dataIndex: 'moTa',
        key: 'description',
        render: (text) => <div className='dashboard__table'>{text}</div>,
      },
      {
        title: 'Mã nhóm',
        dataIndex: 'maNhom',
        key: 'groupId',
      },
      {
        title: 'Ngày khởi chiếu',
        dataIndex: 'ngayKhoiChieu',
        key: 'date',
        render: (text) =>
          `${new Date(text).getDate()}/${
            new Date(text).getMonth() + 1
          }/${new Date(text).getFullYear()}`,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size='middle'>
            <Button type='primary' onClick={() => this.onModalClick(record)}>
              Tạo lịch chiếu
            </Button>
            <Button
              type='primary'
              ghost
              onClick={() => {
                history.push(`/admin/movie-detail/${text.maPhim}`);
              }}
            >
              Sửa
            </Button>
            <Button
              onClick={() => {
                this.onDeleteClick(record.maPhim);
              }}
              type='primary'
              danger
            >
              X
            </Button>
          </Space>
        ),
      },
    ];
    return (
      <div>
        <Showtime
          visible={this.state.visible}
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}
          movie={this.state.selectedMovie}
        />
        <div style={{ display: 'flex', height: '32px', marginBottom: '10px' }}>
          <Link to={`/admin/movie-detail/${-1}`}>
            <Button className='mb-3'>Thêm phim</Button>
          </Link>
          <Input placeholder='Nhập tên để tìm kiếm' onChange={this.onChange} />
        </div>
        <Table
          columns={columns}
          dataSource={this.state.visibleMovies}
          loading={this.state.loading}
        />
      </div>
    );
  }
  async componentDidMount() {
    try {
      const { data } = await movieApi.fetchAllMovieApi();
      this.setState({ movies: data, loading: false, visibleMovies: data });
    } catch (err) {
      console.log(err);
    }
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
});
export default connect(mapStateToProps)(Dashboard);
