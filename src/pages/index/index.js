import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { AtInput, AtToast } from 'taro-ui';
import { postRequest } from '../../utils/api';
import './index.less';

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      userVal: '',
      passwordVal: '',
      isOpen: false,
      toastTxt: '',
    };
  }

  config = {
    navigationBarTitleText: '首页',
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: "white",
  };

  componentDidMount = () =>{
    // Taro.login({
    //   success : async(res)=> {
    //     if (res.code) {
    //       await postRequest('/member/addMemberInfo', {
    //         code: res.code
    //       });
    //     } else {
    //       console.log('登录失败！' + res.errMsg);
    //     }
    //   }
    // });
  };

  /**
   * 用户名输入框
   * @param value
   */
  handleUserChange = (value) => {
    this.setState({
      userVal: value,
    });
  };

  /**
   * 密码输入框
   * @param value
   */
  handlePasswordChange = (value) => {
    this.setState({
      passwordVal: value,
    });
  };

  /**
   * 提交登陆
   */
  onSubmit = async () => {
    // 获取用户信息
    Taro.getUserInfo({
      success: (res) => {
        Taro.setStorageSync('userInfo', res.userInfo);
      }
    });
    // 登陆接口
    const data = await postRequest('/mock/5c47cf65f513860f4ceef6a3/example/taroMini/login', {
      username: this.state.userVal.toString(),
      password: this.state.passwordVal.toString(),
    });
    if (data.code === 0) {
      this.setState({
        toastTxt: '登陆成功',
        isOpen: true,
      });
      setTimeout(() => {
        this.setState({ isOpen: false});
        Taro.navigateTo({
          url: `/pages/homepage/index`
        });
      }, 2000);
    } else {
      this.setState({
        toastTxt: '登陆失败',
        isOpen: true,
      });
    }
  };

  render() {
    return (
      <View className='homeWrap'>
        <View className='homeTitle'>泰罗商城</View>
        <View className='loginWrap' style={{ display: 'block' }}>
          <AtInput
            name='username'
            title='用户名'
            type='text'
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
          <Button open-type='getUserInfo' className='submitBtn' onClick={this.onSubmit}>提交</Button>

          <AtToast isOpened={this.state.isOpen} text={this.state.toastTxt} icon='heart-2' />
        </View>
      </View>
    );
  }
}
