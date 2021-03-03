import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { connect } from '@tarojs/redux';
import GlobalFooter from '../../components/GlobalFooter/index';
import './index.less';

@connect(({ userReducer }) => ({
  userReducer
}))
class User extends Component {

  config = {
    navigationBarTitleText: '个人中心',
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: "white",
  };

  componentDidShow = () => {
    const { userReducer } = this.props;
    this.setState({
      consignee: userReducer.consignee,
      address: userReducer.address,
      phone: userReducer.phone,
    });
  };

  componentDidMount = async () => {
    const userInfo = Taro.getStorageSync('userInfo');
    await this.setState({
      avatar: userInfo.avatarUrl,
      nickName: userInfo.nickName,
    });
  };

  /**
   * 跳转订单列表
   * @param type
   */
  goOrder = (type) => {
    this.$preload({ type });
    Taro.navigateTo({
      url: '/pages/order/index'
    });
  };

  /**
   * 跳转订单列表
   */
  goUserEdit = () => {
    Taro.navigateTo({
      url: '/pages/userEdit/index'
    });
  };

  render() {
    const { avatar, nickName, consignee, address, phone } = this.state;
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
              <View className='iconItem' onClick={this.goOrder.bind(this, '01')}>
                <AtIcon value='lightning-bolt' size='30' color='#999' />
                <View className='iconItemTxt'>全部订单</View>
              </View>
              <View className='iconItem' onClick={this.goOrder.bind(this, '02')}>
                <AtIcon value='heart-2' size='30' color='#999' />
                <View className='iconItemTxt'>待收货</View>
              </View>
              <View className='iconItem' onClick={this.goOrder.bind(this, '03')}>
                <AtIcon value='heart' size='30' color='#999' />
                <View className='iconItemTxt'>待支付</View>
              </View>
            </View>
          </View>

          <View className='gridListWrap'>
            <View className='gridList'>
              <View className='gridItem' onClick={this.goUserEdit.bind(this)}>
                <View className='gridItemIcon'>
                  <AtIcon value='lightning-bolt' size='30' color='#999' />
                </View>
                <View className='gridItemTxt'>
                  <View className='gridItemTitle'>收货人</View>
                  <View className='gridItemCon'>{consignee}</View>
                </View>
              </View>
              <View className='gridItem' onClick={this.goUserEdit.bind(this)}>
                <View className='gridItemIcon'>
                  <AtIcon value='lightning-bolt' size='30' color='#999' />
                </View>
                <View className='gridItemTxt'>
                  <View className='gridItemTitle'>收货地址</View>
                  <View className='gridItemCon'>{address}</View>
                </View>
              </View>
            </View>

            <View className='gridList'>
              <View className='gridItem' onClick={this.goUserEdit.bind(this)}>
                <View className='gridItemIcon'>
                  <AtIcon value='lightning-bolt' size='30' color='#999' />
                </View>
                <View className='gridItemTxt'>
                  <View className='gridItemTitle'>联系电话</View>
                  <View className='gridItemCon'>{phone}</View>
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

export default User;
