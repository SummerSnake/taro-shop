import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { Picker, AtInput, AtIcon } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { addToCart, deleteFromCart } from '../../store/actions/cartActions';
import './index.less';

@connect(({ cartReducer }) => ({
  cartReducer
}))
export default class Cart extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      fetchData: {
        name: '测试'
      },
      selector: ['5元', '10元', '20元', '50元'],
      selectorChecked: '请选择优惠券',
      inputVal: '',
    };
  }

  config = {
    navigationBarTitleText: '购物车',
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: "#fff",
  };
  /**
   * 添加商品
   * @param id
   * @param name
   * @param price
   */
  addGood = async (id, name, price) => {
    this.props.dispatch(addToCart(id, name, price));
  };

  /**
   * 减少商品
   * @param id
   */
  subtractNum = (id) => {
    this.props.dispatch(deleteFromCart(id));
  };

  /**
   * 选择优惠券
   * @param e
   */
  onSelectChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    });
  };

  /**
   * 填写备注
   * @param inputVal
   */
  inputValChange = (inputVal) => {
    this.setState({
      inputVal
    });
  };

  /**
   * 支付
   */
  confirmPay = () => {
    Taro.request({
      url: 'http://localhost:8080/test',
      data: {
        foo: 'foo',
        bar: 10
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      if (res.code === 0) {
        Taro.requestPayment({
          'timeStamp': 1,
          'nonceStr': 1,
          'package': 1,
          'signType': 1,
          'paySign': 1,
        });
      }
    });
  };

  render() {
    const { fetchData } = this.state;
    const { cart, totalMoney } = this.props.cartReducer;
    return (
      <View className='orderWrap'>
        <View className='userInfo'>
          <Text className='userInfoTxt'>收货人：{fetchData.name}</Text>
          <Text className='userInfoTxt'>联系方式：{fetchData.name}</Text>
          <View className='userInfoAddr'>收货地址：{fetchData.name}</View>
        </View>

        <View className='goodsWrap'>
          <View className='goodsTitle'>已购商品</View>
          {
            cart.map((item) => {
              return (
                <View className='goodsList' key={item.id}>
                  <Text className='goodName'>{item.name}</Text>
                  <View className='goodOperate'>
                    <View className='goodIcon' onClick={this.subtractNum.bind(this, item.id)}>
                      <AtIcon value='subtract-circle' size='18' color='#2083e4' />
                    </View>
                    <Text className='goodNum'>x{item.num}</Text>
                    <View className='goodIcon' onClick={this.addGood.bind(this, item.id, null, null)}>
                      <AtIcon value='add-circle' size='18' color='#2083e4' />
                    </View>
                  </View>
                  <Text className='goodPrice'>￥{item.price * item.num}</Text>
                </View>
              );
            })
          }
          <Picker mode='selector' range={this.state.selector} onChange={this.onSelectChange}>
            <View className='couponPicker'>
              红包<Text className='couponTxt'>{this.state.selectorChecked}</Text>
            </View>
          </Picker>
          <View className='totalMoney'>合计：<Text className='totalMoneyNum'>￥{totalMoney}</Text></View>
          <View>
            <AtInput
              name='value'
              title='备注：'
              type='text'
              placeholder='请输入备注'
              value={this.state.inputVal}
              onChange={this.inputValChange.bind(this)}
            />
          </View>
        </View>

        <View className='orderBottom'>
          <View className='bottomTotal'>待支付：{totalMoney}</View>
          <View className='bottomCoupon'>已优惠：{totalMoney}</View>
          <View className='confirmPay' onClick={this.confirmPay}>确认支付</View>
        </View>
      </View>
    );
  }
}
