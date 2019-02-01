import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import GlobalFooter from '../../components/GlobalFooter/index';
import './index.less';

export default class User extends Component {

  config = {
    navigationBarTitleText: '个人中心',
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: "white",
  };

  componentDidMount = async () => {
    const userInfo = Taro.getStorageSync('userInfo');
    await this.setState({
      avatar: userInfo.avatarUrl,
      nickName: userInfo.nickName,
    });
  };

  render() {
    const { avatar, nickName } = this.state;
    return (
      <View className='homeWrap'>
        <ScrollView
          scroll-y='true'
          scrollWithAnimation
          className='scrollDom'
        >
          <View className='headWrap'>
            <View className='userInfoWrap'>
              <View className='avatarWrap'>
                <Image className='avatarImg' src={avatar} />
              </View>
              <View className='nickName'>{nickName}</View>
            </View>
            <Image className='backImg' src={avatar} />
          </View>

          <View className='iconListWrap'>
            <View className='iconList'>
              <View className='iconItem'>
                <AtIcon value='analytics' size='30' color='#999' />
                <View className='iconItemTxt'>待付款</View>
              </View>
              <View className='iconItem'>
                <AtIcon value='equalizer' size='30' color='#999' />
                <View className='iconItemTxt'>待收货</View>
              </View>
              <View className='iconItem'>
                <AtIcon value='heart' size='30' color='#999' />
                <View className='iconItemTxt'>待评价</View>
              </View>
            </View>

            <View className='iconList'>
              <View className='iconItem'>
                <AtIcon value='lightning-bolt' size='30' color='#999' />
                <View className='iconItemTxt'>已付款</View>
              </View>
              <View className='iconItem'>
                <AtIcon value='filter' size='30' color='#999' />
                <View className='iconItemTxt'>已收货</View>
              </View>
              <View className='iconItem'>
                <AtIcon value='heart-2' size='30' color='#999' />
                <View className='iconItemTxt'>已评价</View>
              </View>
            </View>
          </View>

          <View className='gridListWrap'>
            <View className='gridList'>
              <View className='gridItem'>
                <View className='gridItemIcon'>
                  <AtIcon value='lightning-bolt' size='30' color='#999' />
                </View>
                <View className='gridItemTxt'>
                  <View className='gridItemTitle'>收货地址</View>
                  <View className='gridItemCon'>...</View>
                </View>
              </View>
              <View className='gridItem'>
                <View className='gridItemIcon'>
                  <AtIcon value='lightning-bolt' size='30' color='#999' />
                </View>
                <View className='gridItemTxt'>
                  <View className='gridItemTitle'>联系方式</View>
                  <View className='gridItemCon'>...</View>
                </View>
              </View>
            </View>

            <View className='gridList'>
              <View className='gridItem'>
                <View className='gridItemIcon'>
                  <AtIcon value='lightning-bolt' size='30' color='#999' />
                </View>
                <View className='gridItemTxt'>
                  <View className='gridItemTitle'>我的订单</View>
                  <View className='gridItemCon'>...</View>
                </View>
              </View>
              <View className='gridItem'>
                <View className='gridItemIcon'>
                  <AtIcon value='lightning-bolt' size='30' color='#999' />
                </View>
                <View className='gridItemTxt'>
                  <View className='gridItemTitle'>我的收藏</View>
                  <View className='gridItemCon'>...</View>
                </View>
              </View>
            </View>
          </View>

          <View className='sysList'>
            <View className='sysItem'>用户反馈</View>
            <View className='sysItem'>关于我们</View>
          </View>
        </ScrollView>

        <GlobalFooter isActive='04' />
      </View>
    );
  }
}
