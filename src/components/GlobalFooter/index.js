import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './index.less';

export default class GlobalFooter extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }

  /**
   * 跳转页面
   * @param type
   */
  goHref = (type) => {
    switch (type) {
      case '01':
        Taro.navigateTo({
          url: '/pages/index/index'
        });
        break;
      case '02':
        Taro.navigateTo({
          url: '/pages/goodList/index'
        });
        break;
      case '03':
        Taro.navigateTo({
          url: '/pages/cart/index'
        });
        break;
      case '04':
        // 获取用户信息
        Taro.getUserInfo({
          success: async(res) => {
            await Taro.setStorageSync('userInfo', res.userInfo);
            Taro.navigateTo({
              url: '/pages/user/index'
            });
          }
        });
        break;
      default:
        Taro.navigateTo({
          url: '/pages/index/index'
        });
    }
  };

  render() {
    const { isActive } = this.props;
    return (
      <View className='footer'>
        <View
          className={isActive === '01' ? 'footerIconActive' : 'footerIcon'}
          onClick={this.goHref.bind(this, '01')}
        >
          <AtIcon value='home' size='30' color={isActive === '01' ? '#2083e4' : '#999'} />
          <View className='footerTxt'>首页</View>
        </View>
        <View
          className='footerIcon'
          onClick={this.goHref.bind(this, '02')}
        >
          <AtIcon value='bullet-list' size='30' color={isActive === '02' ? '#2083e4' : '#999'} />
          <View className='footerTxt'>分类</View>
        </View>
        <View
          className='footerIcon'
          onClick={this.goHref.bind(this, '03')}
        >
          <AtIcon value='shopping-cart' size='30' color={isActive === '03' ? '#2083e4' : '#999'} />
          <View className='footerTxt'>购物车</View>
        </View>
        <Button
          className={isActive === '04' ? 'footerIconActive' : 'footerIcon'}
          onClick={this.goHref.bind(this, '04')}
          open-type='getUserInfo'
        >
          <AtIcon value='user' size='30' color={isActive === '04' ? '#2083e4' : '#999'} />
          <View className='footerTxt'>我的</View>
        </Button>
      </View>
    );
  }
}
