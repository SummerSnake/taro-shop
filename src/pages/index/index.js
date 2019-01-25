import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import './index.less';

class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: "#fff",
  };

  goToProList = () => {
    Taro.navigateTo({
      url: `/pages/proList/index`
    });
  };

  render () {
    return (
      <View className='homeWrap'>
        <AtButton type='secondary' onClick={this.goToProList}>商品列表</AtButton>
      </View>
    );
  }
}

export default Index;
