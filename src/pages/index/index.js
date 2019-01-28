import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import './index.less';

export default class Index extends Component {

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
   * 跳转商品列表
   */
  goToGoodList = () => {
    Taro.navigateTo({
      url: `/pages/proList/index`
    });
  };

  /**
   * 跳转个人中心
   */
  goToPersonCenter = () => {
    // 获取用户信息
    Taro.getUserInfo({
      success: (res)=>{
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
          <AtButton type='secondary' onClick={this.goToGoodList}>商品列表</AtButton>
        </View>
        <View className='btnWrap'>
          <AtButton type='secondary' onClick={this.goToPersonCenter}>个人中心</AtButton>
        </View>
      </View>
    );
  }
}
