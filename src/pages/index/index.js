import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtButton, AtInput } from 'taro-ui';
import apiUrl from '../../utils/api';
import './index.less';

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      userVal: '',
      passwordVal: '',
    };
  }

  config = {
    navigationBarTitleText: '首页',
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: "#fff",
  };

  componentWillMount() {
    Taro.login({
      success: (res) => {
        console.log(res.code);
      }
    });
  }

  /**
   * 用户名输入框
   */
  handleUserChange(value) {
    this.setState({
      userVal: value,
    });
  }

  /**
   * 密码输入框
   */
  handlePasswordChange(value) {
    this.setState({
      passwordVal: value,
    });
  }

  /**
   * 提交登陆
   */
  onSubmit() {
    Taro.request({
      url: `${apiUrl}/mock/5c47cf65f513860f4ceef6a3/example/taroMini/login`,
      data: {
        username: this.state.userVal.toString(),
        password: this.state.passwordVal.toString(),
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }).then((res) => {
      console.log(res);
      // this.setState({
      //   fetchData: res.data.data
      // });
    });
  }

  /**
   * 跳转商品列表
   */
  goGoodList = () => {
    Taro.navigateTo({
      url: `/pages/goodList/index`
    });
  };

  /**
   * 跳转个人中心
   */
  goPersonCenter = () => {
    // 获取用户信息
    Taro.getUserInfo({
      success: (res) => {
        Taro.setStorageSync('userInfo', res.userInfo);
      }
    });
    // 跳转
    Taro.navigateTo({
      url: `/pages/personCenter/index`
    });
  };

  render() {
    return (
      <View className='homeWrap'>
        <View className='btnWrap'>
        <AtButton type='secondary' onClick={this.goGoodList}>商品列表</AtButton>
        </View>
        <View className='btnWrap'>
        <AtButton type='secondary' onClick={this.goPersonCenter}>个人中心</AtButton>
        </View>

        <View className='loginWrap' style={{ display: 'none' }}>
          <AtInput
            name='username'
            title='用户名'
            type='number'
            placeholder='请输入用户名'
            value={this.state.userVal}
            onChange={this.handleUserChange.bind(this)}
          />
          <AtInput
            name='password'
            title='密码'
            type='text'
            placeholder='请输入密码'
            value={this.state.passwordVal}
            onChange={this.handlePasswordChange.bind(this)}
          />
          <AtButton type='primary' className='submitBtn' onClick={this.onSubmit}>提交</AtButton>
        </View>
      </View>
    );
  }
}
