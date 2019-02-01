import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { Picker, AtInput, AtIcon, AtToast } from 'taro-ui';
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
      selector: [
        { id: 1, value: 5, name: '5元' },
        { id: 2, value: 10, name: '10元' },
        { id: 3, value: 15, name: '15元' },
        { id: 4, value: 20, name: '20元' },
      ],
      selectorChecked: '请选择优惠券',
      discountMoney: 0, // 优惠券金额
      actualMoney: this.props.cartReducer.totalMoney, // 实际应付金额
      inputVal: '',
      isOpen: false,
    };
  }

  config = {
    navigationBarTitleText: '购物车',
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: "white",
  };
  /**
   * 添加商品
   * @param id
   * @param name
   * @param price
   */
  addGood = async (id, name, price) => {
    this.props.dispatch(addToCart(id, name, price));
    this.setState({
      selectorChecked: '请选择优惠券',
      discountMoney: 0,
      actualMoney: this.props.cartReducer.totalMoney,
    });
  };

  /**
   * 减少商品
   * @param id
   */
  subtractNum = (id) => {
    this.props.dispatch(deleteFromCart(id));
    this.setState({
      selectorChecked: '请选择优惠券',
      discountMoney: 0,
      actualMoney: this.props.cartReducer.totalMoney,
    });
  };

  /**
   * 选择优惠券
   * @param e
   */
  onSelectChange = e => {
    const totalMoney = this.props.cartReducer.totalMoney;
    const selected = this.state.selector[e.detail.value];
    let discountMoney = selected.value;
    let actualMoney = 0;

    if (discountMoney <=  totalMoney) {
      actualMoney = (totalMoney - discountMoney).toFixed(2);
    } else {
      discountMoney = 0;
      this.setState({ isOpen: true });
    }

    this.setState({
      selectorChecked: selected.value <=  totalMoney ? selected.name : this.state.selectorChecked,
      discountMoney,
      actualMoney,
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
    const { fetchData, selector, discountMoney, actualMoney, isOpen } = this.state;
    const { cart } = this.props.cartReducer;

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
          <Picker mode='selector' range={selector} rangeKey='name' onChange={this.onSelectChange}>
            <View className='couponPicker'>
              红包<Text className='couponTxt'>{this.state.selectorChecked}</Text>
            </View>
          </Picker>
          <View className='totalMoney'>合计：
            <Text className='totalMoneyNum'>￥{actualMoney}</Text>
          </View>
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
          <View className='bottomTotal'>待支付：￥{actualMoney}</View>
          <View className='bottomCoupon'>已优惠：￥{discountMoney}</View>
          <View className='confirmPay' onClick={this.confirmPay}>确认支付</View>
        </View>

        <AtToast isOpened={isOpen} text='优惠券金额不可以大于总金额' icon='sketch' />
      </View>
    );
  }
}
