import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import GlobalFooter from '../../components/GlobalFooter/index';
import './index.less';

export default class Index extends Component {
  constructor() {
    super(...arguments);
  }

  config = {
    navigationBarTitleText: '首页',
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: "white",
  };

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
        <GlobalFooter isActive='01' />
      </View>
    );
  }
}
