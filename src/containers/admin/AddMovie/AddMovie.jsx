import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import movieApi from '../../../apis/movieApi';
import { connect } from 'react-redux';

class AddMovie extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
    isSuccess: false,
    title: 'Thêm phim mới',
    isUpdated: false,
  };
  formRef = React.createRef();
  onFinish = async (values) => {
    let frm = new FormData();
    for (let key in values) {
      frm.append(key, values[key]);
    }

    frm.append('hinhAnh', this.state.selectedFile);
    frm.append('maNhom', 'GP14');
    if (this.props.match.params.movieId !== '-1') {
      try {
        const token = this.props.currentUser.accessToken;
        await movieApi.updateMovieApi(frm, token);

        const key = 'updatable';
        this.setState({ isSuccess: true }, () =>
          setTimeout(() => {
            message.success({ content: 'Tác vụ thành công', key, duration: 2 });
          }, 1000)
        );
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
    } else {
      try {
        await movieApi.uploadImg(frm);
        const key = 'updatable';
        this.setState({ isSuccess: true }, () =>
          setTimeout(() => {
            message.success({ content: 'Tác vụ thành công', key, duration: 2 });
          }, 1000)
        );
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
    }
  };
  onFileChange = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };
  async componentDidMount() {
    const { movieId } = this.props.match.params;
    if (movieId !== '-1') {
      this.setState({ title: 'Cập nhật phim', isUpdated: true });
      try {
        const { data } = await movieApi.fetchMovieById(movieId);
        this.formRef.current.setFieldsValue({
          maPhim: data.maPhim,
          tenPhim: data.tenPhim,
          trailer: data.trailer,
          moTa: data.moTa,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
  render() {
    return (
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete='off'
        ref={this.formRef}
      >
        <h1 style={{ textAlign: 'center' }}>{this.state.title}</h1>
        <Form.Item
          label='Mã phim'
          name='maPhim'
          rules={[{ required: true, message: 'Vui lòng nhập mã phim' }]}
        >
          <Input disabled={this.state.isUpdated} />
        </Form.Item>
        <Form.Item
          label='Tên phim'
          name='tenPhim'
          rules={[{ required: true, message: 'Vui lòng nhập tên phim' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Trailer'
          name='trailer'
          rules={[
            { required: true, message: 'Vui lòng nhập đường dẫn trailer' },
          ]}
        >
          <Input />
        </Form.Item>
        <input type='file' onChange={this.onFileChange} name='hinhAnh' />

        <Form.Item
          label='Mô tả'
          name='moTa'
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='Lưu'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
});
export default connect(mapStateToProps)(AddMovie);
